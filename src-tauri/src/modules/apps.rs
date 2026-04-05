use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstalledApp {
    pub name: String,
    pub version: String,
    pub publisher: String,
    pub install_date: Option<String>,
    pub install_location: Option<String>,
    pub install_method: String, // "winget", "store", "chocolatey", "manual", "unknown"
    pub winget_id: Option<String>,
    pub store_id: Option<String>,
    pub choco_id: Option<String>,
    pub size_mb: f64,
    pub icon: Option<String>, // base64 encoded
}

pub async fn scan_installed_apps() -> Result<Vec<InstalledApp>, Box<dyn std::error::Error>> {
    let mut apps = Vec::new();

    // Step 1: Scan via winget (most reliable)
    if let Ok(winget_apps) = scan_winget_apps().await {
        apps.extend(winget_apps);
    }

    // Step 2: Scan Windows Registry for apps not found by winget
    #[cfg(windows)]
    {
        if let Ok(registry_apps) = scan_registry_apps().await {
            // Add apps not already found
            for reg_app in registry_apps {
                if !apps.iter().any(|a| a.name == reg_app.name) {
                    apps.push(reg_app);
                }
            }
        }
    }

    // Step 3: Scan Microsoft Store apps
    #[cfg(windows)]
    {
        if let Ok(store_apps) = scan_store_apps().await {
            for store_app in store_apps {
                if !apps.iter().any(|a| a.name == store_app.name) {
                    apps.push(store_app);
                }
            }
        }
    }

    // Sort by name
    apps.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));

    Ok(apps)
}

async fn scan_winget_apps() -> Result<Vec<InstalledApp>, Box<dyn std::error::Error>> {
    let output = Command::new("winget")
        .args(&["list", "--accept-source-agreements"])
        .output()?;

    if !output.status.success() {
        return Err("winget command failed".into());
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut apps = Vec::new();

    // Parse winget output
    // Format: Name Id Version Available Source
    for line in stdout.lines().skip(2) {
        // Skip header lines
        if line.trim().is_empty() {
            continue;
        }

        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() >= 3 {
            let name = parts[0].to_string();
            let id = if parts.len() > 1 {
                Some(parts[1].to_string())
            } else {
                None
            };
            let version = if parts.len() > 2 {
                parts[2].to_string()
            } else {
                "Unknown".to_string()
            };

            apps.push(InstalledApp {
                name,
                version,
                publisher: "Unknown".to_string(), // winget list doesn't show publisher
                install_date: None,
                install_location: None,
                install_method: "winget".to_string(),
                winget_id: id,
                store_id: None,
                choco_id: None,
                size_mb: 0.0, // Not available from winget list
                icon: None,
            });
        }
    }

    Ok(apps)
}

#[cfg(windows)]
async fn scan_registry_apps() -> Result<Vec<InstalledApp>, Box<dyn std::error::Error>> {
    use winreg::enums::*;
    use winreg::RegKey;

    let mut apps = Vec::new();

    // Registry paths to check
    let registry_paths = vec![
        (HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"),
        (HKEY_LOCAL_MACHINE, r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"),
        (HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"),
    ];

    for (hkey, path) in registry_paths {
        let root = RegKey::predef(hkey);
        if let Ok(uninstall_key) = root.open_subkey(path) {
            for sub_key_name in uninstall_key.enum_keys().filter_map(|k| k.ok()) {
                if let Ok(app_key) = uninstall_key.open_subkey(&sub_key_name) {
                    // Get app info
                    let display_name: String = app_key.get_value("DisplayName").unwrap_or_default();
                    if display_name.is_empty() || display_name.starts_with("Update for") || display_name.starts_with("Hotfix") {
                        continue; // Skip system updates
                    }

                    let display_version: String = app_key.get_value("DisplayVersion").unwrap_or_else(|_| "Unknown".to_string());
                    let publisher: String = app_key.get_value("Publisher").unwrap_or_else(|_| "Unknown".to_string());
                    let install_date: Option<String> = app_key.get_value("InstallDate").ok();
                    let install_location: Option<String> = app_key.get_value("InstallLocation").ok();

                    // Calculate size (in MB)
                    let size_mb: f64 = match app_key.get_value::<u32, _>("EstimatedSize") {
                        Ok(size_kb) => (size_kb as f64) / 1024.0,
                        Err(_) => 0.0,
                    };

                    apps.push(InstalledApp {
                        name: display_name,
                        version: display_version,
                        publisher,
                        install_date,
                        install_location,
                        install_method: "manual".to_string(),
                        winget_id: None,
                        store_id: None,
                        choco_id: None,
                        size_mb,
                        icon: None,
                    });
                }
            }
        }
    }

    Ok(apps)
}

#[cfg(windows)]
async fn scan_store_apps() -> Result<Vec<InstalledApp>, Box<dyn std::error::Error>> {
    // Use PowerShell to get Microsoft Store apps
    let output = Command::new("powershell")
        .args(&["-Command", "Get-AppxPackage | Select-Object Name, Version, Publisher | ConvertTo-Json"])
        .output()?;

    if !output.status.success() {
        return Err("PowerShell command failed".into());
    }

    let stdout = String::from_utf8_lossy(&output.stdout);

    #[derive(Deserialize)]
    struct StoreApp {
        #[serde(rename = "Name")]
        name: String,
        #[serde(rename = "Version")]
        version: String,
        #[serde(rename = "Publisher")]
        publisher: String,
    }

    let store_apps: Vec<StoreApp> = serde_json::from_str(&stdout)?;

    let apps = store_apps
        .into_iter()
        .map(|app| InstalledApp {
            name: app.name.clone(),
            version: app.version,
            publisher: app.publisher,
            install_date: None,
            install_location: None,
            install_method: "store".to_string(),
            winget_id: None,
            store_id: Some(app.name),
            choco_id: None,
            size_mb: 0.0,
            icon: None,
        })
        .collect();

    Ok(apps)
}

#[cfg(not(windows))]
async fn scan_registry_apps() -> Result<Vec<InstalledApp>, Box<dyn std::error::Error>> {
    Ok(Vec::new())
}

#[cfg(not(windows))]
async fn scan_store_apps() -> Result<Vec<InstalledApp>, Box<dyn std::error::Error>> {
    Ok(Vec::new())
}

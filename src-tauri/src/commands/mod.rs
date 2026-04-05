use crate::modules::{apps, browsers, files, network};

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to Patrins OneClick Reset.", name)
}

#[tauri::command]
pub async fn scan_apps() -> Result<Vec<apps::InstalledApp>, String> {
    apps::scan_installed_apps()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn scan_files(paths: Vec<String>) -> Result<files::FileScanResult, String> {
    files::scan_important_files(paths)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn scan_browsers() -> Result<Vec<browsers::Browser>, String> {
    browsers::detect_browsers()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn scan_network() -> Result<network::NetworkSettings, String> {
    network::export_network_settings()
        .await
        .map_err(|e| e.to_string())
}

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Browser {
    pub name: String,
    pub browser_type: String, // "chromium" or "firefox"
    pub version: Option<String>,
    pub data_path: String,
    pub profiles: Vec<BrowserProfile>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BrowserProfile {
    pub name: String,
    pub has_bookmarks: bool,
    pub has_history: bool,
    pub has_passwords: bool,
}

pub async fn detect_browsers() -> Result<Vec<Browser>, Box<dyn std::error::Error>> {
    // TODO: Implement browser detection
    Ok(Vec::new())
}

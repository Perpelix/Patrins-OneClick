use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileScanResult {
    pub total_files: usize,
    pub total_size_mb: f64,
    pub categories: Vec<FileCategory>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileCategory {
    pub name: String,
    pub files: Vec<FileInfo>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileInfo {
    pub path: String,
    pub size_mb: f64,
    pub importance_score: u32,
}

pub async fn scan_important_files(_paths: Vec<String>) -> Result<FileScanResult, Box<dyn std::error::Error>> {
    // TODO: Implement file scanning with importance detection
    Ok(FileScanResult {
        total_files: 0,
        total_size_mb: 0.0,
        categories: Vec::new(),
    })
}

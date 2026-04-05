// ============================================================================
// APPLICATION TYPES
// ============================================================================

export interface InstalledApp {
  name: string;
  version: string;
  publisher: string;
  installDate?: string;
  installLocation?: string;
  installMethod: 'winget' | 'store' | 'chocolatey' | 'manual' | 'unknown';
  wingetId?: string;
  storeId?: string;
  chocoId?: string;
  sizeMb: number;
  icon?: string; // base64 encoded
  selected: boolean;
}

// ============================================================================
// FILE TYPES
// ============================================================================

export enum FileCategory {
  Critical = 'critical',
  Important = 'important',
  Moderate = 'moderate',
  Low = 'low'
}

export interface FileImportance {
  path: string;
  score: number; // 0-100
  reasons: string[];
  category: FileCategory;
  sizeMb: number;
  modified: Date;
  selected: boolean;
}

export interface FileGroup {
  category: FileCategory;
  files: FileImportance[];
  totalSize: number;
  count: number;
}

// ============================================================================
// BROWSER TYPES
// ============================================================================

export type BrowserType = 'chromium' | 'firefox';

export interface BrowserExtension {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
}

export interface BrowserProfile {
  name: string;
  hasBookmarks: boolean;
  hasHistory: boolean;
  hasPasswords: boolean;
  passwordsExported: boolean;
  passwordsFilePath?: string;
  extensions: BrowserExtension[];
}

export interface Browser {
  name: string;
  type: BrowserType;
  version?: string;
  dataPath: string;
  profiles: BrowserProfile[];
  selected: boolean;
}

// ============================================================================
// NETWORK TYPES
// ============================================================================

export interface WifiProfile {
  ssid: string;
  password: string; // Encrypted
  authentication: string;
  encryption: string;
  autoConnect: boolean;
  selected: boolean;
}

export interface VPNConnection {
  name: string;
  server: string;
  type: string;
  config: string; // Encrypted
  selected: boolean;
}

export interface NetworkSettings {
  wifiProfiles: WifiProfile[];
  vpnConnections: VPNConnection[];
}

// ============================================================================
// WINDOWS SETTINGS TYPES
// ============================================================================

export interface WindowsSettings {
  theme: 'dark' | 'light';
  accentColor: string;
  wallpaperPath?: string;
  taskbarPosition: 'bottom' | 'top' | 'left' | 'right';
  taskbarAutoHide: boolean;
  pinnedApps: string[];
  showHiddenFiles: boolean;
  showFileExtensions: boolean;
}

// ============================================================================
// BACKUP TYPES
// ============================================================================

export interface BackupManifest {
  version: string;
  createdAt: string;
  expiresAt: string;
  userId: string;
  backupId: string;
  computerInfo: {
    hostname: string;
    username: string;
    osVersion: string;
    osBuild: string;
  };
  totalSizeBytes: number;
  applications: {
    count: number;
    selected: number;
    items: InstalledApp[];
  };
  files: {
    totalCount: number;
    selectedCount: number;
    totalSizeBytes: number;
    categories: {
      [key in FileCategory]: {
        count: number;
        sizeBytes: number;
      };
    };
  };
  browsers: Browser[];
  network: NetworkSettings;
  windowsSettings: WindowsSettings;
  encryption: {
    algorithm: string;
    keyDerivation: string;
  };
}

export interface BackupSummary {
  totalSizeMB: number;
  estimatedMinutes: number;
  appsCount: number;
  filesCount: number;
  browsersCount: number;
  wifiNetworksCount: number;
}

// ============================================================================
// SCAN PROGRESS TYPES
// ============================================================================

export interface ScanProgress {
  apps: {
    status: 'pending' | 'scanning' | 'complete';
    found: number;
  };
  files: {
    status: 'pending' | 'scanning' | 'complete';
    scanned: number;
    totalSize: number;
  };
  browsers: {
    status: 'pending' | 'scanning' | 'complete';
    found: Browser[];
  };
  network: {
    status: 'pending' | 'scanning' | 'complete';
    wifiCount: number;
    vpnCount: number;
  };
  windows: {
    status: 'pending' | 'scanning' | 'complete';
  };
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UploadProgress {
  uploadedBytes: number;
  totalBytes: number;
  percentage: number;
  speedMbps: number;
  remainingMinutes: number;
  currentFile: string;
}

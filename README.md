# Patrins OneClick Reset

**Painless Windows Reset & Restore**

Reset Windows without losing anything. Automatically backup and restore your apps, files, browser data, and settings.

---

## 🚀 Features

- ✅ **Smart App Detection** - Detects installed apps via winget, registry, and Microsoft Store
- ✅ **Intelligent File Scanning** - AI-powered importance detection for your files
- ✅ **Browser Data Backup** - Chrome, Edge, Firefox, Brave, Opera support
- ✅ **WiFi & Network Settings** - Backup all your WiFi passwords and VPN connections
- ✅ **Windows Settings** - Theme, wallpaper, taskbar, pinned apps
- ✅ **Easy Recovery** - Login with Google → Instant restore
- ✅ **7-Day Free Backup** - Unlimited temporary storage
- ✅ **End-to-End Encryption** - AES-256-GCM with Argon2id

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)

**Backend:**
- Tauri (Rust + WebView2)
- tokio (async runtime)
- aes-gcm (encryption)
- argon2 (key derivation)
- zstd (compression)
- winreg (Windows Registry access)

---

## 📦 Prerequisites

1. **Node.js** 18+ and npm
2. **Rust** (latest stable)
3. **Windows** 10/11 (for development)

### Install Rust:
```bash
https://rustup.rs/
```

### Install Tauri CLI:
```bash
npm install -g @tauri-apps/cli
```

---

## 🚀 Getting Started

### 1. Install dependencies:
```bash
cd E:\PATRINS\patrins-oneclick
npm install
```

### 2. Run in development mode:
```bash
npm run tauri dev
```

This will:
- Start the Vite dev server (React frontend)
- Build and run the Tauri app (Rust backend)
- Open the desktop application

### 3. Build for production:
```bash
npm run tauri build
```

The installer will be in `src-tauri/target/release/bundle/`

---

## 📁 Project Structure

```
patrins-oneclick/
├── src/                      # React frontend
│   ├── components/
│   │   ├── Welcome/         # Welcome & Login screens
│   │   ├── Backup/          # Backup flow UI
│   │   └── Restore/         # Restore flow UI
│   ├── store/               # Zustand state management
│   ├── styles/              # Global CSS + Tailwind
│   └── types/               # TypeScript types
│
├── src-tauri/               # Rust backend
│   └── src/
│       ├── main.rs          # Entry point + system tray
│       ├── commands/        # Tauri commands (frontend ↔ backend)
│       └── modules/
│           ├── apps.rs      # App detection (winget, registry, store)
│           ├── files.rs     # File scanning + importance detection
│           ├── browsers.rs  # Browser detection
│           ├── network.rs   # WiFi & VPN export
│           ├── crypto.rs    # Encryption (AES-256-GCM)
│           └── api.rs       # Patrins API client
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎨 Design System

Matches the Patrins OneClick website design:

**Fonts:**
- DM Serif Display (headings)
- Syne (body)
- DM Mono (code/labels)

**Colors:**
- Dark theme by default
- Light theme available
- Noise texture overlay
- Glassmorphism effects

**Components:**
- Custom buttons (btn-primary, btn-secondary)
- Smooth animations (fadeUp, blink)
- System tray integration
- Native Windows feel

---

## 🔐 Security Model

### Easy Recovery (Default for 7-day backups):
1. User logs in with Google
2. Master key derived from Google User ID via Argon2id
3. All data encrypted with AES-256-GCM
4. After reset: Login with Google → Automatic key derivation → Restore

**Advantages:**
- Zero hassle for users
- No codes to remember
- Perfect for temporary backups

**Trade-offs:**
- Not true zero-knowledge (we can theoretically derive key)
- Mitigated by: Only for temporary storage, 2FA requirement

---

## 📋 Current Status

✅ **Completed:**
- Project setup (Tauri + React + TypeScript)
- UI design system & components
- Welcome screen with Google login
- System tray integration
- Auto-updater configuration
- App scanner (winget + registry + store)

🚧 **In Progress:**
- File scanner with importance detection
- Browser detection & data export
- Network settings export
- Encryption module

⏳ **To Do:**
- Google OAuth integration
- Backup upload to Patrins API
- Restore flow
- Progress tracking
- Error handling

---

## 🎯 Next Steps

1. **Test the app**: `npm run tauri dev`
2. **Implement file scanner** - Smart importance detection
3. **Add browser detection** - Chromium & Firefox support
4. **Build encryption** - AES-256-GCM + Argon2id
5. **Connect to Patrins API** - Upload/download backups
6. **Complete UI flows** - Backup & restore wizards

---

## 📝 Notes

- App requires **Administrator rights** for registry access, WiFi passwords, and app detection
- **winget** must be installed (comes with Windows 11, optional on Windows 10)
- System tray icon appears after first launch
- Theme toggle in top-right corner

---

## 🤝 Contributing

This is a Patrins internal project. For issues or feature requests, contact the dev team.

---

## 📄 License

Proprietary - Patrins © 2026

---

**Ready to build the future of Windows resets! 🚀**

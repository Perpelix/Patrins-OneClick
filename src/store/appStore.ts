import { create } from 'zustand';

interface AppState {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // User authentication
  isAuthenticated: boolean;
  googleUserId: string | null;
  userEmail: string | null;
  setAuth: (googleUserId: string, email: string) => void;
  logout: () => void;

  // Backup state
  backupProgress: number;
  isBackingUp: boolean;
  setBackupProgress: (progress: number) => void;
  startBackup: () => void;
  completeBackup: () => void;

  // Restore state
  restoreProgress: number;
  isRestoring: boolean;
  setRestoreProgress: (progress: number) => void;
  startRestore: () => void;
  completeRestore: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Theme
  theme: 'dark',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'dark' ? 'light' : 'dark'
  })),

  // Authentication
  isAuthenticated: false,
  googleUserId: null,
  userEmail: null,
  setAuth: (googleUserId, email) => set({
    isAuthenticated: true,
    googleUserId,
    userEmail
  }),
  logout: () => set({
    isAuthenticated: false,
    googleUserId: null,
    userEmail: null
  }),

  // Backup
  backupProgress: 0,
  isBackingUp: false,
  setBackupProgress: (progress) => set({ backupProgress: progress }),
  startBackup: () => set({ isBackingUp: true, backupProgress: 0 }),
  completeBackup: () => set({ isBackingUp: false, backupProgress: 100 }),

  // Restore
  restoreProgress: 0,
  isRestoring: false,
  setRestoreProgress: (progress) => set({ restoreProgress: progress }),
  startRestore: () => set({ isRestoring: true, restoreProgress: 0 }),
  completeRestore: () => set({ isRestoring: false, restoreProgress: 100 }),
}));

import { useState } from 'react';

// Fallback for when framer-motion is not installed
const motion = {
  div: (props: any) => <div {...props} className={`${props.className || ''} animate-fade-up`} />,
};

interface WelcomeScreenProps {
  onStart: (mode: 'backup' | 'restore') => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginScreen onLogin={(mode) => onStart(mode)} />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-dark-bg dark:bg-dark-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl px-8"
      >
        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://cdn.veelscp.com/f/71b4a15b02d84bc1.png"
            alt="Patrins OneClick"
            className="h-12 mx-auto mb-6"
          />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark-border dark:border-dark-border bg-dark-surface dark:bg-dark-surface mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-blink"></span>
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-dark-text-muted dark:text-dark-text-muted">
            Windows 10 / 11 Ready
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-serif text-6xl mb-4 text-dark-text dark:text-dark-text"
        >
          Reset Windows.<br />
          <em className="text-dark-text-muted dark:text-dark-text-muted">Keep everything.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-dark-text-muted dark:text-dark-text-muted mb-12 max-w-xl mx-auto"
        >
          Automatically backup your apps, files, browser data, and settings before resetting.
          Restore everything in minutes after.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => setShowLogin(true)}
            className="btn btn-primary text-base px-8 py-4 rounded-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Create Backup
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className="btn btn-secondary text-base px-8 py-4 rounded-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Restore Backup
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 flex justify-center gap-8 text-sm text-dark-text-faint dark:text-dark-text-faint"
        >
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>7-day free backup</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>End-to-end encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Easy recovery</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Login Screen Component
function LoginScreen({ onLogin }: { onLogin: (mode: 'backup' | 'restore') => void }) {
  const [mode, setMode] = useState<'backup' | 'restore'>('backup');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // TODO: Implement actual Google OAuth
    // For now, simulate login
    setTimeout(() => {
      onLogin(mode);
    }, 1500);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-dark-bg dark:bg-dark-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-2xl border border-dark-border dark:border-dark-border bg-dark-surface dark:bg-dark-surface"
      >
        <h2 className="font-serif text-3xl mb-2 text-dark-text dark:text-dark-text">
          Sign in to continue
        </h2>
        <p className="text-sm text-dark-text-muted dark:text-dark-text-muted mb-8">
          Connect your Patrins account to {mode === 'backup' ? 'create' : 'restore'} backup
        </p>

        {/* Mode selector */}
        <div className="flex gap-2 mb-6 p-1 rounded-lg border border-dark-border dark:border-dark-border bg-dark-bg dark:bg-dark-bg">
          <button
            onClick={() => setMode('backup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              mode === 'backup'
                ? 'bg-dark-surface dark:bg-dark-surface text-dark-text dark:text-dark-text'
                : 'text-dark-text-muted dark:text-dark-text-muted hover:text-dark-text dark:hover:text-dark-text'
            }`}
          >
            Create Backup
          </button>
          <button
            onClick={() => setMode('restore')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              mode === 'restore'
                ? 'bg-dark-surface dark:bg-dark-surface text-dark-text dark:text-dark-text'
                : 'text-dark-text-muted dark:text-dark-text-muted hover:text-dark-text dark:hover:text-dark-text'
            }`}
          >
            Restore Backup
          </button>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg border-2 border-dark-border dark:border-dark-border bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-gray-50 text-gray-800 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </>
          )}
        </button>

        <p className="mt-6 text-xs text-center text-dark-text-faint dark:text-dark-text-faint">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import WelcomeScreen from './components/Welcome/WelcomeScreen';
import Dashboard from './components/Backup/Dashboard';
import RestoreMode from './components/Restore/RestoreMode';
import { useAppStore } from './store/appStore';

type AppScreen = 'welcome' | 'backup' | 'restore';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const { theme, toggleTheme } = useAppStore();

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme;
  }, [theme]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={(mode) => setCurrentScreen(mode)} />;
      case 'backup':
        return <Dashboard />;
      case 'restore':
        return <RestoreMode />;
      default:
        return <WelcomeScreen onStart={(mode) => setCurrentScreen(mode)} />;
    }
  };

  return (
    <div className="app-container w-screen h-screen overflow-hidden">
      {/* Theme toggle button (top-right) */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full border border-dark-border dark:border-dark-border bg-dark-surface dark:bg-dark-surface hover:bg-dark-surface2 dark:hover:bg-dark-surface2 flex items-center justify-center transition-all"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#90aac8" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8a020" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        )}
      </button>

      {renderScreen()}
    </div>
  );
}

export default App;

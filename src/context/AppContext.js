import React, { createContext, useContext, useState } from 'react';
import { useSearchHistory } from '../hooks/useSearchHistory';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const { history, addCity, removeCity, clearHistory } = useSearchHistory();

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = {
    isDark,
    bg: isDark ? '#0f172a' : '#f0f9ff',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#0f172a',
    subText: isDark ? '#94a3b8' : '#64748b',
    accent: '#3b82f6',
    border: isDark ? '#334155' : '#e2e8f0',
    inputBg: isDark ? '#1e293b' : '#ffffff',
    tabBar: isDark ? '#1e293b' : '#ffffff',
  };

  return (
    <AppContext.Provider
      value={{ theme, isDark, toggleTheme, history, addCity, removeCity, clearHistory }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

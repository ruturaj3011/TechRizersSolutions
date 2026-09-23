import React, { createContext, useContext } from 'react';

export const CORPORATE_THEME = {
  primary: '#2563EB',
  electricBlue: '#3B82F6',
  lightBlue: '#60A5FA',
  cyan: '#38BDF8',
  darkNavy: '#0F172A',
  deepBg: '#070B14',
  secondaryDark: '#111827',
  mainBg: '#FFFFFF',
  softBg: '#F8FAFC',
  lightBlueBg: '#F1F5FF',
  primaryText: '#1E293B',
  secondaryText: '#64748B',
  mutedText: '#94A3B8',
  border: '#E2E8F0',
  glow: 'rgba(37, 99, 235, 0.15)'
};

const ThemeContext = createContext({
  activeThemeConfig: CORPORATE_THEME
});

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ activeThemeConfig: CORPORATE_THEME }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

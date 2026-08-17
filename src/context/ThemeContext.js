import React, { createContext, useState, useContext } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('batman'); // 'batman', 'classicDark', or 'light'

  const currentColors = {
    ...colors,
    ...(themeMode === 'classicDark' ? {
      accent: '#2A9D8F', // classic dark cyan accent
      accentHover: '#264653',
    } : {}),
    ...(themeMode === 'light' ? {
      background: '#F8F9FA',
      surface: '#FFFFFF',
      surfaceLight: '#E9ECEF',
      textPrimary: '#1A1D20',
      textSecondary: '#6C757D',
      accent: '#D49B00', // golden amber readable on white
      accentHover: '#B88600',
      border: '#E2E8F0',
      yellowMuted: 'rgba(212, 155, 0, 0.12)',
    } : {}),
  };

  const selectTheme = (mode) => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ colors: currentColors, typography, spacing, themeMode, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

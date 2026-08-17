import { Platform } from 'react-native';

export const typography = {
  fontFamily: {
    header: Platform.select({
      web: '"Impact", "Arial Black", sans-serif',
      ios: 'System',
      android: 'sans-serif-condensed',
    }),
    body: Platform.select({
      web: 'system-ui, -apple-system, sans-serif',
      ios: 'System',
      android: 'sans-serif',
    }),
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
  },
  weights: {
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900',
  },
  lineHeights: {
    body: 24,
    heading: 1.2,
  }
};

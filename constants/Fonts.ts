export const Fonts = {
  // Primary font family for headings and important text
  // Using SF Pro on iOS and Roboto on Android for modern look
  primary: {
    light: 'System',
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
    extrabold: 'System',
  },

  // Secondary font family for body text - rounded and friendly
  secondary: {
    light: 'System',
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Monospace font for game numbers and scores
  mono: {
    regular: process.env.EXPO_OS === 'ios' ? 'SF Mono' : 'monospace',
    medium: process.env.EXPO_OS === 'ios' ? 'SF Mono' : 'monospace',
    bold: process.env.EXPO_OS === 'ios' ? 'SF Mono' : 'monospace',
  },

  // Game-specific font mappings
  game: {
    title: process.env.EXPO_OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    body: process.env.EXPO_OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    numbers: process.env.EXPO_OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    score: process.env.EXPO_OS === 'ios' ? 'SF Mono' : 'monospace',
  },

  // Font sizes following iOS Human Interface Guidelines & Material Design
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font weights
  weight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },

  // Line heights for better typography
  lineHeight: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter spacing for different use cases
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
} as const;

// Type definitions for better TypeScript support
export type FontFamily = keyof typeof Fonts.primary;
export type FontSize = keyof typeof Fonts.size;
export type FontWeight = keyof typeof Fonts.weight;
export type LineHeight = keyof typeof Fonts.lineHeight;

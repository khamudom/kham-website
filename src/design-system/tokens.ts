/**
 * Design Tokens
 *
 * This file contains all the design tokens used throughout the application.
 * These tokens define the visual language of the application and should be
 * used instead of hard-coded values to ensure consistency.
 */

// Add this type definition near the top of the file
export type ThemeColors = {
  background: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary?: string;
    inverse?: string;
  };
  border: string;
  borderHover: string;
  divider: string;
};

// Color Palette
export const colors = {
  // Primary colors
  primary: {
    main: "#06c",
    light: "#007AFF",
    dark: "#0050a0",
  },
  // Secondary colors
  secondary: {
    main: "#86868b",
    light: "#a1a1a6",
    dark: "#6e6e73",
  },
  // Neutral colors
  neutral: {
    white: "#ffffff",
    lightest: "#fbfbfd",
    lighter: "#f5f5f7",
    light: "#e5e5e5",
    medium: "#d2d2d7",
    dark: "#424245",
    darker: "#1d1d1f",
    darkest: "#000000",
    borderHover: "#bdbdbd",
  },
  // Semantic colors
  success: {
    main: "#34c759",
    light: "#4cd964",
    dark: "#248a3d",
  },
  warning: {
    main: "#ff9500",
    light: "#ffcc00",
    dark: "#c93400",
  },
  error: {
    main: "#ff3b30",
    light: "#ff6961",
    dark: "#c9302c",
  },
  info: {
    main: "#5ac8fa",
    light: "#64d2ff",
    dark: "#0071e3",
  },
};

// Typography
export const typography = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  // Responsive font sizes using clamp
  fontSize: {
    xs: "clamp(0.75rem, 1vw, 0.875rem)", // 12px - 14px
    sm: "clamp(0.875rem, 1.2vw, 1rem)", // 14px - 16px
    base: "clamp(1rem, 1.5vw, 1.125rem)", // 16px - 18px
    lg: "clamp(1.125rem, 1.7vw, 1.25rem)", // 18px - 20px
    xl: "clamp(1.25rem, 2vw, 1.5rem)", // 20px - 24px
    "2xl": "clamp(1.5rem, 3vw, 2rem)", // 24px - 32px
    "3xl": "clamp(2rem, 4vw, 3rem)", // 32px - 48px
    "4xl": "clamp(2.5rem, 5vw, 4rem)", // 40px - 64px
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: "-0.022em",
    normal: "0",
    wide: "0.011em",
  },
};

// Spacing
export const spacing = {
  // Base spacing unit: 4px
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  // Responsive spacing using clamp
  base: "clamp(1rem, 2vw, 1.5rem)",
  large: "clamp(2rem, 4vw, 3rem)",
  xl: "clamp(3rem, 6vw, 5rem)",
};

// Borders
export const borders = {
  radius: {
    none: "0",
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    full: "9999px", // Circular
  },
  width: {
    thin: "1px",
    medium: "2px",
    thick: "4px",
  },
};

// Shadows
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
  outline: "0 0 0 3px rgba(0, 102, 204, 0.3)",
  none: "none",
};

// Z-index
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 100,
  overlay: 200,
  modal: 300,
  popover: 400,
  toast: 500,
  tooltip: 600,
};

// Transitions
export const transitions = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  timing: {
    ease: "ease",
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    // Apple-like spring effect
    spring: "cubic-bezier(0.28, 0.11, 0.32, 1)",
  },
};

// Breakpoints
export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Media Queries
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]})`,
  dark: "@media (prefers-color-scheme: dark)",
  light: "@media (prefers-color-scheme: light)",
  hover: "@media (hover: hover)",
  motion: "@media (prefers-reduced-motion: no-preference)",
};

// Theme-specific tokens
export const lightThemeTokens = {
  colors: {
    background: {
      primary: colors.neutral.lightest,
      secondary: colors.neutral.lighter,
      tertiary: colors.neutral.white,
    },
    text: {
      primary: colors.neutral.darker,
      secondary: colors.secondary.main,
      tertiary: colors.secondary.light,
      inverse: colors.neutral.white,
    },
    border: colors.neutral.medium,
    borderHover: colors.neutral.borderHover,
    divider: colors.neutral.light,
  },
};

export const darkThemeTokens = {
  colors: {
    background: {
      primary: colors.neutral.darkest,
      secondary: colors.neutral.darker,
      tertiary: colors.neutral.dark,
    },
    text: {
      primary: colors.neutral.lighter,
      secondary: colors.secondary.main,
      tertiary: colors.secondary.dark,
      inverse: colors.neutral.darker,
    },
    border: colors.neutral.dark,
    borderHover: colors.neutral.borderHover,
    divider: colors.neutral.dark,
  },
};

// Export all tokens as a single object
const tokens = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  zIndex,
  transitions,
  breakpoints,
  mediaQueries,
  lightTheme: lightThemeTokens,
  darkTheme: darkThemeTokens,
};

export default tokens;

/**
 * Theme Tokens Definition
 *
 * This file defines the raw color values and design tokens for each theme.
 * Think of this as your "color palette" or "design system source of truth".
 *
 * Key points:
 * - Defines the actual color values (hex codes, etc.)
 * - Contains the base tokens that all themes can extend
 * - Each theme (default, dark, ninjaTurtles, matrix) has its own set of tokens
 *
 * Relationship with themes.ts:
 * - theme-tokens.ts: "What are my colors?" (the raw values)
 * - themes.ts: "How should these colors be used?" (the styling rules)
 */

import { colors } from "./tokens";
import { themeBackgrounds } from "./theme-backgrounds";

// Base theme tokens that all themes can extend
export const baseThemeTokens = {
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
  },
  spacing: {
    base: "1rem",
    large: "2rem",
  },
  backgrounds: themeBackgrounds,
};

// Default theme tokens
export const defaultThemeTokens = {
  light: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    background: {
      default: colors.neutral.white,
      paper: colors.neutral.lighter,
    },
    text: {
      primary: colors.neutral.darker,
      secondary: colors.secondary.dark,
    },
    backgrounds: themeBackgrounds.default,
    colors: {
      border: colors.neutral.medium,
      borderHover: colors.neutral.borderHover,
    },
  },
  dark: {
    primary: {
      main: colors.info.dark,
      light: colors.info.main,
      dark: colors.info.light,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    background: {
      default: colors.neutral.darker,
      paper: colors.neutral.dark,
    },
    text: {
      primary: colors.neutral.lighter,
      secondary: colors.secondary.light,
    },
    backgrounds: themeBackgrounds.defaultDark,
    colors: {
      border: colors.neutral.dark,
      borderHover: colors.neutral.borderHover,
    },
  },
};

// Ninja Turtles theme tokens
export const ninjaTurtlesTokens = {
  primary: {
    main: "#4CAF50",
    light: "#285828",
    dark: "#388E3C",
  },
  secondary: {
    main: "#FF6B00",
    light: "#FFA64D",
    dark: "#CC5500",
  },
  background: {
    default: "#E8F5E9",
    paper: "#C8E6C9",
  },
  text: {
    primary: "#1B5E20",
    secondary: "#990000",
  },
  backgrounds: themeBackgrounds.ninjaTurtles,
  colors: {
    border: "#4B0082",
    borderHover: "#0000FF",
  },
};

// Matrix theme tokens
export const matrixTokens = {
  primary: {
    main: "#00CC00",
    light: "#66FF66",
    dark: "#00CC00",
  },
  secondary: {
    main: "#003300",
    light: "#006600",
    dark: "#001100",
  },
  background: {
    default: "#000000",
    paper: "#0A0A0A",
  },
  text: {
    primary: "#00FF00",
    secondary: "#66FF66",
  },
  backgrounds: themeBackgrounds.matrix,
  colors: {
    border: "#003300",
    borderHover: "#66FF66",
  },
};

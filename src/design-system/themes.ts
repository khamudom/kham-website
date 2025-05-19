/**
 * Theme Configuration and Styling Rules
 *
 * This file defines how the theme tokens (from theme-tokens.ts) are applied to your UI components.
 * Think of this as your "styling rulebook" that tells Material-UI how to use your colors.
 *
 * Key points:
 * - Defines how colors are used in different component states (hover, active, etc.)
 * - Sets up component-specific styling rules
 * - Configures Material-UI theme options
 * - Creates theme variations (default, dark, ninjaTurtles, matrix)
 *
 * Relationship with theme-tokens.ts:
 * - theme-tokens.ts: "What are my colors?" (the raw values)
 * - themes.ts: "How should these colors be used?" (the styling rules)
 */

import { ThemeOptions } from "@mui/material/styles";
import { spacing, typography, transitions, borders } from "./tokens";
import {
  defaultThemeTokens,
  ninjaTurtlesTokens,
  matrixTokens,
} from "./theme-tokens";

// Base theme configuration that all themes will extend
const baseTheme = {
  typography: {
    fontFamily: typography.fontFamily,
    h1: {
      fontSize: typography.fontSize["4xl"],
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontSize: typography.fontSize["3xl"],
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontSize: typography.fontSize["2xl"],
      fontWeight: typography.fontWeights.semibold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h4: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeights.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    h5: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeights.medium,
      lineHeight: typography.lineHeight.normal,
    },
    h6: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeights.medium,
      lineHeight: typography.lineHeight.normal,
    },
    body1: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.relaxed,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.relaxed,
    },
    button: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeights.medium,
      textTransform: "none" as const,
    },
  },
  shape: {
    borderRadius: parseInt(borders.radius.md),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: `${spacing[3]} ${spacing[6]}`,
          boxShadow: "none",
          transition: `all ${transitions.duration.normal} ${transitions.timing.spring}`,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
};

// Default theme
export const defaultTheme = {
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      ...defaultThemeTokens.light.primary,
      contrastText: "#fff",
    },
    secondary: {
      ...defaultThemeTokens.light.secondary,
      contrastText: "#fff",
    },
    background: {
      ...defaultThemeTokens.light.background,
    },
    text: {
      ...defaultThemeTokens.light.text,
    },
  },
  backgrounds: defaultThemeTokens.light.backgrounds,
} as ThemeOptions & { backgrounds: { hero: string | null } };

// Default dark theme
export const defaultDarkTheme = {
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      ...defaultThemeTokens.dark.primary,
      contrastText: "#fff",
    },
    secondary: {
      ...defaultThemeTokens.dark.secondary,
      contrastText: "#fff",
    },
    background: {
      ...defaultThemeTokens.dark.background,
    },
    text: {
      ...defaultThemeTokens.dark.text,
    },
  },
  backgrounds: defaultThemeTokens.dark.backgrounds,
} as ThemeOptions & { backgrounds: { hero: string | null } };

// Ninja Turtles theme
export const ninjaTurtlesTheme = {
  ...baseTheme,
  palette: {
    primary: {
      ...ninjaTurtlesTokens.primary,
      contrastText: "#fff",
    },
    secondary: {
      ...ninjaTurtlesTokens.secondary,
      contrastText: "#fff",
    },
    background: {
      ...ninjaTurtlesTokens.background,
    },
    text: {
      ...ninjaTurtlesTokens.text,
    },
  },
  backgrounds: ninjaTurtlesTokens.backgrounds,
} as ThemeOptions & { backgrounds: { hero: string | null } };

// Matrix theme
export const matrixTheme = {
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      ...matrixTokens.primary,
      contrastText: matrixTokens.secondary.main,
    },
    secondary: {
      ...matrixTokens.secondary,
      contrastText: "#fff",
    },
    background: {
      ...matrixTokens.background,
    },
    text: {
      ...matrixTokens.text,
    },
  },
  backgrounds: matrixTokens.backgrounds,
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          "&:hover": {
            backgroundColor: matrixTokens.primary.light,
          },
        },
      },
    },
  },
} as ThemeOptions & { backgrounds: { hero: string | null } };

export type ThemeName = "default" | "defaultDark" | "ninjaTurtles" | "matrix";

export const themes: Record<ThemeName, ThemeOptions> = {
  default: defaultTheme,
  defaultDark: defaultDarkTheme,
  ninjaTurtles: ninjaTurtlesTheme,
  matrix: matrixTheme,
};

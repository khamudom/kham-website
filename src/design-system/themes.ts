import { ThemeOptions } from "@mui/material/styles";
import { colors, spacing, typography, transitions, borders } from "./tokens";
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
export const defaultTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: "light",
    ...defaultThemeTokens.light,
  },
};

// Default dark theme
export const defaultDarkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: "dark",
    ...defaultThemeTokens.dark,
  },
};

// Ninja Turtles theme
export const ninjaTurtlesTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: "light",
    ...ninjaTurtlesTokens,
  },
};

// Matrix theme
export const matrixTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: "dark",
    ...matrixTokens,
  },
};

export type ThemeName = "default" | "defaultDark" | "ninjaTurtles" | "matrix";

export const themes: Record<ThemeName, ThemeOptions> = {
  default: defaultTheme,
  defaultDark: defaultDarkTheme,
  ninjaTurtles: ninjaTurtlesTheme,
  matrix: matrixTheme,
};

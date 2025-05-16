import tokens, { lightThemeTokens, darkThemeTokens } from "./tokens";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Create theme options for Material UI based on our design tokens
const createThemeOptions = (mode: "light" | "dark"): ThemeOptions => {
  const themeTokens = mode === "light" ? lightThemeTokens : darkThemeTokens;
  const { colors, typography, spacing, borders } = tokens;

  return {
    palette: {
      mode,
      primary: {
        main: mode === "light" ? colors.primary.main : "#2997ff",
        light: mode === "light" ? colors.primary.light : "#5eb3ff",
        dark: mode === "light" ? colors.primary.dark : "#0071e3",
        contrastText: colors.neutral.white,
      },
      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
        contrastText: colors.neutral.white,
      },
      background: {
        default: themeTokens.colors.background.primary,
        paper: themeTokens.colors.background.tertiary,
      },
      text: {
        primary: themeTokens.colors.text.primary,
        secondary: themeTokens.colors.text.secondary,
      },
      divider: themeTokens.colors.divider,
      error: {
        main: colors.error.main,
        light: colors.error.light,
        dark: colors.error.dark,
      },
      warning: {
        main: colors.warning.main,
        light: colors.warning.light,
        dark: colors.warning.dark,
      },
      info: {
        main: colors.info.main,
        light: colors.info.light,
        dark: colors.info.dark,
      },
      success: {
        main: colors.success.main,
        light: colors.success.light,
        dark: colors.success.dark,
      },
    },
    typography: {
      fontFamily: typography.fontFamily,
      h1: {
        fontSize: typography.fontSize["4xl"],
        fontWeight: typography.fontWeights.semibold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
      },
      h2: {
        fontSize: typography.fontSize["3xl"],
        fontWeight: typography.fontWeights.semibold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
      },
      h3: {
        fontSize: typography.fontSize["2xl"],
        fontWeight: typography.fontWeights.semibold,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeights.semibold,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeights.semibold,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeights.semibold,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.normal,
      },
      body2: {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.normal,
        color: themeTokens.colors.text.secondary,
      },
      button: {
        textTransform: "none",
        fontWeight: typography.fontWeights.medium,
      },
    },
    shape: {
      borderRadius: parseInt(borders.radius.md.replace("rem", "")) * 16,
    },
    spacing: (factor: number) => {
      // Convert our spacing scale to MUI's spacing function
      const spacingValues = [
        0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128,
      ];
      return `${spacingValues[factor] || factor * 4}px`;
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: `${spacing[3]} ${spacing[6]}`,
            boxShadow: "none",
            transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.timing.spring}`,
            "&:hover": {
              boxShadow: "none",
            },
          },
          contained: {
            "&:hover": {
              backgroundColor:
                mode === "light" ? colors.primary.light : "#0071e3",
            },
          },
          outlined: {
            borderColor: mode === "light" ? colors.primary.main : "#2997ff",
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(0, 102, 204, 0.04)"
                  : "rgba(41, 151, 255, 0.04)",
              borderColor: mode === "light" ? colors.primary.light : "#0071e3",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: spacing[6],
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: mode === "light" ? colors.primary.light : "#0071e3",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: mode === "light" ? colors.primary.main : "#2997ff",
            },
          },
          notchedOutline: {
            borderColor: themeTokens.colors.border,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: themeTokens.colors.text.secondary,
            "&.Mui-focused": {
              color: mode === "light" ? colors.primary.main : "#2997ff",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themeTokens.colors.background.tertiary,
            borderRadius: borders.radius.md,
            border: `1px solid ${themeTokens.colors.border}`,
            transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.timing.spring}`,
            "&:hover": {
              boxShadow: tokens.shadows.md,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: themeTokens.colors.background.tertiary,
            borderRadius: borders.radius.md,
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiSnackbarContent-root": {
              backgroundColor: themeTokens.colors.background.secondary,
            },
          },
        },
      },
    },
  };
};

// Create and export the themes
export const lightTheme = createTheme(createThemeOptions("light"));
export const darkTheme = createTheme(createThemeOptions("dark"));

// Export a function to get the current theme
export const getCurrentTheme = (mode: "light" | "dark") => {
  return mode === "light" ? lightTheme : darkTheme;
};

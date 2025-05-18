import { ThemeOptions } from "@mui/material/styles";
import {
  colors,
  spacing,
  typography,
  transitions,
  borders,
  lightThemeTokens,
  darkThemeTokens,
} from "./tokens";

const createThemeOptions = (mode: "light" | "dark"): ThemeOptions => {
  const themeTokens = mode === "light" ? lightThemeTokens : darkThemeTokens;

  return {
    palette: {
      mode,
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
      background: {
        default: themeTokens.colors.background.primary,
        paper: themeTokens.colors.background.secondary,
      },
      text: {
        primary: themeTokens.colors.text.primary,
        secondary: themeTokens.colors.text.secondary,
      },
      divider: themeTokens.colors.divider,
    },
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
        textTransform: "none",
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
          contained: {
            "&:hover": {
              backgroundColor:
                mode === "light" ? colors.primary.light : colors.primary.dark,
            },
          },
          outlined: {
            borderColor:
              mode === "light" ? colors.primary.main : colors.primary.light,
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(0, 102, 204, 0.04)"
                  : "rgba(41, 151, 255, 0.04)",
              borderColor:
                mode === "light" ? colors.primary.light : colors.primary.dark,
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
              borderColor:
                mode === "light" ? colors.primary.light : colors.primary.dark,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor:
                mode === "light" ? colors.primary.main : colors.primary.light,
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
              color:
                mode === "light" ? colors.primary.main : colors.primary.light,
            },
          },
        },
      },
    },
  };
};

export default createThemeOptions;

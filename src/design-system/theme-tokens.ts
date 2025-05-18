import { colors } from "./tokens";

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
      secondary: colors.secondary.main,
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
      default: colors.neutral.darkest,
      paper: colors.neutral.darker,
    },
    text: {
      primary: colors.neutral.lighter,
      secondary: colors.secondary.main,
    },
  },
};

// Ninja Turtles theme tokens
export const ninjaTurtlesTokens = {
  primary: {
    main: "#4CAF50", // Leonardo blue
    light: "#81C784",
    dark: "#388E3C",
  },
  secondary: {
    main: "#FF9800", // Michelangelo orange
    light: "#FFB74D",
    dark: "#F57C00",
  },
  background: {
    default: "#E8F5E9", // Light green background
    paper: "#C8E6C9",
  },
  text: {
    primary: "#1B5E20", // Dark green text
    secondary: "#558B2F",
  },
};

// Matrix theme tokens
export const matrixTokens = {
  primary: {
    main: "#00FF00", // Matrix green
    light: "#66FF66",
    dark: "#00CC00",
  },
  secondary: {
    main: "#003300", // Dark matrix green
    light: "#006600",
    dark: "#001100",
  },
  background: {
    default: "#000000", // Black background
    paper: "#0A0A0A",
  },
  text: {
    primary: "#00FF00", // Matrix green text
    secondary: "#66FF66",
  },
};

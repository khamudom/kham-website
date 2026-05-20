import {
  defaultThemeTokens,
  matrixTokens,
  ninjaTurtlesTokens,
} from "./theme-tokens";
import { ThemeName } from "./themes";

export const getThemeTokens = (themeName: ThemeName) => {
  if (themeName === "defaultDark") return defaultThemeTokens.dark;
  if (themeName === "matrix") return matrixTokens;
  if (themeName === "ninjaTurtles") return ninjaTurtlesTokens;
  return defaultThemeTokens.light;
};

export const isDarkTheme = (themeName: ThemeName) =>
  themeName === "defaultDark" || themeName === "matrix";

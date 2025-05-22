"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { themes, ThemeName } from "./themes";
import { injectCSSVariables } from "./css-variables";
import {
  defaultThemeTokens,
  matrixTokens,
  ninjaTurtlesTokens,
} from "./theme-tokens";

interface ThemeContextType {
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "default",
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Helper to get the correct theme tokens for each theme
  const getThemeTokens = (themeName: ThemeName) => {
    if (themeName === "defaultDark") return defaultThemeTokens.dark;
    if (themeName === "matrix") return matrixTokens;
    if (themeName === "ninjaTurtles") return ninjaTurtlesTokens;
    return defaultThemeTokens.light;
  };

  // Memoize the theme mode to prevent unnecessary recalculations
  const isDark = useMemo(
    () => themeName === "defaultDark" || themeName === "matrix",
    [themeName]
  );

  // Memoize the theme object to prevent unnecessary recreations
  const theme = useMemo(() => createTheme(themes[themeName]), [themeName]);

  // Memoize the setTheme function to prevent unnecessary recreations
  const setTheme = useCallback((theme: ThemeName) => {
    setThemeName(theme);
    localStorage.setItem("theme", theme);
    injectCSSVariables(getThemeTokens(theme));
  }, []);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeName;
    if (savedTheme && Object.keys(themes).includes(savedTheme)) {
      setThemeName(savedTheme);
    }
    setMounted(true);
  }, []);

  // Initial CSS variable injection
  useEffect(() => {
    if (mounted) {
      injectCSSVariables(getThemeTokens(themeName));
    }
  }, [mounted, themeName]);

  const contextValue = useMemo(
    () => ({
      themeName,
      setTheme,
      isDark,
    }),
    [themeName, setTheme, isDark]
  );

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

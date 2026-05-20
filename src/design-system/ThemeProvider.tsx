"use client";

import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { themes, ThemeName } from "./themes";
import { injectCSSVariables } from "./css-variables";
import { getThemeTokens } from "./get-theme-tokens";
import { isValidThemeName, persistTheme } from "./theme-storage";

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

  const isDark = useMemo(
    () => themeName === "defaultDark" || themeName === "matrix",
    [themeName]
  );

  const theme = useMemo(() => createTheme(themes[themeName]), [themeName]);

  const setTheme = useCallback((theme: ThemeName) => {
    setThemeName(theme);
    persistTheme(theme);
    injectCSSVariables(getThemeTokens(theme));
  }, []);

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (isValidThemeName(storedTheme) && storedTheme !== defaultTheme) {
      setThemeName(storedTheme);
      persistTheme(storedTheme);
      return;
    }

    persistTheme(defaultTheme);
  }, [defaultTheme]);

  useLayoutEffect(() => {
    injectCSSVariables(getThemeTokens(themeName));
  }, [themeName]);

  const contextValue = useMemo(
    () => ({
      themeName,
      setTheme,
      isDark,
    }),
    [themeName, setTheme, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { themes, ThemeName } from "./themes";

interface ThemeContextType {
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
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
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeName;
    if (savedTheme && Object.keys(themes).includes(savedTheme)) {
      setThemeName(savedTheme);
    }
    setMounted(true);
  }, []);

  const setTheme = (theme: ThemeName) => {
    setThemeName(theme);
    localStorage.setItem("theme", theme);
  };

  const theme = React.useMemo(
    () => createTheme(themes[themeName]),
    [themeName]
  );

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

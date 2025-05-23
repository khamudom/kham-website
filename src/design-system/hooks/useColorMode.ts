import { useEffect } from "react";
import { useTheme } from "../ThemeProvider";
import { usePrefersDarkMode } from "./useMediaQuery";

/**
 * Hook to sync theme with system preferences
 * @param syncWithSystem Whether to sync with system preferences
 * @returns Object with theme mode and toggle function
 */
export function useColorMode(syncWithSystem: boolean = false) {
  const { themeName, setTheme, isDark } = useTheme();
  const prefersDarkMode = usePrefersDarkMode();

  // Sync with system preferences if enabled
  useEffect(() => {
    if (syncWithSystem) {
      const systemMode = prefersDarkMode ? "defaultDark" : "default";
      if (themeName !== systemMode) {
        setTheme(systemMode);
      }
    }
  }, [syncWithSystem, prefersDarkMode, themeName, setTheme]);

  return { themeName, setTheme, isDark };
}

export default useColorMode;

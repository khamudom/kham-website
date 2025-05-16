import { useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { usePrefersDarkMode } from './useMediaQuery';

/**
 * Hook to sync theme with system preferences
 * @param syncWithSystem Whether to sync with system preferences
 * @returns Object with theme mode and toggle function
 */
export function useColorMode(syncWithSystem: boolean = false) {
  const { mode, toggleTheme, isDark } = useTheme();
  const prefersDarkMode = usePrefersDarkMode();
  
  // Sync with system preferences if enabled
  useEffect(() => {
    if (syncWithSystem) {
      const systemMode = prefersDarkMode ? 'dark' : 'light';
      if (mode !== systemMode) {
        // This will toggle the theme if it doesn't match system preference
        if ((systemMode === 'dark' && !isDark) || (systemMode === 'light' && isDark)) {
          toggleTheme();
        }
      }
    }
  }, [syncWithSystem, prefersDarkMode, mode, toggleTheme, isDark]);
  
  return { mode, toggleTheme, isDark };
}

export default useColorMode;
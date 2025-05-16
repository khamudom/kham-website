import { useState, useEffect } from 'react';
import tokens from '../tokens';

type BreakpointKey = keyof typeof tokens.breakpoints;

/**
 * Hook to check if the current viewport matches a specific breakpoint
 * @param breakpoint The breakpoint to check against
 * @param direction 'up' (greater than or equal) or 'down' (less than)
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(breakpoint: BreakpointKey, direction: 'up' | 'down' = 'up'): boolean {
  const getQuery = (): string => {
    const pixelValue = parseInt(tokens.breakpoints[breakpoint].replace('px', ''));
    
    if (direction === 'up') {
      return `(min-width: ${tokens.breakpoints[breakpoint]})`;
    } else {
      return `(max-width: ${pixelValue - 0.1}px)`;
    }
  };

  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(getQuery()).matches;
    }
    return false;
  });

  useEffect(() => {
    const query = getQuery();
    const mediaQuery = window.matchMedia(query);
    
    const updateMatches = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Add listener for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(updateMatches);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatches);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(updateMatches);
      }
    };
  }, [breakpoint, direction]);

  return matches;
}

/**
 * Predefined media query hooks for common breakpoints
 */
export const useIsMobile = () => useMediaQuery('md', 'down');
export const useIsTablet = () => useMediaQuery('md', 'up') && useMediaQuery('lg', 'down');
export const useIsDesktop = () => useMediaQuery('lg', 'up');
export const useIsLargeDesktop = () => useMediaQuery('xl', 'up');

/**
 * Hook to check if the user prefers dark mode
 */
export const usePrefersDarkMode = (): boolean => {
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updatePreference = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference);
    } else {
      mediaQuery.addListener(updatePreference);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePreference);
      } else {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  return prefersDarkMode;
}

/**
 * Hook to check if the user prefers reduced motion
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updatePreference = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference);
    } else {
      mediaQuery.addListener(updatePreference);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePreference);
      } else {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  return prefersReducedMotion;
}

export default useMediaQuery;
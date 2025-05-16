// Export design system tokens and theme provider
import tokens from './tokens';
import { useTheme, ThemeProvider } from './ThemeProvider';

// Export individual elements
export {
  tokens,
  useTheme,
  ThemeProvider
};

// Default export for convenience
const DesignSystem = {
  tokens,
  useTheme,
  ThemeProvider
};

export default DesignSystem;
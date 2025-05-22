import tokens from "./tokens";

export const injectCSSVariables = (themeTokens: any) => {
  // Build all CSS variables in a single object
  const cssVars = {
    // Base colors
    "--color-primary-main":
      themeTokens.primary?.main ?? tokens.colors.primary.main,
    "--color-primary-light":
      themeTokens.primary?.light ?? tokens.colors.primary.light,
    "--color-primary-dark":
      themeTokens.primary?.dark ?? tokens.colors.primary.dark,

    // Theme-specific colors
    "--color-text-primary": themeTokens.text?.primary,
    "--color-text-secondary": themeTokens.text?.secondary,
    "--color-background-primary": themeTokens.background?.default,
    "--color-background-secondary": themeTokens.background?.paper,
    "--color-border": themeTokens.colors?.border,
    "--color-border-hover": themeTokens.colors?.borderHover,

    // Spacing
    ...Object.entries(tokens.spacing).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--spacing-${key}`]: value,
      }),
      {}
    ),

    // Typography
    ...Object.entries(tokens.typography.fontSize).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--font-size-${key}`]: value,
      }),
      {}
    ),

    // Border radius
    ...Object.entries(tokens.borders.radius).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--border-radius-${key}`]: value,
      }),
      {}
    ),

    // Transitions
    ...Object.entries(tokens.transitions.duration).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--transition-duration-${key}`]: value,
      }),
      {}
    ),

    // Shadows
    ...Object.entries(tokens.shadows).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--shadow-${key}`]: value,
      }),
      {}
    ),
  };

  // Apply all variables in a single style update
  Object.entries(cssVars).forEach(([key, value]) => {
    if (value !== undefined) {
      document.documentElement.style.setProperty(key, value as string);
    }
  });
};

export const themeBackgrounds = {
  default: {
    hero: null,
  },
  defaultDark: {
    hero: null,
  },
  ninjaTurtles: {
    hero: "/images/backgrounds/ninja-turtles-hero.jpg",
  },
  matrix: {
    hero: "/images/backgrounds/matrix-hero.webp",
  },
} as const;

export type ThemeBackgroundKey = keyof typeof themeBackgrounds;

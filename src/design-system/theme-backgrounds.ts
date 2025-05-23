export const themeBackgrounds = {
  default: {
    hero: null,
  },
  defaultDark: {
    hero: null,
  },
  ninjaTurtles: {
    hero: "/images/backgrounds/tmnt.png",
  },
  matrix: {
    hero: null,
    // hero: "/images/backgrounds/matrix-hero.webp",
  },
} as const;

export type ThemeBackgroundKey = keyof typeof themeBackgrounds;

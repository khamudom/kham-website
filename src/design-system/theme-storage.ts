import { themes, ThemeName } from "./themes";

export const THEME_COOKIE = "theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const isValidThemeName = (
  value: string | undefined | null
): value is ThemeName =>
  !!value && Object.keys(themes).includes(value);

export const getThemeFromCookie = (
  cookieValue: string | undefined
): ThemeName => (isValidThemeName(cookieValue) ? cookieValue : "default");

export const persistTheme = (theme: ThemeName) => {
  localStorage.setItem(THEME_COOKIE, theme);
  document.cookie = `${THEME_COOKIE}=${theme};path=/;max-age=${THEME_COOKIE_MAX_AGE};SameSite=Lax`;
};

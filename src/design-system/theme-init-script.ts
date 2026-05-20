import { buildCSSVariables } from "./css-variables";
import { getThemeTokens } from "./get-theme-tokens";
import { ThemeName, themes } from "./themes";

const themeVariableMap = (Object.keys(themes) as ThemeName[]).reduce(
  (acc, themeName) => {
    acc[themeName] = buildCSSVariables(getThemeTokens(themeName));
    return acc;
  },
  {} as Record<ThemeName, ReturnType<typeof buildCSSVariables>>
);

export const themeInitScript = `
(function() {
  try {
    var themes = ${JSON.stringify(themeVariableMap)};
    var theme = "default";
    var cookieMatch = document.cookie.match(/(?:^|; )theme=([^;]*)/);

    if (cookieMatch && themes[decodeURIComponent(cookieMatch[1])]) {
      theme = decodeURIComponent(cookieMatch[1]);
    } else {
      var storedTheme = localStorage.getItem("theme");
      if (storedTheme && themes[storedTheme]) {
        theme = storedTheme;
      }
    }

    var vars = themes[theme];
    var root = document.documentElement;

    for (var key in vars) {
      if (vars[key] !== undefined) {
        root.style.setProperty(key, vars[key]);
      }
    }

    root.style.backgroundColor = vars["--color-background-primary"];
    root.style.color = vars["--color-text-primary"];

    if (${JSON.stringify(["defaultDark", "matrix"])}.indexOf(theme) !== -1) {
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.removeAttribute("data-theme");
      root.style.colorScheme = "light";
    }

    document.cookie = "theme=" + theme + ";path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax";
  } catch (e) {}
})();
`.trim();

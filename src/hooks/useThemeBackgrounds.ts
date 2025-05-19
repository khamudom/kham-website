import { useTheme } from "@/design-system/ThemeProvider";
import { themeBackgrounds } from "@/design-system/theme-backgrounds";

export const useThemeBackgrounds = () => {
  const { themeName } = useTheme();
  return themeBackgrounds[themeName];
};

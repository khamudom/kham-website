import {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions,
} from "@mui/material/styles";

interface CustomTheme {
  backgrounds: {
    hero: string | null;
  };
}

declare module "@mui/material/styles" {
  interface Theme extends MuiTheme, CustomTheme {}
  interface ThemeOptions extends MuiThemeOptions, Partial<CustomTheme> {}
}

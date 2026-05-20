import { themeInitScript } from "./theme-init-script";

export function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
      suppressHydrationWarning
    />
  );
}

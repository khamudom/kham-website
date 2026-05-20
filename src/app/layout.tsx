import { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/design-system/ThemeProvider";
import { ThemeInitScript } from "@/design-system/ThemeInitScript";
import { getThemeFromCookie, THEME_COOKIE } from "@/design-system/theme-storage";
import { AppProvider } from "@/context/AppContext";
import { CursorEffect } from "@/components/CursorEffect/CursorEffect";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "Kham Udom | Frontend UX Engineer",
  description:
    "Kham Udom, Frontend UX Engineer. Design systems, React, TypeScript, Storybook, accessibility and performance. Open to full-time UX engineering roles.",
  keywords:
    "Frontend UX Engineer, UX Engineer, Design Systems, Component Libraries, React, TypeScript, Storybook, Accessibility, Web Performance, AI-assisted development, AI-enabled development",
  authors: [{ name: "Kham Udom" }],
  icons: {
    icon: "/kuicon.png",
  },
  openGraph: {
    title: "Kham Udom | Frontend UX Engineer",
    description:
      "Kham Udom, Frontend UX Engineer. Design systems, React, TypeScript, Storybook, accessibility and performance. Open to full-time UX engineering roles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = getThemeFromCookie(cookies().get(THEME_COOKIE)?.value);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider defaultTheme={initialTheme}>
            <div className="app-container">
              <CursorEffect />
              <main className="main-content">{children}</main>
            </div>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}

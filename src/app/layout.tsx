import { Metadata } from "next";
import { ThemeProvider } from "@/design-system/ThemeProvider";
import { AppProvider } from "@/context/AppContext";
import { CursorEffect } from "@/components/CursorEffect";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "Kham Udom | Frontend UX Engineer",
  description:
    "Portfolio of Kham Udom, a Frontend UX Engineer specializing in component libraries, design systems and enterprise applications",
  keywords:
    "Frontend UX Engineer, Web Developer, Design Systems, Component Libraries, React, TypeScript, Web Components",
  authors: [{ name: "Kham Udom" }],
  icons: {
    icon: "/kulogo.ico",
  },
  openGraph: {
    title: "Kham Udom | Frontend UX Engineer",
    description:
      "Portfolio of Kham Udom, a Frontend UX Engineer specializing in component libraries, design systems and enterprise applications",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider>
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

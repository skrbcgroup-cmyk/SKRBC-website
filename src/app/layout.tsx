import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#0f1c2e",
};

/** Document shell shared by the public site and the admin panel. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.locale} className={`${sourceSerif.variable} ${plexSans.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}

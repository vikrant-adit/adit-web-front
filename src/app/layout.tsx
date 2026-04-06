
// app/layout.tsx
import React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import LayoutClient from "@/components/LayoutClient";
import { getGlobal } from "@/lib/getGlobal";
import { buildImageUrl } from "@/lib/defaults";

// Google Fonts
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Optional: SEO metadata
export const metadata = {
  title: "Adit | All-in-One Sales Enablement Platform",
  description: "Your site description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Fetch global CMS data on server
  const global = await getGlobal();

  const homeBannerRight = `url("${buildImageUrl('home_banner_right_patternimg_bfa2e3fb47.png')}")`;
  const dotsPatternBlue = `url("${buildImageUrl('dots_pattern_blue_037f89b1ba.png')}")`;
  const homeBannerLeft = `url("${buildImageUrl('home_banner_left_patternimg_a7e936bfdc.png')}")`;
  const dotsPatternOrange = `url("${buildImageUrl('dots_pattern_orange_703e4f69c4.png')}")`;

  const rootCssVars = {
    "--home-banner-image-top-right": homeBannerRight,
    "--dots-pattern-blue": dotsPatternBlue,
    "--home-banner-image-bottom-left": homeBannerLeft,
    "--dots-pattern-orange": dotsPatternOrange,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
        style={rootCssVars}
      >
        {/* Pass CMS data to client wrapper */}
        <LayoutClient global={global}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
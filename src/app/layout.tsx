import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SnowfallComponent from "@/components/Snowfall/SnowfallComponent";
import { isChristmasSeason } from "@/utils/dateUtils";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Wrapped",
  description: "Discover your GitHub year in review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine if we should show snowfall based on the date
  const showSnowfall = isChristmasSeason();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showSnowfall && <Script src="/snowfall.js" strategy="afterInteractive" />}
        {children}
        {showSnowfall && <SnowfallComponent isActive={true} />}
        <Analytics />
      </body>
    </html>
  );
}

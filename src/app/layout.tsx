import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chrome Built-in AI",
  description:
    "Run Chrome built-in large language model AI locally in your browser.",
  keywords: [
    "chrome",
    "built-in",
    "chrome built-in",
    "chrome built-in ai",
    "chrome gemini",
    "chrome ai",
    "chrome gemini nano",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6794864725006505"
          crossOrigin="anonymous"
        ></script>
        <GoogleAnalytics gaId="G-B7E1N121PK" />
      </body>
    </html>
  );
}

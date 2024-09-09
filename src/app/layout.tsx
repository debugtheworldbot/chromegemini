import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chromeai.org"),
  title: "Chrome Built-In AI Gemini Nano Test Page",
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
    "native AI",
    "chrome AI",
    "built-in AI",
    "on-device AI",
    "window AI",
  ],
  openGraph: {
    type: "website",
    url: "https://chromeai.org",
    title: "Chrome Built-In AI Gemini Nano Test Page",
    description:
      "Run Chrome built-in large language model AI locally in your browser.",
    siteName: "Chrome Built-In AI Gemini Nano Test Page",
    images: [
      {
        url: "https://assets.chromeai.org/og-image.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Analytics />
          <SpeedInsights />
          {/* <script */}
          {/*   async */}
          {/*   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6794864725006505" */}
          {/*   crossOrigin="anonymous" */}
          {/* ></script> */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3460143338187515"
            crossOrigin="anonymous"
          ></script>
          <script
            defer
            data-domain="chromeai.org"
            src="https://plausible.midway.run/js/script.js"
          ></script>
          <Toaster />

          <GoogleAnalytics gaId="G-B7E1N121PK" />
        </body>
      </html>
    </ViewTransitions>
  );
}

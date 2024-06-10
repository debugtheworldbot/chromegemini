import "./globals.css";

import Background from "@/components/background";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

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
    <html lang='en'>
      <body className={inter.className}>
        <Background>{children}</Background>

        <Script
          id='ms_clarity'
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mpra1dkc9i");`,
          }}
        />
      </body>
    </html>
  );
}
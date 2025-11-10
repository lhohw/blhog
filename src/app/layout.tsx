import type { Metadata } from "next";
import { nunito_sans } from "@/styles/fonts";
import "@/styles/globals.scss";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import MainColorEffect from "@/components/effects/MainColorEffect";
import Header from "@/components/organisms/Header";
import PlumTreeBackground from "@/components/organisms/PlumTreeBackground";

export const metadata: Metadata = {
  title: {
    template: "%s | Blhog",
    default: "Blhog",
  },
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://blhog.vercel.app"
      : "http://localhost:3000",
  ),
  description: "lhohw's personal blog to share various information",
  applicationName: "lhohw's blog",
  classification: "personal blog",
  generator: "Next.js",
  creator: "lhohw",
  authors: { name: "lhohw", url: "https://github.com/lhohw" },
  icons: "./icon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nunito_sans.className} data-theme="unset">
        <div className="p-1 sm:pt-3 sm:px-6 sm:pb-6">
          <Header />
          <main className="flex flex-1 flex-col md:flex-row">{children}</main>
        </div>
        <PlumTreeBackground />
        <MainColorEffect />
        <GoogleAnalytics gaId="G-S72WF3ZJF0" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

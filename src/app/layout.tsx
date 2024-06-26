import type { Metadata } from "next";
import Header from "@/components/organisms/Header";
import MainColorEffect from "@/components/effects/MainColorEffect";
import GoogleAnalytics from "@/components/organisms/GoogleAnalytics";
import { nunito_sans } from "@/styles/fonts";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | Blhog",
    default: "Blhog",
  },
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://blhog.vercel.app",
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
      </body>
      <MainColorEffect />
      <GoogleAnalytics />
    </html>
  );
}

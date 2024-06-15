import type { Metadata } from "next";
import Header from "@/components/organisms/Header";
import PlumTreeBackground from "@/components/organisms/PlumTreeBackground";
import MainColorEffect from "@/components/effects/MainColorEffect";
import { nunito_sans } from "@/styles/fonts";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | Blhog",
    default: "Blhog",
  },
  description: "lhohw's blog",
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
      </body>
      <MainColorEffect />
    </html>
  );
}

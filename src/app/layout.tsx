import type { Metadata } from "next";
import MainColorEffect from "@/components/effects/MainColorEffect";
import PlumTreeEffect from "@/components/effects/PlumTreeEffect";
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
        {children}
        <PlumTreeEffect />
      </body>
      <MainColorEffect />
    </html>
  );
}

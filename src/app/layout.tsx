import type { Metadata } from "next";
import "@/styles/globals.css";
import { nunito_sans } from "@/styles/fonts";
import MainColorEffect from "@/components/effects/MainColorEffect";
import PlumTreeEffect from "@/components/effects/PlumTreeEffect";

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
      <body className={nunito_sans.className}>
        {children}
        <PlumTreeEffect />
      </body>
      <MainColorEffect />
    </html>
  );
}

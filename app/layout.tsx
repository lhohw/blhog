import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { nunito_sans } from "@/app/ui/fonts";

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
      <body className={nunito_sans.className}>{children}</body>
    </html>
  );
}

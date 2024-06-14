import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/components/organisms/Header";

export const metadata: Metadata = {
  title: "Post",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="p-1 sm:pt-3 sm:px-6 sm:pb-6">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">{children}</main>
    </div>
  );
}

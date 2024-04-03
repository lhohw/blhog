import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/app/ui/posts/Header";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen pt-3 px-6 pb-6">
      <div className="flex flex-col flex-1 h-[calc(100dvh-36px)] bg-dark rounded-lg">
        <Header />
        <div className="flex flex-1 overflow-y-hidden">{children}</div>
      </div>
    </main>
  );
}

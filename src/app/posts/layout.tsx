import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/components/organisms/Header";
import PostLayoutComposition from "@/components/molecules/PostLayoutComposition";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({
  children,
  sidebar,
}: PropsWithChildren<{ sidebar: React.ReactNode }>) {
  return (
    <div className="p-1 sm:pt-3 sm:px-6 sm:pb-6">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <PostLayoutComposition sidebar={sidebar} content={children} />
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/components/organisms/Header";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import PostsSidebar from "@/components/templates/PostsSidebar";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="p-1 sm:pt-3 sm:px-6 sm:pb-6">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <SidebarWrapper>
          <PostsSidebar />
        </SidebarWrapper>
        <PostsContentWrapper>{children}</PostsContentWrapper>
      </main>
    </div>
  );
}

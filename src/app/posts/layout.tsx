import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import PostsSidebar from "@/components/templates/PostsSidebar";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <SidebarWrapper>
        <PostsSidebar />
      </SidebarWrapper>
      <PostsContentWrapper>{children}</PostsContentWrapper>
    </>
  );
}

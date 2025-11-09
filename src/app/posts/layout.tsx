import type { PropsWithChildren } from "react";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import PostsSidebar from "@/app/posts/PostsSidebar";

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

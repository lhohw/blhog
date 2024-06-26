import type { PropsWithChildren } from "react";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import PostsSidebar from "@/components/templates/PostsSidebar";
import PlumTreeBackground from "@/components/organisms/PlumTreeBackground";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <SidebarWrapper>
        <PostsSidebar />
      </SidebarWrapper>
      <PostsContentWrapper>{children}</PostsContentWrapper>
      <PlumTreeBackground />
    </>
  );
}

"use client";

import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import ResizableSidebar from "@/components/molecules/ResizableSidebar";
import EasingSidebar from "./EasingSidebar";
import EasingVisual from "./EasingVisual";

export default function Easing() {
  return (
    <>
      <SidebarWrapper>
        <ResizableSidebar>
          <EasingSidebar />
        </ResizableSidebar>
      </SidebarWrapper>
      <PostsContentWrapper>
        <EasingVisual />
      </PostsContentWrapper>
    </>
  );
}

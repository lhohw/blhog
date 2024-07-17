"use client";

import PostsContentWrapper from "@/components/atoms/wrapper/PostsContentWrapper";
import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import ResizableSidebar from "@/components/molecules/ResizableSidebar";
import EasingSidebar from "./EasingSidebar";
import EasingVisual from "./EasingVisual";
import useEasing from "./useEasing";

export default function Easing() {
  const {
    isPlaying,
    play,
    easingFunction,
    selectEasingFunction,
    type,
    selectType,
    setFrame,
  } = useEasing();

  return (
    <>
      <SidebarWrapper>
        <ResizableSidebar>
          <EasingSidebar
            easingFunction={easingFunction}
            selectEasingFunction={selectEasingFunction}
            isPlaying={isPlaying}
            play={play}
            selectType={selectType}
          />
        </ResizableSidebar>
      </SidebarWrapper>
      <PostsContentWrapper>
        <EasingVisual type={type} setFrame={setFrame} />
      </PostsContentWrapper>
    </>
  );
}

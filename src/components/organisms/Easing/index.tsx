"use client";

import SidebarWrapper from "@/components/atoms/wrapper/SidebarWrapper";
import ResizableSidebar from "@/components/molecules/ResizableSidebar";
import EasingSidebar from "./EasingSidebar";
import EasingVisual from "./EasingVisual";
import useEasing from "./useEasing";
import clsx from "clsx";

export default function Easing() {
  const {
    isPlaying,
    play,
    easingFunction,
    selectEasingFunction,
    type,
    selectType,
    setFrame,
    isBallOverflow,
  } = useEasing();

  return (
    <div className="flex flex-col md:flex-row w-full">
      <SidebarWrapper className="max-md:static">
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
      <div className="flex flex-1.6 flex-col p-4 min-w-72 w-full">
        <div
          className={clsx(
            "flex flex-col md:flex-row",
            isBallOverflow && "scale-75",
          )}
        >
          <EasingVisual type={type} setFrame={setFrame} />
        </div>
      </div>
    </div>
  );
}

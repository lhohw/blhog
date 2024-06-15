"use client";

import { useCallback, useEffect, useRef } from "react";
import { textSeaColors } from "@/const/color";
import { getRoot } from "@/lib/utils/dom";
import useDom from "@/hooks/react/useDom";

export default function MainColorEffect() {
  const id = useRef<Timer>(null!);
  const getCachedRoot = useDom(getRoot);

  const mainColorAnim = useCallback(() => {
    let i = 0;
    const root = getCachedRoot();
    id.current = setInterval(() => {
      root.style.setProperty("--main-color", textSeaColors[i]);
      i = ++i % textSeaColors.length;
    }, 1e4);
  }, [getCachedRoot]);

  useEffect(() => {
    const isMotionReduced = window.matchMedia("(prefers-reduced-motion)");
    if (isMotionReduced.matches) return;
    mainColorAnim();

    const onChange = (e: MediaQueryListEvent) => {
      const { matches } = e;

      if (matches) mainColorAnim();
      else clearInterval(id.current);
    };

    isMotionReduced.addEventListener("change", onChange);
    return () => {
      isMotionReduced.removeEventListener("change", onChange);
    };
  }, [mainColorAnim]);

  return <></>;
}

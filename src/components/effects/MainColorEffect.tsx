"use client";

import { useCallback, useEffect, useRef } from "react";
import { textSeaColors } from "@/const/color";
import { getRoot } from "@/lib/utils/dom";
import useDom from "@/hooks/react/useDom";

export default function MainColorEffect() {
  const id = useRef<Timer | undefined>(undefined);
  const getRootWithCache = useDom(getRoot);

  const mainColorAnim = useCallback(() => {
    let i = 0;
    const root = getRootWithCache();

    const id = setInterval(() => {
      root.style.setProperty("--main-color", textSeaColors[i]);
      i = ++i % textSeaColors.length;
    }, 1e4);

    return id;
  }, [getRootWithCache]);

  useEffect(() => {
    const isMotionReduced = window.matchMedia("(prefers-reduced-motion)");
    if (!isMotionReduced.matches) id.current = mainColorAnim();

    const onChange = (e: MediaQueryListEvent) => {
      const { matches } = e;

      clearInterval(id.current);
      if (!matches) id.current = mainColorAnim();
    };

    isMotionReduced.addEventListener("change", onChange);
    return () => {
      clearInterval(id.current);
      isMotionReduced.removeEventListener("change", onChange);
    };
  }, [mainColorAnim]);

  return <></>;
}

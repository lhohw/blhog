"use client";

import { useCallback, useEffect, useRef } from "react";
import { textSeaColors } from "@/const/color";

export default function MainColorEffect() {
  const id = useRef<Timer>(null!);

  const mainColorAnim = useCallback(() => {
    let i = 0;
    const root = document.querySelector(":root")! as HTMLHtmlElement;
    id.current = setInterval(() => {
      root.style.setProperty("--main-color", textSeaColors[i]);
      i = ++i % textSeaColors.length;
    }, 1e4);
  }, []);

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

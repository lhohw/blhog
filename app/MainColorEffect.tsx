"use client";

import { useEffect } from "react";
import { textSeaColors } from "@/app/const/color";

export default function MainColorEffect() {
  useEffect(() => {
    let i = 0;
    const root = document.querySelector(":root")! as HTMLHtmlElement;
    const id = setInterval(() => {
      root.style.setProperty("--main-color", textSeaColors[i]);
      i = ++i % textSeaColors.length;
    }, 1e4);

    return () => clearInterval(id);
  }, []);

  return <></>;
}

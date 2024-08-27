"use client";

import { useEffect, useState } from "react";

export default function useCanvasSetting() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(375);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const width = Math.min(window.innerWidth - 12, 600);
    const height = width / 1.6;
    const dpr = window.devicePixelRatio || 1;

    setWidth(width);
    setHeight(height);
    setDpr(dpr);
  }, []);

  return {
    width,
    height,
    dpr,
  };
}

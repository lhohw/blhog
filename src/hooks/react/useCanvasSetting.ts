"use client";

import { useEffect, useState } from "react";

export default function useCanvasSetting(initialWidth = 0, initialHeight = 0) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
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

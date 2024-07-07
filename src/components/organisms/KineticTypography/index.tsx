"use client";

import { useEffect, useRef } from "react";
import useText from "./useText";
import useSetting from "./useSetting";
import useVisual from "./useVisual";

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const isInitialized = useRef(false);

  const { width, height } = useSetting();
  const { initText } = useText(width, height);
  const { init, animate } = useVisual(containerRef, width, height);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const container = containerRef.current;
      const { ctx, coords } = initText();
      container.appendChild(ctx.canvas);

      const { ctx: visualCtx, particles } = init(coords);
      container.appendChild(visualCtx.canvas);

      animate(visualCtx, particles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden shadow-corona-primary"
      style={{ width, height }}
    ></div>
  );
}

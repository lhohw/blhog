"use client";

import { useEffect, useRef } from "react";
import useText from "./useText";
import useSetting from "./useSetting";
import useVisual from "./useVisual";
import RafControl from "@/class/RafControl";

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const controlRef = useRef<RafControl>(null!);

  const { width, height } = useSetting();
  const { initText } = useText(width, height);
  const { init, animate } = useVisual(containerRef, width, height);

  useEffect(() => {
    if (!controlRef.current) {
      const container = containerRef.current;
      const { ctx, coords } = initText();
      container.appendChild(ctx.canvas);

      const { ctx: visualCtx, particles } = init(coords);
      container.appendChild(visualCtx.canvas);

      controlRef.current = animate(visualCtx, particles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controlRef.current?.restart();
    return () => controlRef.current?.done();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden shadow-corona-primary"
      style={{ width, height }}
    ></div>
  );
}

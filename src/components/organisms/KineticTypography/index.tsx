"use client";

import { useEffect, useRef } from "react";
import useText from "./useText";
import useVisual from "./useVisual";
import useSetting from "./useSetting";

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const isInitialized = useRef(false);

  const { width, height } = useSetting();
  const { initText } = useText(width, height);
  const { initApp, loadParticleAsset, initParticles, animate } = useVisual(
    containerRef,
    width,
    height,
  );

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const container = containerRef.current;
      const { ctx, coords } = initText();
      container.appendChild(ctx.canvas);

      Promise.all([initApp(), loadParticleAsset()]).then(
        ([canvas, texture]) => {
          const particles = initParticles(coords, texture);
          container.appendChild(canvas);
          animate(particles);
        },
      );
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

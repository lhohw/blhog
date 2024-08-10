"use client";

import { useEffect, useRef } from "react";
import SmokeParticleSystemGL from "./gl";
import RafControl from "@/class/RafControl";
import usePointer from "@/hooks/react/usePointer";

const SmokeParticleSystem = () => {
  const isInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafControl = useRef<RafControl>(null!);
  const smokeParticleSystem = useRef<SmokeParticleSystemGL>(null!);

  const { getPointer } = usePointer();

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const width = Math.min(window.innerWidth - 12, 600);
      const height = (width / 16) * 10;
      const gl = new SmokeParticleSystemGL(width, height);
      gl.canvas.classList.add("shadow-corona-primary");

      containerRef.current?.appendChild(gl.canvas);
      smokeParticleSystem.current = gl;

      rafControl.current = new RafControl(() => {
        const { mx } = getPointer();
        const normalizedMx = ((mx - width / 2) / width) * 2;
        gl.draw(normalizedMx);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const raf = rafControl.current;
    if (!container) return;

    const start = () => raf.restart();
    const done = () => raf.done();

    container.addEventListener("pointerenter", start);
    container.addEventListener("pointerleave", done);
    return () => {
      container.removeEventListener("pointerenter", start);
      container.removeEventListener("pointerleave", done);
    };
  });

  return (
    <div className="flex flex-col w-full items-center" ref={containerRef}></div>
  );
};

export default SmokeParticleSystem;

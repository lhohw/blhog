"use client";

import { useCallback, useEffect, useRef } from "react";
import useText from "./useText";
import useVisual from "./useVisual";
import usePointer from "./usePointer";
import RafControl from "@/class/RafControl";
import Particle from "@/class/Particle";

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const controlRef = useRef<RafControl>(null!);

  const { initText } = useText();
  const { init, drawParticles } = useVisual();
  const { getPointer, pointerListener } = usePointer();

  const initElements = useCallback(() => {
    const width = Math.min(window.innerWidth - 12, 600);
    const height = (width / 16) * 10;

    const container = containerRef.current;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    const { ctx: textCtx, coords } = initText(width, height);
    container.appendChild(textCtx.canvas);

    const { ctx: visualCtx, particles } = init(width, height, coords);
    container.appendChild(visualCtx.canvas);

    return { visualCtx, particles };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setControl = useCallback(
    (visualCtx: CanvasRenderingContext2D, particles: Particle[]) => {
      const pointer = getPointer();
      const frame = () => drawParticles(visualCtx, particles, pointer);
      const ctrl = new RafControl(frame, 16);
      controlRef.current = ctrl;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const addListeners = useCallback(() => {
    const container = containerRef.current;
    const ctrl = controlRef.current;

    container.addEventListener("pointermove", pointerListener);
    container.addEventListener("pointerenter", ctrl.restart.bind(ctrl));
    container.addEventListener("pointerleave", ctrl.done.bind(ctrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!controlRef.current) {
      const { visualCtx, particles } = initElements();
      setControl(visualCtx, particles);
      addListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctrl = controlRef.current;

    document.body.style.overflow = "hidden";
    return () => {
      if (!ctrl.isDone) ctrl.done();
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden shadow-corona-primary"
    ></div>
  );
}

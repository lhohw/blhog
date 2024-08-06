"use client";

import { useCallback, useEffect, useRef } from "react";
import RafControl from "@/class/RafControl";
import useText from "./useText";
import usePointer from "./usePointer";
import useVisual from "./useVisual";

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const controlRef = useRef<RafControl>(null!);

  const { initText } = useText();
  const { getPointer, pointerListener } = usePointer();
  const { init, drawParticles } = useVisual();

  const initElements = useCallback(() => {
    const width = Math.min(window.innerWidth - 12, 600);
    const height = (width / 16) * 10;

    const container = containerRef.current;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    const { ctx, coords } = initText(width, height);
    const gl = init(width, height, coords);

    container.append(ctx.canvas, gl.canvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setControl = useCallback(
    () => {
      const pointer = getPointer();
      const frame = () => drawParticles(pointer);
      const ctrl = new RafControl(frame);
      controlRef.current = ctrl;
      frame();
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
      initElements();
      setControl();
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

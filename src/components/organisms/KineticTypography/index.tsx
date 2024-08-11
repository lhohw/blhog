"use client";

import { useCallback, useEffect, useRef } from "react";
import RafControl from "@/class/RafControl";
import useText from "./useText";
import useVisual from "./useVisual";

export default function KineticTypography() {
  const isInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const controlRef = useRef<RafControl>(new RafControl());

  const { initText } = useText();
  const { init, drawParticles } = useVisual();

  const initElements = useCallback(async () => {
    const width = Math.min(window.innerWidth - 12, 600);
    const height = (width / 16) * 10;

    const container = containerRef.current;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    const { ctx, coords } = initText(width, height);
    const { canvas } = await init(width, height, coords);

    container.append(ctx.canvas, canvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setControl = useCallback(
    () => {
      const ctrl = controlRef.current;
      ctrl.frame = () => drawParticles();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const addListeners = useCallback(() => {
    const container = containerRef.current;
    const ctrl = controlRef.current;

    container.addEventListener("pointerenter", ctrl.restart.bind(ctrl));
    container.addEventListener("pointerleave", ctrl.done.bind(ctrl));
  }, []);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      initElements().then(() => {
        setControl();
        addListeners();
        drawParticles();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctrl = controlRef.current;

    document.body.style.overflow = "hidden";
    return () => {
      if (ctrl.isDone === false) ctrl.done();
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

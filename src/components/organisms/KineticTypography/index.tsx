"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useVisual from "./useVisual";
import useCanvasSetting from "@/hooks/react/useCanvasSetting";
import RafControl from "@/class/RafControl";

export default function KineticTypography() {
  const visualCanvasRef = useRef<HTMLCanvasElement>(null!);
  const rafControl = useRef<RafControl>(null!);

  const { width, height, dpr } = useCanvasSetting();
  const { initVisual, drawParticles, cleanup } = useVisual();
  const [loadState, setLoadState] = useState<"loading" | "error" | "resolve">(
    "loading",
  );

  useEffect(() => {
    if (!width || !height) return;

    try {
      initVisual(visualCanvasRef.current, width, height, dpr);
      setLoadState("resolve");
    } catch (e) {
      console.error(e);
      setLoadState("error");
    }

    return () => {
      cleanup();
    };
  }, [initVisual, width, height, cleanup, dpr]);

  useEffect(() => {
    rafControl.current = new RafControl(drawParticles);
    const raf = rafControl.current;
    const visualCanvas = visualCanvasRef.current;

    raf.initStart();

    const start = raf.resume.bind(raf);
    const pause = raf.pause.bind(raf);

    visualCanvas.addEventListener("pointerenter", start);
    visualCanvas.addEventListener("pointerleave", pause);

    return () => {
      raf.cleanup();
      rafControl.current = null!;
      visualCanvas.removeEventListener("pointerenter", start);
      visualCanvas.removeEventListener("pointerleave", pause);
    };
  }, [drawParticles]);

  return (
    <div
      className={clsx(
        "relative overflow-hidden transition-shadow w-fit h-fit",
        "shadow-corona-primary",
      )}
      style={{ width, height }}
    >
      <canvas className="absolute inset-0" ref={visualCanvasRef} />
      {loadState === "error" ? (
        <div className="flex absolute self-center top-5 text-lg">
          <span>WebGL is not initialized correctly</span>
        </div>
      ) : null}
    </div>
  );
}

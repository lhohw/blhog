"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import RafControl from "@/class/RafControl";
import useVisual from "./useVisual";

export default function SmokeParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const rafControl = useRef<RafControl>(null!);

  const { initVisual, drawParticles, cleanup } = useVisual();
  const [loadState, setLoadState] = useState<"loading" | "error" | "resolve">(
    "loading",
  );

  useEffect(() => {
    const width = Math.min(window.innerWidth - 12, 600);
    const height = width / 1.6;

    try {
      initVisual(canvasRef.current, width, height);
      setLoadState("resolve");
    } catch (e) {
      console.error(e);
      setLoadState("error");
    }

    return () => {
      cleanup();
    };
  }, [initVisual, cleanup]);

  useEffect(() => {
    rafControl.current = new RafControl(drawParticles);
    const raf = rafControl.current;
    const canvas = canvasRef.current;

    raf.start();

    const start = raf.resume.bind(raf);
    const pause = raf.pause.bind(raf);

    canvas.addEventListener("pointerenter", start);
    canvas.addEventListener("pointerleave", pause);
    return () => {
      raf.cleanup();
      rafControl.current = null!;
      canvas.removeEventListener("pointerenter", start);
      canvas.removeEventListener("pointerleave", pause);
    };
  }, [drawParticles]);

  return (
    <div
      className={clsx(
        "flex flex-col w-full h-fit items-center relative",
        loadState !== "loading" && "area",
      )}
    >
      <canvas className="blur-[2px]" ref={canvasRef} />
      {loadState === "error" ? (
        <div className="flex absolute self-center top-5 text-lg">
          <span>WebGL is not initialized correctly</span>
        </div>
      ) : null}
    </div>
  );
}

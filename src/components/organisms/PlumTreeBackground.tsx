"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import plumTree from "@/lib/utils/canvas/plumTree";
import RafControl from "@/class/RafControl";

export default function PlumTreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const controlsRef = useRef<RafControl>(null!);

  useEffect(() => {
    if (!controlsRef.current) {
      const { innerWidth, innerHeight } = window;

      const width = innerWidth;
      const height = innerHeight;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { init } = plumTree(canvas, width, height);

      const controls = init();
      controlsRef.current = controls;
      controlsRef.current.start();
    }
  }, []);

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    if (controls.isDone) return;

    if (pathname.startsWith("/graphic")) controls.pause();
    else controls.resume();
  }, [pathname]);

  return (
    <div
      className="bg-inherit fixed left-0 top-0 w-full h-full -z-20"
      style={{
        maskImage: "radial-gradient(circle, transparent, black)",
      }}
    >
      <canvas className="mix-blend-exclusion" ref={canvasRef} />
    </div>
  );
}

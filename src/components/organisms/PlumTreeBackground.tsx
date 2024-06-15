"use client";

import { useEffect, useRef } from "react";
import plumTree from "@/lib/utils/canvas/plumTree";

export default function PlumTreeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { innerWidth, innerHeight } = window;

    const width = innerWidth;
    const height = innerHeight;
    const canvas = canvasRef.current;
    if (!canvas) return;

    plumTree(canvas, width, height);
  }, []);

  return (
    <div
      className="bg-inherit fixed left-0 top-0 w-full h-full -z-10"
      style={{
        maskImage: "radial-gradient(circle, transparent, black)",
      }}
    >
      <canvas className="mix-blend-exclusion" ref={canvasRef} />
    </div>
  );
}

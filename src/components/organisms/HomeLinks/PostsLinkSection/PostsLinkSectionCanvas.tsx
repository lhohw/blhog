"use client";

import { useEffect, useRef } from "react";
import { useSizeContext } from "../useSizeContext";
import initCanvas from "@/lib/utils/canvas/initCanvas";

export default function PostsLinkSectionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { width, height } = useSizeContext().size;

  useEffect(() => {
    const canvas = canvasRef.current;
    initCanvas(canvas, width, height);
  }, [height, width]);

  return <canvas style={{ width, height }} ref={canvasRef} />;
}

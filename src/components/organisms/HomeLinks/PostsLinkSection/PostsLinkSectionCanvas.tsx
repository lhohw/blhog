"use client";

import { useEffect, useRef } from "react";
import { useSizeContext } from "../useSizeContext";

export default function PostsLinkSectionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { width, height } = useSizeContext().size;

  useEffect(() => {
    const canvas = canvasRef.current;
  }, [height, width]);

  return <canvas ref={canvasRef} />;
}

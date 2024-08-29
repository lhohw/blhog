"use client";

import { useEffect, useRef } from "react";
import { useSizeContext } from "../useSizeContext";
import PostsLinkSectionGlsl from "./glsl";

export default function PostsLinkSectionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { width, height } = useSizeContext().size;

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = new PostsLinkSectionGlsl(canvas, width, height);
    gl.draw();

    return () => {
      gl.cleanup();
    };
  }, [height, width]);

  return (
    <div className="my-4" style={{ width, height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useSizeContext } from "../useSizeContext";
import GL from "@/class/glsl/GL";
import { shaders, vertices, pattern } from "@/glsl/postLinkSection";

export default function PostsLinkSectionCanvas() {
  const isInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width, height } = useSizeContext().size;

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const gl = new GL(width, height, shaders, vertices, pattern);
      const container = containerRef.current;
      const canvas = gl?.canvas;

      if (container && canvas) {
        gl.draw(true);
        container.appendChild(canvas);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-4" ref={containerRef} style={{ width, height }}></div>
  );
}

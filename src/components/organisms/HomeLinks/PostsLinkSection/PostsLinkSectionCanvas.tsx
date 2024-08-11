"use client";

import { useEffect, useRef } from "react";
import { useSizeContext } from "../useSizeContext";
import PostsLinkSectionGlsl from "./glsl";

export default function PostsLinkSectionCanvas() {
  const isInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width, height } = useSizeContext().size;

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const gl = new PostsLinkSectionGlsl(width, height);
      containerRef.current.appendChild(gl.canvas);
      gl.init().then(() => {
        gl.draw();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-4" ref={containerRef} style={{ width, height }}></div>
  );
}

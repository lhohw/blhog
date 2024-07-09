"use client";

import { useEffect, useRef } from "react";
import H3 from "@/components/atoms/headings/H3";
import BackArrow from "@/components/icons/BackArrow";

export default function AnimatedBackPage() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const animate = containerRef.current.querySelector("animate");
      if (!animate) return;

      animate.setAttribute("repeatCount", "indefinite");
      animate.setAttribute("values", "48;0;48;48");
      animate.setAttribute("dur", "4s");
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <H3 mainColor={false} className="p-4">
        Animated Back
      </H3>
      <div
        ref={containerRef}
        className="flex w-32 h-32 my-6 items-center justify-center"
      >
        <BackArrow />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import RafControl from "@/class/RafControl";
import useVisual, { IMAGE_HEIGHT } from "./useVisual";

export default function TextScrubber() {
  const visualCanvasRef = useRef<HTMLCanvasElement>(null!);
  const textCanvasRef = useRef<HTMLCanvasElement>(null!);
  const rafControl = useRef<RafControl>(null!);

  const {
    initVisual, onImageClick, imgInfos
  } = useVisual();
  const [loadState, setLoadState] = useState<"loading" | "error" | "resolve">(
    "loading"
  );

  useEffect(() => {
    const width = Math.min(window.innerWidth - 12, 600);
    const height = width / 1.6;
    const dpr = 1;

    try {
      initVisual(textCanvasRef.current, visualCanvasRef.current, width, height, dpr).then(() => {
        setLoadState("resolve");
      })
    } catch (e) {
      console.error(e);
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      if (rafControl.current?.isDone === false) {
        rafControl.current.done();
      }
      document.body.style.removeProperty("overflow");
    }
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex [&>img+img]:ml-2 mb-8 [&>img]:cursor-pointer">
        {
          loadState === "resolve" && imgInfos.map(({ src, alt, width }, idx) => (
            <Image
              key={src}
              height={IMAGE_HEIGHT}
              width={width}
              src={src}
              alt={alt}
              onClick={() => onImageClick(visualCanvasRef.current, idx)}
            />
          ))
        }
      </div>
      <div className={clsx(
        "overflow-hidden transition-shadow w-fit h-fit ml-4 relative",
        loadState !== "loading" && "shadow-corona-primary",
      )}>
        <canvas ref={textCanvasRef} style={{ position: 'absolute' }} />
        <canvas ref={visualCanvasRef} />
        {loadState === "error" ? (
          <div className="flex absolute self-center top-5 text-lg">
            <span>WebGL is not initialized correctly</span>
          </div>
        ): null}
      </div>
    </div>
  )
}
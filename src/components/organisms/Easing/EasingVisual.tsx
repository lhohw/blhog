"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Section from "@/components/molecules/Section";
import RafControl from "@/class/RafControl";
import Easing from "@/class/Easing";
import initCanvas from "@/lib/utils/canvas/initCanvas";

export default function EasingVisual() {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 w-full p-4 min-h-full-except-header">
      <Ball />
    </div>
  );
}

const Ball = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const ballRef = useRef<HTMLDivElement>(null!);
  const controlRef = useRef<RafControl | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [isPlaying, setIsPlaying] = useState(false);

  const r = useMemo(() => 20, []);
  const f = useCallback((t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }, []);

  useEffect(() => {
    if (!controlRef.current) {
      const container = containerRef.current;
      const ball = ballRef.current;

      if (!container || !ball) {
        console.error("container or ball not rendered");
        return;
      }

      const containerWidth = container.clientWidth;

      const duration = 2000;
      const dist = containerWidth - 2 * r;
      const easing = new Easing(f);

      let startTime: number | undefined;
      const frame = (now: number) => {
        if (!startTime) startTime = now;
        now -= startTime;

        const x = easing.getValue(now / duration);
        const { direction } = easing;

        ball.style.setProperty("--tw-translate-x", `${x * dist}px`);
        ball.style.setProperty("--tw-rotate", `${(now / r) * direction}rad`);

        if (now !== 0 && easing.isOut(x)) {
          controlRef.current!.done();
          setIsPlaying(false);
          startTime = undefined;
          easing.flip();
          return;
        }
      };

      controlRef.current = new RafControl(frame, 16);
      drawGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("canvas not supported");
    canvas.classList.add("border-slight", "border-primary", "p-2");

    const { ctx } = initCanvas(canvas, 160, 160);
    ctx.fillStyle = "#faeae1";

    for (let i = 0; i < 150; i++) {
      const y = 160 * (1 - f(i / 160));
      drawDot(ctx, i, y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawDot = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    },
    [],
  );

  const play = useCallback(() => {
    controlRef.current?.restart();
    setIsPlaying(true);
  }, []);

  return (
    <Section className="grid" title="Ball" mainColor={false}>
      <div className="flex my-2 justify-between">
        <canvas ref={canvasRef} />
        <button
          className={clsx(
            "w-fit h-fit area rounded-lg px-4 py-2 mb-4",
            isPlaying && "bg-[#a8a8a878] text-text-alpha cursor-not-allowed",
          )}
          disabled={isPlaying}
          onClick={play}
        >
          Play
        </button>
      </div>
      <div
        ref={containerRef}
        className="flex flex-1 flex-col w-full h-full area justify-end"
      >
        <div
          ref={ballRef}
          className="w-10 h-10 rounded-full area flex items-center justify-start p-1 rotate-0"
        >
          <div className="w-1 h-1 bg-primary" />
        </div>
      </div>
    </Section>
  );
};

import { MutableRefObject, useCallback } from "react";
import Particle from "@/class/Particle";
import initCanvas from "@/lib/utils/canvas/initCanvas";
import { Coord } from "./useText";

export type useVisualProps = {
  containerRef: MutableRefObject<HTMLDivElement>;
  width: number;
  height: number;
};
export default function useVisual(
  containerRef: MutableRefObject<HTMLDivElement>,
  width: number,
  height: number,
) {
  const initVisualCanvas = useCallback(() => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const { ctx } = initCanvas(canvas, width, height, {
      desynchronized: true,
    });

    canvas.classList.add("absolute", "inset-0");

    return ctx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initParticles = useCallback((coords: Coord[]) => {
    const particles = [];
    for (let i = 0; i < coords.length; i++) {
      const { x, y } = coords[i];
      const particle = new Particle(x, y);
      particles.push(particle);
    }

    return particles;
  }, []);

  const drawParticles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
      mx = 0,
      my = 0,
      mr = 0,
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const radius = 44 * 0.03;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.render(mx, my, mr);

        const { x, y, color } = particle;
        const fillColor = Math.round(color).toString(16);
        ctx.fillStyle = `#${fillColor}`;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    },
    [],
  );

  const init = useCallback(
    (coords: Coord[]) => {
      const ctx = initVisualCanvas();
      const particles = initParticles(coords);
      ctx.fillStyle = "#f3316e";
      drawParticles(ctx, particles);

      return {
        ctx,
        particles,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      const container = containerRef.current;
      let mx = 0,
        my = 0;
      const mr = 30;
      container.addEventListener("pointermove", (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        mx = offsetX;
        my = offsetY;
      });

      requestAnimationFrame(function cb() {
        requestAnimationFrame(cb);
        drawParticles(ctx, particles, mx, my, mr);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    init,
    animate,
  };
}

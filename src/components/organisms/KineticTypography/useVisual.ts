import type { Pointer } from "./usePointer";
import { useCallback } from "react";
import Particle from "@/class/Particle";
import initCanvas from "@/lib/utils/canvas/initCanvas";
import { Coord } from "./useText";

export default function useVisual() {
  const initVisualCanvas = useCallback((width: number, height: number) => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const { ctx } = initCanvas(canvas, width, height, {
      desynchronized: true,
    });

    canvas.classList.add("absolute", "inset-0");

    return ctx;
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
      pointer: Pointer = { mx: 0, my: 0, mr: 0 },
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const radius = 22 * 0.06;
      const { mx, my, mr } = pointer;

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
    (width: number, height: number, coords: Coord[]) => {
      const ctx = initVisualCanvas(width, height);
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

  return {
    init,
    drawParticles,
  };
}

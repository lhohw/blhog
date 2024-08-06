import type { Pointer } from "./usePointer";
import { useCallback } from "react";
import Particle from "@/class/Particle";
import KineticTypographyGlsl from "./glsl";
import { rgb } from "@/lib/utils/color";

let particles: Particle[];
let gl: KineticTypographyGlsl;

export default function useVisual() {
  const initVisualCanvas = useCallback((width: number, height: number) => {
    const gl = new KineticTypographyGlsl(width, height);
    gl.canvas.classList.add("absolute", "inset-0");
    return gl;
  }, []);

  const initParticles = useCallback((coords: number[]) => {
    const particles = [];
    for (let i = 0; i < coords.length; i += 2) {
      const particle = new Particle(coords[i], coords[i + 1]);
      particles.push(particle);
    }
    return particles;
  }, []);

  const drawParticles = useCallback(
    (pointer: Pointer = { mx: 0, my: 0, mr: 0 }) => {
      gl.clear();

      const { mx, my, mr } = pointer;

      const coords = [];
      const colors = [];
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.render(mx, my, mr);
        coords.push(particle.x, particle.y);
        colors.push(...rgb(particle.color));
      }

      gl.draw(coords, colors);
    },
    [],
  );

  const init = useCallback(
    (width: number, height: number, coords: number[]) => {
      particles = initParticles(coords);
      gl = initVisualCanvas(width, height);
      drawParticles();

      return gl;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    init,
    drawParticles,
  };
}

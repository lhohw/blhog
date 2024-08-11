import type { Pointer } from "@/hooks/react/usePointer";
import { useCallback } from "react";
import Particle from "@/class/Particle";
import KineticTypographyGlsl from "./glsl";
import { rgb } from "@/lib/utils/color";
import usePointer from "@/hooks/react/usePointer";

let particles: Particle[];
let gl: KineticTypographyGlsl;

export default function useVisual() {
  const { getPointer, setPointerTarget } = usePointer();

  const handleContextLost = useCallback((e: Event) => {
    e.preventDefault;
  }, []);

  const handleContextRestored = useCallback(() => {
    gl.handleContextRestored();
    drawParticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initVisualCanvas = useCallback((width: number, height: number) => {
    const gl = new KineticTypographyGlsl(width, height);
    gl.canvas.classList.add("absolute", "inset-0");
    gl.canvas.addEventListener("webglcontextlost", handleContextLost);
    gl.canvas.addEventListener("webglcontextrestored", handleContextRestored);
    setPointerTarget(gl.canvas);

    return gl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initParticles = useCallback((coords: number[]) => {
    const particles = [];
    for (let i = 0; i < coords.length; i += 2) {
      const particle = new Particle(coords[i], coords[i + 1]);
      particles.push(particle);
    }
    return particles;
  }, []);

  const drawParticles = useCallback(() => {
    const { mx, my, mr } = getPointer();

    const data = [];
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.render(mx, my, mr);
      data.push(particle.x, particle.y, ...rgb(particle.color));
    }

    gl.clear();
    gl.draw(data);
  }, [getPointer]);

  const init = useCallback(
    async (width: number, height: number, coords: number[]) => {
      particles = initParticles(coords);
      gl = initVisualCanvas(width, height);
      await gl.init();
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

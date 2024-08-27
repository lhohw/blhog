import { useCallback, useRef } from "react";
import Particle from "@/class/Particle";
import KineticTypographyGlsl from "./glsl";
import { rgb } from "@/lib/utils/color";
import usePointer from "@/hooks/react/usePointer";

export default function useVisual() {
  const { getPointer, setPointerTarget } = usePointer();
  const kineticTypographyGL = useRef<KineticTypographyGlsl | null>(null);
  const particles = useRef<Particle[]>([]);

  const drawParticles = useCallback(() => {
    const { mx, my, mr } = getPointer();

    const data = [];
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];
      particle.render(mx, my, mr);
      data.push(particle.x, particle.y, ...rgb(particle.color));
    }

    kineticTypographyGL.current?.draw(data);
  }, [getPointer]);

  const initVisualCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const gl = new KineticTypographyGlsl(canvas, width, height, drawParticles); // prettier-ignore
      gl.init();
      kineticTypographyGL.current = gl;
      setPointerTarget(canvas);
    },
    [drawParticles, setPointerTarget],
  );

  const initParticles = useCallback((coords: number[]) => {
    const particles = [];
    for (let i = 0; i < coords.length; i += 2) {
      const particle = new Particle(coords[i], coords[i + 1]);
      particles.push(particle);
    }
    return particles;
  }, []);

  const initVisual = useCallback(
    (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
      coords: number[],
    ) => {
      particles.current = initParticles(coords);
      initVisualCanvas(canvas, width, height);
      drawParticles();
    },
    [drawParticles, initParticles, initVisualCanvas],
  );

  const cleanup = useCallback(() => {
    kineticTypographyGL.current?.cleanup();
    kineticTypographyGL.current = null;
    particles.current = [];
    setPointerTarget(undefined);
  }, [setPointerTarget]);

  return {
    initVisual,
    drawParticles,
    cleanup,
  };
}

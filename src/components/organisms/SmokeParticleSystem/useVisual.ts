import { useCallback, useRef } from "react";
import usePointer from "@/hooks/react/usePointer";
import SmokeParticleSystemGL from "./gl";

export default function useVisual(width: number) {
  const { getPointer, setPointerTarget } = usePointer();
  const smokeParticleSystemGL = useRef<SmokeParticleSystemGL | null>(null);

  const drawParticles = useCallback(() => {
    const { mx } = getPointer();
    const normalizedMx = ((mx - width / 2) / width) * 2;
    smokeParticleSystemGL.current?.draw(normalizedMx);
  }, [getPointer, width]);

  const initVisualCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const gl = new SmokeParticleSystemGL(canvas, width, height, drawParticles); // prettier-ignore
      gl.init();
      smokeParticleSystemGL.current = gl;
      setPointerTarget(canvas);
    },
    [drawParticles, setPointerTarget],
  );

  const initVisual = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      initVisualCanvas(canvas, width, height);
      drawParticles();
    },
    [drawParticles, initVisualCanvas],
  );

  const cleanup = useCallback(() => {
    smokeParticleSystemGL.current?.cleanup();
    smokeParticleSystemGL.current = null;
    setPointerTarget(undefined);
  }, [setPointerTarget]);

  return {
    initVisual,
    drawParticles,
    cleanup,
  };
}

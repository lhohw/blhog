import { useCallback, useRef } from "react";
import KineticTypographyGlsl from "./gl";
import usePointer from "@/hooks/react/usePointer";

export default function useVisual() {
  const { getPointer, setPointerTarget } = usePointer();
  const kineticTypographyGL = useRef<KineticTypographyGlsl | null>(null);

  const drawParticles = useCallback(() => {
    const { mx, my, mr } = getPointer();
    kineticTypographyGL.current?.draw(mx, my, mr);
  }, [getPointer]);

  const initVisualCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
      coords: number[],
    ) => {
      const gl = new KineticTypographyGlsl(canvas, width, height, coords, drawParticles); // prettier-ignore
      gl.init();
      kineticTypographyGL.current = gl;
      setPointerTarget(canvas);
    },
    [drawParticles, setPointerTarget],
  );

  const initVisual = useCallback(
    (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
      coords: number[],
    ) => {
      initVisualCanvas(canvas, width, height, coords);
      drawParticles();
    },
    [drawParticles, initVisualCanvas],
  );

  const cleanup = useCallback(() => {
    kineticTypographyGL.current?.cleanup();
    kineticTypographyGL.current = null;
    setPointerTarget(undefined);
  }, [setPointerTarget]);

  return {
    initVisual,
    drawParticles,
    cleanup,
  };
}

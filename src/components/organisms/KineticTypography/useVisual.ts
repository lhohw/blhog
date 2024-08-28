import { useCallback, useState } from "react";
import KineticTypographyGlsl from "./gl";
import usePointer from "@/hooks/react/usePointer";
import initCanvas from "@/lib/utils/canvas/initCanvas";
import {
  drawTextToCenter,
  extractNonTransparentCoords,
} from "@/lib/utils/canvas";

const fontSize = 70;
const fontWeight = 700;
const fontName = "Inter";
const font = `${fontWeight} ${fontSize}px ${fontName}`;
const color = "#303030";

const initialGL = {
  init: () => undefined,
  draw: (...args: number[]) => undefined,
  cleanup: () => undefined,
};
let gl: Record<"init" | "draw" | "cleanup", (...args: any[]) => void> =
  initialGL;

export default function useVisual() {
  const { getPointer, setPointerTarget } = usePointer();
  const [text, setText] = useState("lhohw");

  const initCoords = useCallback(
    (width: number, height: number, dpr: number) => {
      const options = { desynchronized: true, willReadFrequently: false };
      const canvas = document.createElement("canvas");
      const { ctx } = initCanvas(canvas, width, height, options);
      if (!ctx) throw new Error("canvas not supported");

      drawTextToCenter(ctx, text, font, color);
      const coords = extractNonTransparentCoords(ctx, dpr);
      return coords;
    },
    [text],
  );

  const initVisualCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
      coords: number[],
    ) => {
      gl = new KineticTypographyGlsl(canvas, width, height, coords);
      gl.init();
      setPointerTarget(canvas);
    },
    [setPointerTarget],
  );

  const drawParticles = useCallback(() => {
    const { mx, my, mr } = getPointer();
    gl.draw(mx, my, mr);
  }, [getPointer]);

  const initVisual = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number, dpr: number) => {
      const coords = initCoords(width, height, dpr);
      initVisualCanvas(canvas, width, height, coords);
      drawParticles();
    },
    [initCoords, initVisualCanvas, drawParticles],
  );

  const cleanup = useCallback(() => {
    gl.cleanup();
    setPointerTarget(undefined);
  }, [setPointerTarget]);

  return {
    initVisual,
    drawParticles,
    cleanup,
  };
}

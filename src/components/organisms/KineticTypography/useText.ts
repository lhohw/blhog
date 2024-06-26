import { useCallback, useMemo, useState } from "react";
import initCanvas from "@/lib/utils/canvas/initCanvas";

const fontSize = 70;
const fontWeight = 700;
const fontName = "Inter";

export type Coord = { x: number; y: number };
export default function useText(width: number, height: number) {
  const [text] = useState("lhohw");
  const font = useMemo(() => `${fontWeight} ${fontSize}px ${fontName}`, []);
  const color = useMemo(() => "#303030", []);
  const [density] = useState(2);

  const createCanvas = useCallback(() => {
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const ctx = initCanvas(canvas, width, height, dpr);

    return { ctx, dpr };
  }, [height, width]);

  const drawText = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";

      const measuredText = ctx.measureText(text);
      const {
        width: textWidth,
        actualBoundingBoxAscent,
        actualBoundingBoxDescent,
      } = measuredText;

      ctx.fillText(
        text,
        (width - textWidth) / 2,
        actualBoundingBoxAscent +
          (height - (actualBoundingBoxAscent + actualBoundingBoxDescent)) / 2,
      );
    },
    [color, font, height, text, width],
  );

  const initCoords = useCallback(
    (ctx: CanvasRenderingContext2D, dpr: number) => {
      const { width, height } = ctx.canvas;
      const { data } = ctx.getImageData(0, 0, width, height);

      const coords = [];

      let i = 0;
      let x = 0;
      for (let y = 0; y < height; y += density) {
        x = 0;
        i++;
        if (i % 2 === 0) x += 6;
        for (x; x < width; x += density) {
          const pixel = data[(y * width + x) * 4 - 1];
          if (pixel !== 0 && x > 0 && x < width && y > 0 && y < height) {
            coords.push({ x: x / dpr, y: y / dpr });
          }
        }
      }
      return coords;
    },
    [density],
  );

  const initText = useCallback(() => {
    const { ctx, dpr } = createCanvas();
    drawText(ctx);
    const coords = initCoords(ctx, dpr);

    return { ctx, coords };
  }, [createCanvas, drawText, initCoords]);

  return {
    width,
    height,
    fontSize,
    text,
    initText,
    drawText,
  };
}

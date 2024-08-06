import { useCallback, useMemo, useState } from "react";
import initCanvas from "@/lib/utils/canvas/initCanvas";

const fontSize = 70;
const fontWeight = 700;
const fontName = "Inter";

export default function useText() {
  const [text] = useState("lhohw");
  const font = useMemo(() => `${fontWeight} ${fontSize}px ${fontName}`, []);
  const color = useMemo(() => "#303030", []);
  const [density] = useState(1);

  const createCanvas = useCallback((width: number, height: number) => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const { ctx, dpi } = initCanvas(
      canvas,
      width,
      height,
      {
        desynchronized: true,
      },
      1,
    );

    return { ctx, dpi };
  }, []);

  const drawText = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";

      const width = parseInt(ctx.canvas.style.width);
      const height = parseInt(ctx.canvas.style.height);
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
    [color, font, text],
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
            coords.push(x, y);
          }
        }
      }
      return coords;
    },
    [density],
  );

  const initText = useCallback(
    (width: number, height: number) => {
      const { ctx, dpi } = createCanvas(width, height);
      drawText(ctx);
      const coords = initCoords(ctx, dpi);

      return { ctx, coords };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    fontSize,
    text,
    initText,
    drawText,
  };
}

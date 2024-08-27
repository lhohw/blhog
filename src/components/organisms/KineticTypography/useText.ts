import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import initCanvas from "@/lib/utils/canvas/initCanvas";

const fontSize = 70;
const fontWeight = 700;
const fontName = "Inter";

export default function useText(initialText = "lhohw") {
  const [text] = useState(initialText);
  const font = useMemo(() => `${fontWeight} ${fontSize}px ${fontName}`, []);
  const color = useMemo(() => "#303030", []);
  const [coords, setCoords] = useState<number[]>([]);

  const drawText = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";

      const measuredText = ctx.measureText(text);
      const width = parseInt(ctx.canvas.style.width);
      const height = parseInt(ctx.canvas.style.height);
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
      for (let y = 0; y < height; y++) {
        x = 0;
        i++;
        if (i % 2 === 0) x += 6;
        for (x; x < width; x++) {
          const pixel = data[(y * width + x) * 4 - 1];
          if (pixel !== 0 && x > 0 && x < width && y > 0 && y < height) {
            coords.push(x / dpr, y / dpr);
          }
        }
      }

      return coords;
    },
    [],
  );

  const initVisualText = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number, dpr: number) => {
      const { ctx } = initCanvas(canvas, width, height, {
        desynchronized: true,
        willReadFrequently: false,
      });
      if (!ctx) throw new Error("canvas not supported");

      drawText(ctx);
      const coords = initCoords(ctx, dpr);
      setCoords(coords);
    },
    [drawText, initCoords],
  );

  return {
    initVisualText,
    coords,
  };
}

import { useCallback, useRef, useState } from "react";
import cafeTerraceAtNight from "@/assets/cafeTerraceAtNight.png";
import starryNight from "@/assets/starryNight.jpg";
import waterLilies from "@/assets/waterLilies.jpg";
import initCanvas from "@/lib/utils/canvas/initCanvas";
import { randomInt } from "@/lib/utils/math";
import { clear, drawQuadraticCurve, drawTextToCenter, extractNonTransparentCoords, getRandomPos } from "@/lib/utils/canvas";
import { loadImageData } from "@/lib/utils/image";

export const IMAGE_HEIGHT = 140;
const defaultImgInfos = [
  {
    src: cafeTerraceAtNight.src,
    alt: "Cafe Terrace At Night",
    ratio: cafeTerraceAtNight.width / cafeTerraceAtNight.height,
    width: Math.floor(IMAGE_HEIGHT * cafeTerraceAtNight.width / cafeTerraceAtNight.height),
    data: new Uint8ClampedArray(),
  },
  {
    src: starryNight.src,
    alt: "Starry Night",
    ratio: starryNight.width / starryNight.height,
    width: Math.floor(IMAGE_HEIGHT * starryNight.width / starryNight.height),
    data: new Uint8ClampedArray(),
  },
  {
    src: waterLilies.src,
    alt: "Water Lilies",
    ratio: waterLilies.width / waterLilies.height,
    width: Math.floor(IMAGE_HEIGHT * waterLilies.width / waterLilies.height),
    data: new Uint8ClampedArray(),
  }
];

export type ImgInfo = {
  src: string;
  alt: string;
  ratio: number;
  width: number;
  data: Uint8ClampedArray,
};
export default function useVisual() {
  const animId = useRef(-1);
  const textCoords = useRef<number[]>([]);
  const [imgInfos, setImageInfos] = useState<ImgInfo[]>(defaultImgInfos);

  const initVisual = useCallback(async (textCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement, width: number, height: number, dpr: number) => {
    initVisualCanvas(canvas, width, height, dpr);
    const _textCoords = initTextCanvas(textCanvas, width, height, dpr);
    textCoords.current = _textCoords;
    await initImageInfos(dpr, height);
  }, [imgInfos]);

  const initVisualCanvas = useCallback((
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    dpr: number
  ) => {
    const ctx = canvas.getContext('2d')!
    clear(ctx);

    const options: CanvasRenderingContext2DSettings = {
      desynchronized: true,
    };
    
    initCanvas(canvas, width, height, options, dpr);

    const msg = "Select Image";
    const font = "bold 60px Inter";
    const color = "#30303077";
    drawTextToCenter(ctx, msg, font, color);

    return ctx;
  }, [])

  const initTextCanvas = useCallback((
    textCanvas: HTMLCanvasElement,
    width: number,
    height: number,
    dpr: number
  ) => {
    
    const { ctx } = initCanvas(textCanvas, width, height, undefined, dpr);

    const font = "bolder 150px Inter";
    const color = "#30303011";
    const text = "lhohw";

    drawTextToCenter(ctx, text, font, color);
    const textCoords = extractNonTransparentCoords(ctx, dpr);

    return textCoords;
  }, [imgInfos]);

  const initImageInfos = useCallback(async (dpr: number, height: number) => {
    const resolved = await loadImageData(dpr, height, imgInfos);
    const newInfos = imgInfos.map((imgInfo, i) => ({ ...imgInfo, data: resolved[i] }));

    setImageInfos(newInfos);
  }, [setImageInfos, imgInfos])

  const getColor = useCallback((idx: number): number[] => {
    const { width, data } = imgInfos[idx];
    const y = randomInt(IMAGE_HEIGHT);
    const x = randomInt(width);
    const i = 4 * (y * width + x);

    return [0, 1, 2].map(delta => data[i + delta]);
  }, [imgInfos]);

  const onImageClick = useCallback(async (canvas: HTMLCanvasElement, idx: number) => {
    if (animId.current !== -1) {
      cancelAnimationFrame(animId.current);
      animId.current = -1;
    }

    const ctx = canvas.getContext('2d')!;
    clear(ctx);

    ctx.lineWidth = 1;

    const anim = () => {
      const DURATION = 5000;
      let start: number;

      animId.current = requestAnimationFrame(function cb(now) {
        if (start === undefined) start = now;
        if (now - start >= DURATION) {
          cancelAnimationFrame(animId.current);
          return;
        }

        for (let i=0; i<3; i++) {
          const pos = getRandomPos(textCoords.current, 10, 5);
          const color = getColor(idx);
          drawQuadraticCurve(ctx, pos, color);
        }

        animId.current = requestAnimationFrame(cb);
      })
    }

    anim();
  }, [imgInfos, getColor]);

  return {
    IMAGE_HEIGHT,
    initVisual,
    imgInfos,
    onImageClick
  }
}

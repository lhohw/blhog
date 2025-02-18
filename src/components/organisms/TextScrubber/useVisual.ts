import { useCallback, useRef, useState } from "react";
import cafeTerraceAtNight from "@/assets/cafeTerraceAtNight.png";
import starryNight from "@/assets/starryNight.jpg";
import waterLilies from "@/assets/waterLilies.jpg";
import initCanvas from "@/lib/utils/canvas/initCanvas";
import { randomInt } from "@/lib/utils/math";
import { clear, drawQuadraticCurve, drawTextToCenter, extractNonTransparentCoords, getRandomPos } from "@/lib/utils/canvas";
import { loadImageData } from "@/lib/utils/image";
import Point from "@/class/Point";

export const IMAGE_HEIGHT = 140;

export type ImgInfo = {
  src: string;
  alt: string;
  ratio: number;
  width: number;
  data: Uint8ClampedArray<ArrayBufferLike>;
  text: string;
  textCanvasInfo: { ctx: CanvasRenderingContext2D, textCoords: number[] };
};
export default function useVisual() {
  const animId = useRef(-1);

  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(-1);
  const [imgInfos, setImageInfos] = useState<ImgInfo[]>([
    {
      src: cafeTerraceAtNight.src,
      alt: "Cafe Terrace At Night",
      ratio: cafeTerraceAtNight.width / cafeTerraceAtNight.height,
      width: Math.floor(IMAGE_HEIGHT * cafeTerraceAtNight.width / cafeTerraceAtNight.height),
      data: new Uint8ClampedArray<ArrayBufferLike>(new ArrayBuffer()),
      text: "C",
      textCanvasInfo: { ctx: null!, textCoords: null! }
    },
    {
      src: starryNight.src,
      alt: "Starry Night",
      ratio: starryNight.width / starryNight.height,
      width: Math.floor(IMAGE_HEIGHT * starryNight.width / starryNight.height),
      data: new Uint8ClampedArray<ArrayBufferLike>(new ArrayBuffer()),
      text: "S",
      textCanvasInfo: { ctx: null!, textCoords: null! }
    },
    {
      src: waterLilies.src,
      alt: "Water Lilies",
      ratio: waterLilies.width / waterLilies.height,
      width: Math.floor(IMAGE_HEIGHT * waterLilies.width / waterLilies.height),
      data: new Uint8ClampedArray<ArrayBufferLike>(new ArrayBuffer()),
      text: "W",
      textCanvasInfo: { ctx: null!, textCoords: null! }
    }
  ]);

  const initVisual = useCallback(async (textCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement, width: number, height: number, dpr: number) => {
    const options: CanvasRenderingContext2DSettings = {
      desynchronized: true,
    };
    initCanvas(textCanvas, width, height, undefined, dpr);
    initCanvas(canvas, width, height, options, dpr);
    
    const ctx = canvas.getContext('2d')!
    clear(ctx);
    
    const msg = "Select Image";
    const font = "bold 60px Inter";
    const color = "#30303077";
    drawTextToCenter(ctx, msg, font, color);
    
    try {
      const resolved = await loadImageData(dpr, height, imgInfos);
      const textCanvasInfos = initTextCanvas(width, height, dpr);
      const newInfos = imgInfos.map((imgInfo, i) => {
        return { ...imgInfo, data: resolved[i], textCanvasInfo: textCanvasInfos[i]  }
      });

      setImageInfos(newInfos);
    } catch (e) {
      console.error(e);
      return;
    }
  }, [imgInfos]);

  const initTextCanvas = useCallback((
    width: number,
    height: number,
    dpr: number
  ) => {
    const font = "bolder 300px Inter";
    const color = "#30303011";
    const textCanvasInfos = imgInfos.map(imgInfo => {
      const { text } = imgInfo;
  
      const canvas = document.createElement('canvas');
      initCanvas(canvas, width, height, undefined, dpr);

      const ctx = canvas.getContext('2d')!;
      drawTextToCenter(ctx, text, font, color);
      const textCoords = extractNonTransparentCoords(ctx, dpr);

      return { ctx, textCoords };
    });

    return textCanvasInfos;
  }, [imgInfos]);

  const cleanup = useCallback(() => {
    setSelectedImageIdx(-1);
  }, [setSelectedImageIdx]);

  const getColor = useCallback((idx: number): number[] => {
    const { width, data } = imgInfos[idx];
    const y = randomInt(IMAGE_HEIGHT);
    const x = randomInt(width);
    const i = 4 * (y * width + x);

    return [0, 1, 2].map(delta => data[i + delta]);
  }, [imgInfos]);

  const onImageClick = useCallback(async (textCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement, idx: number) => {
    if (animId.current !== -1) {
      cancelAnimationFrame(animId.current);
      animId.current = -1;
    }

    setSelectedImageIdx(idx);

    const textCtx = textCanvas.getContext('2d')!
    const ctx = canvas.getContext('2d')!;
    clear(textCtx);
    clear(ctx);

    const { ctx: textOffscreenCtx, textCoords } = imgInfos[idx].textCanvasInfo;
    textCtx.drawImage(textOffscreenCtx.canvas, 0, 0);
    textCanvas.getContext('2d')!.drawImage(imgInfos[idx].textCanvasInfo.ctx.canvas, 0, 0)

    ctx.lineWidth = 1;

    const anim = () => {
      const DURATION = 5000;
      let start: number;

      animId.current = requestAnimationFrame(function cb(now) {
        if (start === undefined) start = now;
        if (now - start >= DURATION) {
          cancelAnimationFrame(animId.current);
          console.log('done');
          return;
        }

        const pos = getRandomPos(textCoords);
        const color = getColor(idx);
        drawQuadraticCurve(ctx, pos, color);

        animId.current = requestAnimationFrame(cb);
      })
    }

    anim();
  }, [imgInfos, getColor, setSelectedImageIdx]);

  return {
    IMAGE_HEIGHT,
    selectedImageIdx,
    setSelectedImageIdx,
    initVisual,
    cleanup,
    imgInfos,
    onImageClick
  }
}

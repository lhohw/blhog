import Point from "@/class/Point";
import { r360, random, randomInt } from "@/lib/utils/math";

export const extractNonTransparentCoords = (
  ctx: CanvasRenderingContext2D,
  dpr: number,
): number[] => {
  const { width, height } = ctx.canvas;
  const { data } = ctx.getImageData(0, 0, width, height);

  const coords = [];

  let i = 0;
  let x = 0;
  for (let y = 0; y < height; y++) {
    x = 0;
    i++;
    for (x; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha !== 0 && x > 0 && x < width && y > 0 && y < height) {
        coords.push(x / dpr, y / dpr);
      }
    }
  }

  return coords;
};

// TODO: normalize to draw anywhere
export const drawTextToCenter = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
  color: string,
): void => {
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
};

export const clear = (ctx: CanvasRenderingContext2D) => {
  const { canvas: { style: { width, height } } } = ctx;
  ctx.clearRect(0, 0, parseInt(width), parseInt(height));
}

export const drawQuadraticCurve = (
  ctx: CanvasRenderingContext2D,
  /** from | control | to */
  pos: Point[],
  color = [0, 0, 0]
) => {
  const [ from, control, to ] = pos;
  const [ r, g, b ] = color;
  const { y: cy, x: cx } = control.coord;
  const { y, x } = to.coord;

  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
  
  ctx.beginPath();
  ctx.moveTo(from.coord.x, from.coord.y);
  ctx.quadraticCurveTo(cx, cy, x, y);
  ctx.stroke();
  ctx.closePath();
}

export const getRandomPos = (textCoords: number[], distance = 10, minDistance = 10): Point[] => {
  const idx = 2 * randomInt(textCoords.length / 2);
  const from = new Point(textCoords[idx], textCoords[idx+1]);
  const points = [ from ];

  let theta, r, x, y;

  for (let i=0; i<2; i++) {
    theta = random(r360);
    r = random(distance, minDistance);
    x = from.x + r * Math.cos(theta);
    y = from.y + r * Math.sin(theta);

    points.push(new Point(x, y));
  }

  return points;
}
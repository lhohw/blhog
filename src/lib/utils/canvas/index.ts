export const extractNonTransparentCoords = (
  ctx: CanvasRenderingContext2D,
  dpr: number,
) => {
  const { width, height } = ctx.canvas;
  const { data } = ctx.getImageData(0, 0, width, height);

  const coords = [];

  let i = 0;
  let x = 0;
  for (let y = 0; y < height; y++) {
    x = 0;
    i++;
    for (x; x < width; x++) {
      const alpha = data[(y * width + x) * 4 - 1];
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
) => {
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

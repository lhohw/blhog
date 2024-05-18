export const initCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  // @ts-expect-error vendor
  // prettier-ignore
  const bsr = ctx.msBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  const dpi = dpr / bsr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width * dpi;
  canvas.height = height * dpi;

  ctx.scale(dpi, dpi);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#d1fae525";

  return ctx;
};

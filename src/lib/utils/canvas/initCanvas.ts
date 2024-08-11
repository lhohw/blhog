export default function initCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  options?: CanvasRenderingContext2DSettings,
  dpr = window.devicePixelRatio || 1,
) {
  const ctx = canvas.getContext("2d", options);
  if (!ctx) throw new Error("canvas not supported");

  // @ts-expect-error vendor
  // prettier-ignore
  const bsr = ctx.msBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  const dpi = dpr / bsr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width * dpi;
  canvas.height = height * dpi;

  ctx.scale(dpi, dpi);

  return { ctx, dpi };
}

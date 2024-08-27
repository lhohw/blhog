export default function initCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  options?: CanvasRenderingContext2DSettings,
) {
  const ctx = canvas.getContext("2d", options);
  if (!ctx) throw new Error("canvas not supported");

  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.scale(dpr, dpr);

  return { ctx, dpr };
}

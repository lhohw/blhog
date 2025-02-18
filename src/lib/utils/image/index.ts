export const loadImageData = async (dpr: number, canvasHeight: number, imgInfos: {
  height?: number;
  width?: number;
  ratio?: number;
  src: string;
}[]) => {
  const tmpCanvas = document.createElement('canvas');
  const tmpCtx = tmpCanvas.getContext('2d')!;
  
  const promises = imgInfos.map((imgInfo) => {
    let { ratio, src, width, height } = imgInfo;
    if (!width && !height) throw new Error("width or height is required");
    if (width && height) ratio = width / height;
    if (!ratio) throw new Error("ratio is required if width or height is not given");
    if (!width) width = ratio * height!;
    if (!height) height = width / ratio;

    const w = height * ratio;
    tmpCanvas.width = w * dpr;
    tmpCanvas.height = height * dpr;
    const img = new Image(w, height);
    img.src = src;

    return new Promise<Uint8ClampedArray<ArrayBufferLike>>((res) => {
      img.onload = () => {
        tmpCtx.drawImage(img, 0, 0);
        const imgData = tmpCtx.getImageData(0, 0, w, canvasHeight);
        res(imgData.data);
      }
    });
  });

  return Promise.all(promises);
};
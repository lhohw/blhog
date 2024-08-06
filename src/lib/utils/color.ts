export const rgb = (color: number) => {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  return [r, g, b];
};

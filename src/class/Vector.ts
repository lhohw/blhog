class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}
  addPolar(radius: number, radian: number) {
    const { x, y } = this;

    const dx = radius * Math.cos(radian);
    const dy = radius * Math.sin(radian);

    return new Vector(x + dx, y + dy);
  }
}

export default Vector;

class Point {
  constructor(
    private x: number,
    private y: number,
  ) {}

  static apply<T extends Exclude<keyof Point, "coord">>(
    point: Point,
    type: T,
    ...args: Parameters<Point[T]>
  ) {
    const { x, y } = (point[type] as any).apply(point, args) as Point;
    point.x = x;
    point.y = y;

    return point;
  }

  get coord() {
    const { x, y } = this;
    return { x, y };
  }

  add(x: number, y: number) {
    return new Point(this.x + x, this.y + y);
  }

  addVector(vector: { x: number; y: number }) {
    const { x, y } = this;
    return new Point(x + vector.x, y + vector.y);
  }

  subtract(x: number, y: number) {
    return this.add(-x, -y);
  }

  subtractVector(vector: { x: number; y: number }) {
    const { x, y } = vector;
    return this.addVector({ x: -x, y: -y });
  }
}

export default Point;

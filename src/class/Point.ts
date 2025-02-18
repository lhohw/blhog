class Point {
  constructor(
    private _x: number,
    private _y: number,
  ) {}

  static apply<T extends Exclude<keyof Point, "coord" | "x" | "y">>(
    point: Point,
    type: T,
    ...args: Parameters<Point[T]>
  ) {
    const { _x: x, _y: y } = (point[type] as any).apply(point, args) as Point;
    point._x = x;
    point._y = y;

    return point;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get coord() {
    const { _x: x, _y: y } = this;
    return { x, y };
  }

  add(x: number, y: number) {
    return new Point(this._x + x, this._y + y);
  }

  addVector(vector: { x: number; y: number }) {
    const { _x: x, _y: y } = this;
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

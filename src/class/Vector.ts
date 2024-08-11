import { polar2cart } from "@/lib/utils/math";

class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}
  add(rhs: Vector) {
    const { x, y } = this;
    return new Vector(x + rhs.x, y + rhs.y);
  }
  multiply(scalar: number) {
    const { x, y } = this;
    return new Vector(scalar * x, scalar * y);
  }
  addPolar(radius: number, radian: number) {
    const { x, y } = polar2cart(radius, radian);
    return new Vector(this.x + x, this.y + y);
  }
}

export default Vector;

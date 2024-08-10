import { polar2cart } from "@/lib/utils/math";

class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}
  add(rhs: Vector) {
    const { x, y } = rhs;
    this.x += x;
    this.y += y;
    return this;
  }
  multiply(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  addPolar(radius: number, radian: number) {
    const { x, y } = polar2cart(radius, radian);
    this.x += x;
    this.y += y;
    return this;
  }
}

export default Vector;

import { describe, test, expect } from "bun:test";
import { r45, polar2cart, r15 } from "@/lib/utils/math";

describe("polar to cartesian coordinate", () => {
  test("radius: sqrt 2, degree: 45", () => {
    const radius = Math.sqrt(2);
    const radian = r45;
    const { x, y } = polar2cart(radius, radian);
    expect(x).toBeCloseTo(1);
    expect(y).toBeCloseTo(1);
  });

  test("radius: 2, degree: 30", () => {
    const radius = 2;
    const radian = r15 * 2;
    const { x, y } = polar2cart(radius, radian);
    expect(x).toBeCloseTo(Math.sqrt(3));
    expect(y).toBeCloseTo(1);
  });
});

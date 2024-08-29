import { describe, test, it, expect } from "bun:test";
import Point from "@/class/Point";
import Vector from "@/class/Vector";
import { randomInt } from "@/lib/utils/math";

describe("Point", () => {
  describe("add", () => {
    it("returns new Point instance", () => {
      const point = new Point(1, 2);
      const newPoint = point.add(1, 1);

      expect(newPoint).toBeInstanceOf(Point);
      expect(newPoint.coord).toEqual({ x: 2, y: 3 });
    });

    it("is not applied to origin instance", () => {
      const point = new Point(1, 2);
      point.add(1, 1);

      expect(point.coord).toEqual({ x: 1, y: 2 });
    });

    test("uncertainty", () => {
      const point = new Point(0, 0);
      const randX = randomInt(100, -50);
      const randY = randomInt(100, -50);
      const newPoint = point.add(randX, randY);
      const coord = point.coord;

      expect(newPoint.coord).toEqual({
        x: coord.x + randX,
        y: coord.y + randY,
      });
    });
  });

  describe("addVector", () => {
    it("returns new Point instance", () => {
      const point = new Point(1, 2);
      const vector = new Vector(1, 1);
      const newPoint = point.addVector(vector);

      expect(newPoint).toBeInstanceOf(Point);
      expect(newPoint.coord).toEqual({ x: 2, y: 3 });
    });

    it("is not applied to origin instance", () => {
      const point = new Point(1, 2);
      const vector = new Vector(1, 1);
      point.addVector(vector);

      expect(point.coord).toEqual({ x: 1, y: 2 });
    });

    it("is allowed to get { x, y } object", () => {
      const point = new Point(0, 0);
      const vector = { x: 1, y: 1 };
      const newPoint = point.addVector(vector);

      expect(newPoint).toBeInstanceOf(Point);
      expect(newPoint.coord).toEqual({ x: 1, y: 1 });
    });

    test("uncertainty", () => {
      const point = new Point(0, 0);
      const randX = randomInt(100, -50);
      const randY = randomInt(100, -50);
      const vector = new Vector(randX, randY);
      const newPoint = point.addVector(vector);
      const coord = point.coord;

      expect(newPoint.coord).toEqual({
        x: coord.x + randX,
        y: coord.y + randY,
      });
    });
  });

  describe("subtract", () => {
    it("returns new Point instance", () => {
      const point = new Point(2, 3);
      const newPoint = point.subtract(2, 3);

      expect(newPoint).toBeInstanceOf(Point);
      expect(newPoint.coord).toEqual({ x: 0, y: 0 });
    });

    it("is not applied to origin instance", () => {
      const point = new Point(2, 3);
      point.subtract(2, 3);

      expect(point.coord).toEqual({ x: 2, y: 3 });
    });

    it("is same with -add", () => {
      const point = new Point(1, 1);
      const dx = 10;
      const dy = 5;

      const subtracted = point.subtract(dx, dy);
      const minusAdded = point.add(-dx, -dy);

      expect(subtracted.coord).toEqual(minusAdded.coord);
      expect(minusAdded.coord).toEqual({ x: -9, y: -4 });
    });

    test("uncertainty", () => {
      const point = new Point(2, 3);
      const randX = randomInt(100, -50);
      const randY = randomInt(10, -50);
      const coord = point.coord;
      const newPoint = point.subtract(randX, randY);

      expect(newPoint.coord).toEqual({
        x: coord.x - randX,
        y: coord.y - randY,
      });
    });
  });

  describe("subtractVector", () => {
    it("returns new Point instance", () => {
      const point = new Point(2, 3);
      const vector = new Vector(1, 1);
      const newPoint = point.subtractVector(vector);

      expect(newPoint).toBeInstanceOf(Point);
      expect(newPoint.coord).toEqual({ x: 1, y: 2 });
    });

    it("is not applied to origin instance", () => {
      const point = new Point(2, 3);
      const vector = { x: 10, y: 20 };
      point.subtractVector(vector);

      expect(point.coord).toEqual({ x: 2, y: 3 });
    });

    it("is same with -addVector", () => {
      const point = new Point(1, 1);
      const dx = 1;
      const dy = 11;
      const vector = { x: dx, y: dy };

      const subtracted = point.subtractVector(vector);
      const minusAdded = point.addVector({ x: -vector.x, y: -vector.y });

      expect(subtracted.coord).toEqual(minusAdded.coord);
      expect(minusAdded.coord).toEqual({ x: 0, y: -10 });
    });

    test("uncertainty", () => {
      const point = new Point(2, 3);
      const randX = randomInt(100, -50);
      const randY = randomInt(10, -50);
      const vector = new Vector(randX, randY);
      const coord = point.coord;
      const newPoint = point.subtractVector(vector);

      expect(newPoint.coord).toEqual({
        x: coord.x - randX,
        y: coord.y - randY,
      });
    });
  });

  describe.only("static apply", () => {
    it("is applied to origin instance & returns origin instance", () => {
      let point: Point,
        dx: number,
        dy: number,
        vector: { x: number; y: number },
        applied: Point;

      // add
      point = new Point(1, 2);
      dx = 2;
      dy = 5;
      applied = Point.apply(point, "add", dx, dy);
      expect(applied).toEqual(point);
      expect(point.coord).toEqual({ x: 3, y: 7 });

      // addVector
      point = new Point(-2, -5);
      dx = 3;
      dy = 10;
      vector = new Vector(dx, dy);
      applied = Point.apply(point, "addVector", vector);
      expect(applied).toEqual(point);
      expect(point.coord).toEqual({ x: 1, y: 5 });

      // subtract
      point = new Point(5, -10);
      dx = 2;
      dy = 5;
      applied = Point.apply(point, "subtract", dx, dy);
      expect(applied).toEqual(point);
      expect(point.coord).toEqual({ x: 3, y: -15 });

      // subtractVector
      point = new Point(-2, -5);
      dx = -3;
      dy = -10;
      vector = new Vector(dx, dy);
      applied = Point.apply(point, "subtractVector", vector);
      expect(applied).toEqual(point);
      expect(point.coord).toEqual({ x: 1, y: 5 });
    });

    test("coord can't be applied", () => {
      const point = new Point(0, 0);
      // @ts-expect-error
      expect(() => Point.apply(point, "coord")).toThrowError(TypeError);
    });
  });
});

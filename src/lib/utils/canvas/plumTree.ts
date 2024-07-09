import RafControl from "@/class/RafControl";
import Vector from "@/class/Vector";
import { r180, r90, r15, random, prob } from "@/lib/utils/math";
import initCanvas from "@/lib/utils/canvas/initCanvas";

type StepProps = {
  vec: Vector;
  rad: number;
  count: { value: number };
};
export default function plumTree(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  const { ctx } = initCanvas(canvas, width, height)!;
  const MIN_BRANCH = 30;
  const length = 6;
  const interval = 1000 / 40;

  let steps: StepProps[] = [];
  let prevSteps: StepProps[] = [];
  let controls: RafControl;

  const step = (step: StepProps) => {
    const { vec, rad, count } = step;
    const len = random(length);
    const nVec = vec.addPolar(len, rad);

    count.value++;

    drawLine(ctx, vec, nVec);

    if (isOut(nVec)) return;

    const rate = count.value < MIN_BRANCH ? 0.8 : 0.5;

    const rad1 = rad + random(r15);
    const rad2 = rad - random(r15);

    // left
    if (prob(rate)) {
      steps.push({ vec: nVec, rad: rad1, count });
    }
    // right
    if (prob(rate)) {
      steps.push({ vec: nVec, rad: rad2, count });
    }
  };

  const drawLine = (ctx: CanvasRenderingContext2D, v1: Vector, v2: Vector) => {
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.stroke();
    ctx.closePath();
  };

  const isOut = (vector: Vector) => {
    return (
      vector.x < -100 ||
      vector.x >= width + 100 ||
      vector.y < -100 ||
      vector.y >= height + 100
    );
  };

  const frame = () => {
    prevSteps = steps;
    steps = [];

    if (!prevSteps.length) {
      controls.done();
    }

    for (let i = 0; i < prevSteps.length; i++) {
      const s = prevSteps[i];

      if (prob(0.5)) steps.push(s);
      else step(s);
    }
  };

  const initSteps = () => {
    const randomMiddle = (value: number) => random(0.6, 0.2) * value;

    steps = [
      {
        vec: new Vector(randomMiddle(width), -10),
        rad: r90,
        count: { value: 0 },
      },
      {
        vec: new Vector(width + 10, randomMiddle(height)),
        rad: r180,
        count: { value: 0 },
      },
      {
        vec: new Vector(randomMiddle(width), height + 10),
        rad: -r90,
        count: { value: 0 },
      },
      {
        vec: new Vector(-10, randomMiddle(height)),
        rad: 0,
        count: { value: 0 },
      },
    ];
  };

  const init = () => {
    controls = new RafControl(frame, interval);
    controls.pause();
    initSteps();

    return controls;
  };

  return { init };
}

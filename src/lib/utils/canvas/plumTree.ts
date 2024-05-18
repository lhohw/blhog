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
  const ctx = initCanvas(canvas, width, height)!;
  const MIN_BRANCH = 30;
  const length = 6;
  const interval = 1000 / 40;

  let steps: StepProps[] = [];
  let prevSteps: StepProps[] = [];
  let controls: RafControl;

  const run = (step: StepProps) => {
    const { vec, rad, count } = step;
    const len = random(length);
    const nVec = vec.addPolar(len, rad);

    count.value++;

    ctx.beginPath();
    ctx.moveTo(vec.x, vec.y);
    ctx.lineTo(nVec.x, nVec.y);
    ctx.stroke();
    ctx.closePath();

    if (
      nVec.x < -100 ||
      nVec.x >= width + 100 ||
      nVec.y < -100 ||
      nVec.y >= height + 100
    ) {
      return;
    }

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

  const frame = () => {
    prevSteps = steps;
    steps = [];

    if (!prevSteps.length) {
      controls.pause();
    }

    prevSteps.forEach((step) => {
      if (prob(0.5)) steps.push(step);
      else run(step);
    });
  };

  const start = () => {
    controls = new RafControl(frame, interval);
    controls.pause();

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

    controls.resume();
  };

  start();
}

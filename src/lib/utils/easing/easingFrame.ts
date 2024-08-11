export const animationTypes = ["ball", "opacity"] as const;
export type AnimationType = (typeof animationTypes)[number];

type IsDone = boolean;
export type TransformAnimation = (
  target: HTMLElement,
  t: number,
  x: number,
  direction: 1 | -1,
  duration: number,
) => IsDone;

const ballTransform: TransformAnimation = (
  target,
  t,
  x,
  direction,
  duration,
) => {
  const radius = 20;
  const dist = target.parentElement
    ? target.parentElement?.clientWidth - radius * 2
    : undefined;

  if (dist === undefined) return true;

  target.style.setProperty("--tw-translate-x", `${x * dist}px`);
  target.style.setProperty(
    "--tw-rotate",
    `${((t * duration) / radius) * direction}rad`,
  );

  return false;
};

const opacityTransform: TransformAnimation = (
  target,
  t,
  x,
  direction,
  duration,
) => {
  target.style.setProperty("opacity", x.toString());
  return false;
};

const transform: Record<AnimationType, TransformAnimation> = {
  ball: ballTransform,
  opacity: opacityTransform,
};

export default transform;

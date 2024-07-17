export type AnimationType = (typeof animationTypes)[number];
export type TransformAnimation = (
  target: HTMLElement,
  t: number,
  x: number,
  direction: 1 | -1,
  duration: number,
) => boolean;

export const animationTypes = ["ball"] as const;

export const ballTransform: TransformAnimation = (
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

const transform: Record<AnimationType, TransformAnimation> = {
  ball: ballTransform,
};

export default transform;

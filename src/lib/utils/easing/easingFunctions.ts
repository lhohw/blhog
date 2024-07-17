export const easingFunctionKeys = [
  "linear",

  "easeInSine",
  "easeOutSine",
  "easeInOutSine",

  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",

  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",

  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",

  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",

  "easeInExpo",
  "easeOutExpo",
  "easeInOutExpo",

  "easeInCirc",
  "easeOutCirc",
  "easeInOutCirc",

  "easeInBack",
  "easeOutBack",
  "easeInOutBack",

  "easeInElastic",
  "easeOutElastic",
  "easeInOutElastic",

  "easeInBounce",
  "easeOutBounce",
  "easeInOutBounce",
] as const;
export type EasingKey = (typeof easingFunctionKeys)[number];
export type EasingFunction = (t: number) => number;

const easingFunctions: Record<EasingKey, EasingFunction> = {
  linear,

  easeInSine,
  easeOutSine,
  easeInOutSine,

  easeInCubic,
  easeOutCubic,
  easeInOutCubic,

  easeInQuad,
  easeOutQuad,
  easeInOutQuad,

  easeInQuart,
  easeOutQuart,
  easeInOutQuart,

  easeInQuint,
  easeOutQuint,
  easeInOutQuint,

  easeInExpo,
  easeOutExpo,
  easeInOutExpo,

  easeInCirc,
  easeOutCirc,
  easeInOutCirc,

  easeInBack,
  easeOutBack,
  easeInOutBack,

  easeInElastic,
  easeOutElastic,
  easeInOutElastic,

  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
};

export function linear(t: number) {
  return t;
}

export function easeInSine(t: number) {
  return 1 - Math.cos((t * Math.PI) / 2);
}
export function easeOutSine(t: number) {
  return Math.sin((t * Math.PI) / 2);
}
export function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function easeInCubic(t: number): number {
  return t * t * t;
}
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeInQuad(t: number) {
  return t * t;
}
export function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}
export function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function easeInQuart(t: number): number {
  return t * t * t * t;
}
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
export function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export function easeInQuint(t: number): number {
  return t * t * t * t * t;
}
export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}
export function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

export function easeInExpo(t: number): number {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
}
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
export function easeInOutExpo(t: number): number {
  return t === 0
    ? 0
    : t === 1
      ? 1
      : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

export function easeInCirc(t: number): number {
  return 1 - Math.sqrt(1 - Math.pow(t, 2));
}
export function easeOutCirc(t: number): number {
  return Math.sqrt(1 - Math.pow(t - 1, 2));
}
export function easeInOutCirc(t: number): number {
  return t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
}

export function easeInBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return c3 * t * t * t - c1 * t * t;
}
export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
export function easeInOutBack(t: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

export function easeInElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;

  return t === 0
    ? 0
    : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
}
export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;

  return t === 0
    ? 0
    : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}
export function easeInOutElastic(t: number): number {
  const c5 = (2 * Math.PI) / 4.5;

  return t === 0
    ? 0
    : t === 1
      ? 1
      : t < 0.5
        ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 +
          1;
}

export function easeInBounce(t: number): number {
  return 1 - easeOutBounce(1 - t);
}
export function easeOutBounce(t: number) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}
export function easeInOutBounce(t: number): number {
  return t < 0.5
    ? (1 - easeOutBounce(1 - 2 * t)) / 2
    : (1 + easeOutBounce(2 * t - 1)) / 2;
}

export default easingFunctions;

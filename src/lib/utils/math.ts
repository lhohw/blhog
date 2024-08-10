const { cos, sin, exp, sqrt, log, PI } = Math;

export const r360 = 2 * PI;
export const r180 = PI;
export const r90 = r180 / 2;
export const r45 = r90 / 2;
export const r15 = r45 / 3;

export const random = (range = 1, min = 0) => min + range * Math.random();
export const prob = (rate: number) => random() < rate;

export const deg2Rad = (degree: number) => (degree / 180) * PI;

export const polar2cart = (radius: number, radian: number) => {
  const x = radius * cos(radian);
  const y = radius * sin(radian);
  return { x, y };
};

/**
 * G(x)= (1 / sqrt(2*π*σ*σ)) * exp(-(x-m)^2 / 2*σ^2)
 * @param mean 평균값
 * @param std 표준 편차
 */
export const gaussianDistribution = (x: number, mean: number, std: number) => {
  const norm = 1 / sqrt(2 * PI * std * std);
  return exp(-((x - mean) ** 2 / (2 * std * std))) * norm;
};

export const gaussianBlur = (size = 5, std = 1) => {
  const kernel = new Float32Array(size);
  if (size % 2 === 0) throw new Error("size should be odd");

  const mean = (size - 1) / 2;
  let sum = 0;
  for (let i = 0; i < size; i++) {
    const k = gaussianDistribution(i, mean, std);
    kernel[i] = k;
    sum += k;
  }

  return kernel.map((k) => k / sum);
};

export const marsagilaPolar = () => {
  let w = 1,
    v1 = 0,
    v2 = 0;

  do {
    v1 = random(2, -1);
    v2 = random(2, -1);
    w = v1 ** 2 + v2 ** 2;
  } while (w >= 1);

  w = sqrt((-2 * log(w)) / w);

  return [v1 * w, v2 * w];
};

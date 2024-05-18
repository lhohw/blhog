export const r180 = Math.PI;
export const r90 = r180 / 2;
export const r15 = r90 / 6;

export const random = (range = 1, min = 0) => min + range * Math.random();
export const prob = (rate: number) => random() < rate;

export const deg2Rad = (degree: number) => (degree / 180) * Math.PI;

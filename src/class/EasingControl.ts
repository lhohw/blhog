export type Position = number;
export type EasingFunction = (time: number) => Position;

class EasingControl {
  private dir: 1 | -1 = 1;
  constructor(private easingFunction: EasingFunction) {}
  setEasingFunction(easingFunction: EasingFunction) {
    this.easingFunction = easingFunction;
  }
  isOut(value: number) {
    return value <= 0 || value >= 1;
  }
  flip() {
    this.dir *= -1;
  }
  getValue(progress: number) {
    const { dir, easingFunction: f } = this;

    let value = f(progress);
    if (progress >= 1) value = Math.max(0, Math.min(1, value));
    if (dir === -1) value = 1 - value;

    return value;
  }
  get direction() {
    return this.dir;
  }
}

export default EasingControl;

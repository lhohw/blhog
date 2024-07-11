class Easing {
  private dir: 1 | -1 = 1;
  constructor(private f: (t: number) => number) {}
  isOut(value: number) {
    return value <= 0 || value >= 1;
  }
  flip() {
    this.dir *= -1;
  }
  getValue(progress: number) {
    const { dir, f } = this;

    let value = Math.max(0, Math.min(1, f(progress)));

    if (dir === -1) value = 1 - value;
    return value;
  }
  get direction() {
    return this.dir;
  }
}

export default Easing;

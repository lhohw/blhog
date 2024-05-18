class RafControl {
  private _isPaused = false;
  constructor(
    private frame: (now: number) => void,
    private interval = 1000 / 40,
  ) {}
  get isPaused() {
    return this._isPaused;
  }
  setInterval(interval: number) {
    this.interval = interval;
  }
  pause() {
    this._isPaused = true;
  }
  resume() {
    this._isPaused = false;
    let prevTime = 0;
    const animationFrame = (now: number) => {
      if (!this._isPaused && performance.now() - prevTime >= this.interval) {
        prevTime = performance.now();
        this.frame(now);
      }
      requestAnimationFrame(animationFrame);
    };

    requestAnimationFrame(animationFrame);
  }
}

export default RafControl;

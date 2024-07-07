class RafControl {
  private _isPaused = false;
  private _isDone = false;
  constructor(
    private frame: (now: number) => void,
    private interval = 1000 / 40,
  ) {}
  get isDone() {
    return this._isDone;
  }
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
      if (this._isDone) return;
      requestAnimationFrame(animationFrame);
    };

    requestAnimationFrame(animationFrame);
  }
  done() {
    this.pause();
    this._isDone = true;
  }
}

export default RafControl;

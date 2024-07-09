class RafControl {
  private _isPaused = false;
  private _isDone = false;
  private _requestId: number | null = null;
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
      if (!this._isPaused && now - prevTime >= this.interval) {
        prevTime = now;
        this.frame(now);
      }

      if (this._isDone) return;

      this._requestId = requestAnimationFrame(animationFrame);
    };

    this._requestId = requestAnimationFrame(animationFrame);
  }
  done() {
    if (this._requestId === null) {
      console.log("animation not started");
      return;
    }

    this.pause();
    cancelAnimationFrame(this._requestId);

    this._isDone = true;
    this._requestId = null;
  }
}

export default RafControl;

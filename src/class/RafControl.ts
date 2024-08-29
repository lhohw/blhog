class RafControl {
  private _isPaused = true;
  private _isDone = true;
  private _requestId: number | null = null;
  constructor(
    public frame: (now: number) => void = () => this.done(),
    public interval = 1000 / 60,
  ) {}

  get isDone() {
    return this._isDone;
  }
  get isPaused() {
    return this._isPaused;
  }

  initStart() {
    if (!this.frame) {
      console.log("frame not set");
      return;
    }
    this._isDone = false;
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

      if (this._isPaused || this._isDone) return;

      this._requestId = requestAnimationFrame(animationFrame);
    };

    if (this._requestId) cancelAnimationFrame(this._requestId);
    this._requestId = requestAnimationFrame(animationFrame);
  }

  start() {
    if (this._requestId) {
      cancelAnimationFrame(this._requestId);
      this._requestId = null;
    }
    this._isDone = false;
    this.resume();
  }

  done() {
    if (this._requestId === null) return;

    this.pause();
    cancelAnimationFrame(this._requestId);

    this._isDone = true;
    this._requestId = null;
  }

  cleanup() {
    this.done();
    this.frame = () => this.done();
  }
}

export default RafControl;

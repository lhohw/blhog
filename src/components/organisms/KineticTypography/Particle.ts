const COLOR_SPEED = 0.12;
const MOVE_SPEED = 0.88;
const FRICTION = 0.98;
const ORIGIN_COLOR = 0xf3316e;
const COLLIDED_COLOR = 0x451966;
const RADIUS = 30;

class Particle {
  private vx = 0;
  private vy = 0;
  private originX = 0;
  private originY = 0;
  public color = ORIGIN_COLOR;
  constructor(
    public x: number,
    public y: number,
  ) {
    this.originX = x;
    this.originY = y;
  }
  render(mx: number, my: number, mr: number) {
    this.detectCollision(mx, my, mr);
    this.draw();
  }
  private detectCollision(mx: number, my: number, mr: number) {
    const { x, y } = this;

    const dx = mx - x;
    const dy = my - y;
    const dist = Math.hypot(dy, dx);
    const minDist = RADIUS + mr;

    if (dist >= minDist) return;

    const radian = Math.atan2(dy, dx);
    const tx = x + Math.cos(radian) * minDist;
    const ty = y + Math.sin(radian) * minDist;
    const ax = mx - tx;
    const ay = my - ty;

    this.vx += ax;
    this.vy += ay;

    this.color = COLLIDED_COLOR;
  }
  private draw() {
    const { originX, originY } = this;

    this.x += this.vx;
    this.y += this.vy;

    const dx = originX - this.x;
    const dy = originY - this.y;

    this.x += dx * MOVE_SPEED;
    this.y += dy * MOVE_SPEED;

    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.color += (ORIGIN_COLOR - this.color) * COLOR_SPEED;
  }
}

export default Particle;

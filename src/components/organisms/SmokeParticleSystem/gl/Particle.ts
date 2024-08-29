import Point from "@/class/Point";
import Vector from "@/class/Vector";
import { marsagilaPolar } from "@/lib/utils/math";

const LIFESPAN_UNIT = 0.025;
const ALPHA_ATTENUATION = 0.85;
const INITIAL_DIFFUSION_RATE = 1.21;
const DIFFUSION_ATTENUATION = 0.99;
const INITIAL_Y = 30;

class Particle {
  private _vertices: number[];
  private _lifespan = 1.0;
  private _alpha = 1.0;
  private _acc = new Vector(0, 0);
  private _velocity: Vector;
  private _size = 4;
  private _pos = new Point(this._canvasXCenter, INITIAL_Y);
  private _diffusion = INITIAL_DIFFUSION_RATE;
  constructor(private _canvasXCenter: number) {
    const r1 = marsagilaPolar() * 0.3;
    const r2 = 2.0 + Math.abs(marsagilaPolar() * 1.75);
    this._velocity = new Vector(r1, r2);
    this._vertices = this._init();
  }
  get vertices() {
    return this._vertices;
  }

  get head() {
    const { _vertices } = this;
    return [
      _vertices[0],
      _vertices[1],
      _vertices[2],
      _vertices[3],
      _vertices[4],
    ];
  }

  get tail() {
    const { _vertices } = this;
    const len = _vertices.length;
    return [
      _vertices[len - 5],
      _vertices[len - 4],
      _vertices[len - 3],
      _vertices[len - 2],
      _vertices[len - 1],
    ];
  }

  private _init() {
    const { _canvasXCenter, _size, _alpha } = this;

    const l = _canvasXCenter - _size;
    const r = _canvasXCenter + _size;
    const t = INITIAL_Y + _size * 2;
    const b = INITIAL_Y;
    const rand = marsagilaPolar() * 0.24;
    // prettier-ignore
    const vertices = [
      l, t,   0.0,        1.0,    _alpha,
      l, b,   0.0,        -rand,  _alpha,
      r, t,   1.0 - rand, 1.0,    _alpha,
      r, b,   1.0,        0.0,    _alpha,
    ];

    return vertices;
  }

  applyForce(f: Vector) {
    const { _acc } = this;
    this._acc = _acc.add(f);
  }

  render() {
    this._updateProperty();
    this._updateVertices();
  }

  private _updateProperty() {
    const { _acc, _velocity } = this;

    this._velocity = _velocity.add(_acc);
    this._diffusion *= DIFFUSION_ATTENUATION;
    this._size *= this._diffusion;
    this._alpha *= ALPHA_ATTENUATION;
    this._lifespan -= LIFESPAN_UNIT;
    this._acc = _acc.multiply(0);
    this._pos = this._pos.addVector(_velocity);
  }

  private _updateVertices() {
    const { _vertices, _size, _pos } = this;
    const { x: cx, y: cy } = _pos.coord;

    const l = cx - _size;
    const r = cx + _size;
    const t = cy + _size;
    const b = cy - _size;

    _vertices[0] = l;
    _vertices[1] = t;
    _vertices[5] = l;
    _vertices[6] = b;
    _vertices[10] = r;
    _vertices[11] = t;
    _vertices[15] = r;
    _vertices[16] = b;

    _vertices[4] = _vertices[9] = _vertices[14] = _vertices[19] = this._alpha;
  }

  get isOut() {
    const { _lifespan } = this;
    return _lifespan <= 0;
  }
}

export default Particle;

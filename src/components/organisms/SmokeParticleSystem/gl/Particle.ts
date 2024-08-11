import Vector from "@/class/Vector";
import { marsagilaPolar } from "@/lib/utils/math";

const LIFESPAN_UNIT = 0.025;
const ALPHA_ATTENUATION = 0.85;

class Particle {
  private _vertices: number[];
  private _lifespan = 1.0;
  private _alpha = 1.0;
  private _wHalf = this._width / 2;
  private _sHalf = this._size / 2;
  private _acc = new Vector(0, 0);
  private _velocity = new Vector(0, 0);
  constructor(
    private _width: number,
    private _height: number,
    private _size: number,
  ) {
    this._vertices = this._init();
    const [r1, r2] = marsagilaPolar().map((e) => e * 0.3);
    this._velocity = new Vector(r1, r2 + 1.0);
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
    const { _wHalf, _sHalf, _alpha } = this;

    // prettier-ignore
    const vertices = [
      _wHalf - _sHalf, 3 * _sHalf,   0.0, 1.0,   _alpha,
      _wHalf - _sHalf, _sHalf,       0.0, 0.0,   _alpha,
      _wHalf + _sHalf, 3 * _sHalf,   1.0, 1.0,   _alpha,
      _wHalf + _sHalf, _sHalf,       1.0, 0.0,   _alpha,
    ];

    return vertices;
  }

  get center() {
    const { head, tail } = this;
    const [x1, y1] = head;
    const [x2, y2] = tail;
    return [(x1 + x2) / 2, (y1 + y2) / 2];
  }

  applyForce(f: Vector) {
    const { _acc } = this;
    this._acc = _acc.add(f);
  }

  private _update() {
    const { _vertices, _acc, _velocity } = this;
    this._velocity = _velocity.add(_acc);
    this._alpha *= ALPHA_ATTENUATION;
    this._lifespan -= LIFESPAN_UNIT;
    this._acc = _acc.multiply(0);

    for (let i = 0; i < 4; i++) {
      _vertices[5 * i + 0] += _velocity.x;
      _vertices[5 * i + 1] += _velocity.y;
      _vertices[5 * i + 4] = this._alpha;
    }
  }

  render() {
    this._update();
  }

  get isOut() {
    const { _lifespan } = this;
    return _lifespan <= 0;
  }
}

export default Particle;

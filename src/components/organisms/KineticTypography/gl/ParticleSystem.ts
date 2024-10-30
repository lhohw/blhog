import { rgb } from "@/lib/utils/color";
import Particle from "./Particle";

export default class ParticleSystem {
  private _particles: Particle[] = [];

  get vertices() {
    const { _particles } = this;

    return _particles.flatMap(({ x, y, color }) => [x, y, ...rgb(color)]);
  }

  initParticles(coords: number[]) {
    const { _particles } = this;

    for (let i = 0; i < coords.length; i += 2) {
      const particle = new Particle(coords[i], coords[i + 1]);
      _particles.push(particle);
    }
  }

  render(mx: number, my: number) {
    const { _particles } = this;

    for (let i = 0; i < _particles.length; i++) {
      const particle = _particles[i];
      particle.render(mx, my);
    }
  }
}

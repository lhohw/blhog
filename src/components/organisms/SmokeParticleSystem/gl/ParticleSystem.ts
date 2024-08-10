import Vector from "@/class/Vector";
import Particle from "./Particle";

class ParticleSystem {
  private _particles: Particle[] = [];

  constructor(
    private width: number,
    private height: number,
    private particleSize: number,
  ) {}

  get vertices() {
    const { _particles } = this;
    const vertices = [];
    for (let i = 0; i < _particles.length; i++) {
      const particle = _particles[i];
      vertices.push(...particle.vertices);
      if (i !== _particles.length - 1) {
        vertices.push(...particle.tail, ..._particles[i + 1].head);
      }
    }

    const origin = new Particle(this.width, this.height, this.particleSize);
    vertices.push(
      ..._particles[_particles.length - 1].tail,
      ...origin.head,
      ...origin.vertices,
    );

    return vertices;
  }

  applyForce(f: Vector) {
    const { _particles } = this;

    for (let i = 0; i < _particles.length; i++) {
      const particle = _particles[i];
      particle.applyForce(f);
    }
  }

  render() {
    const { _particles } = this;
    const nextParticles = [];

    for (let i = 0; i < _particles.length; i++) {
      const particle = _particles[i];
      particle.render();
      if (!particle.isOut) nextParticles.push(particle);
    }

    this._particles = nextParticles;
  }

  generate() {
    const { width, height, particleSize } = this;
    this._particles.push(new Particle(width, height, particleSize));
  }
}

export default ParticleSystem;

import Vector from "@/class/Vector";
import Particle from "./Particle";

class ParticleSystem {
  private _particles: Particle[] = [];
  private _center: number;
  constructor(width: number) {
    this._center = width / 2;
  }

  get vertices() {
    const { _particles } = this;
    if (!_particles.length) return [];

    const vertices = [];

    for (let i = 0; i < _particles.length; i++) {
      const particle = _particles[i];
      vertices.push(...particle.vertices);
      if (i !== _particles.length - 1) {
        vertices.push(...particle.tail, ..._particles[i + 1].head);
      }
    }

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
    const { _center } = this;

    const particle = new Particle(_center);
    this._particles.push(particle);
  }
}

export default ParticleSystem;

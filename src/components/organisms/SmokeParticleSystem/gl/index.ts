import type { ShaderSource } from "@/types/glsl";
import GL from "@/class/glsl/GL";
import GLBuffer from "@/class/glsl/GLBuffer";
import vertexShaderSource from "./vert.glsl";
import fragmentShaderSource from "./frag.glsl";
import ParticleSystem from "./ParticleSystem";
import ParticleOffScreen from "./ParticleOffscreen";
import Vector from "@/class/Vector";

const shaderSources: ShaderSource[] = [
  { type: "vertex", source: vertexShaderSource },
  { type: "fragment", source: fragmentShaderSource },
];
const attributeKeys = ["aVertexPosition", "aTexCoords", "aTexAlpha"] as const;
const uniformKeys = ["uSampler", "uResolution"] as const;
const particleSize = 32;

class SmokeParticleSystemGL extends GL<
  typeof attributeKeys,
  typeof uniformKeys
> {
  private _particleSystem = new ParticleSystem(
    this.width,
    this.height,
    particleSize,
  );
  constructor(
    protected width: number,
    protected height: number,
  ) {
    super(width, height);
    this.init();
  }

  async init() {
    try {
      const particleOffscreen = new ParticleOffScreen(
        particleSize,
        particleSize,
      );
      await particleOffscreen.init();

      const textureSources = [
        {
          key: "particle",
          img: particleOffscreen.canvas,
          width: particleSize,
          height: particleSize,
          uniformKey: "uSampler",
          mipmap: true,
          index: 0,
          params: {
            magFilter: "LINEAR",
            minFilter: "LINEAR",
            wrapS: "CLAMP_TO_EDGE",
            wrapT: "CLAMP_TO_EDGE",
          },
        },
      ] as const;

      await this.initGL(
        shaderSources,
        attributeKeys,
        uniformKeys,
        textureSources,
      );

      this._setupUniforms();
      this.blend({
        blendFunc: { sFactor: "SRC_ALPHA", dFactor: "ONE_MINUS_SRC_ALPHA" },
      });
      this.draw(0);
    } catch (e) {
      console.error("smoke particle system initialize failed");
      console.error(e);
    }
  }

  private _setupUniforms() {
    const { uniforms, width, height } = this;

    uniforms.setUniform("uResolution", "2fv", [width, height]);
  }

  draw(mx: number) {
    const { _particleSystem } = this;
    const wind = new Vector(mx, 0);

    _particleSystem.applyForce(wind);
    _particleSystem.render();

    for (let i = 0; i < 2; i++) {
      _particleSystem.generate();
    }

    this._draw();
  }

  private _draw() {
    this.clear([0.0, 0.0, 0.0, 1.0]);
    this._updateParticles();
    const buffer = this._setupBuffer();
    this._drawParticles(buffer);
  }

  private _updateParticles() {
    this._particleSystem.render();
  }

  private _setupBuffer() {
    const { gl, attributes, _particleSystem } = this;
    const buffer = new GLBuffer(gl, _particleSystem.vertices, [
      {
        itemSize: 2,
        index: attributes.index("aVertexPosition"),
        bufferType: "float32",
      },
      {
        itemSize: 2,
        index: attributes.index("aTexCoords"),
        bufferType: "float32",
      },
      {
        itemSize: 1,
        index: attributes.index("aTexAlpha"),
        bufferType: "float32",
      },
    ]);

    return buffer;
  }

  private _drawParticles(buffer: GLBuffer) {
    const { gl, textures } = this;

    buffer.use();
    textures.use("particle");

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.count);
  }
}

export default SmokeParticleSystemGL;

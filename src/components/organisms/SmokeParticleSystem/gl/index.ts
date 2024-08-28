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
  private _particleSystem = new ParticleSystem(this.width, this.height, particleSize); // prettier-ignore
  constructor(
    protected _canvas: HTMLCanvasElement,
    protected width: number,
    protected height: number,
    private _handleContextRestored?: (e: Event) => void,
    private _handleContextLost?: (e: Event) => void,
  ) {
    const particleOffscreen = new ParticleOffScreen(particleSize, particleSize);
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

    super(
      _canvas,
      width,
      height,
      shaderSources,
      attributeKeys,
      uniformKeys,
      textureSources,
    );
    _canvas.addEventListener("webglcontextrestored", this.handleContextRestored); // prettier-ignore
    _canvas.addEventListener("webglcontextlost", this.handleContextLost);
  }

  init() {
    this._setupUniforms();
    this.blend();
  }

  private _setupUniforms() {
    const { uniforms, width, height } = this;
    uniforms.setUniform("uResolution", "2fv", [width, height]);
  }

  draw(mx: number) {
    const { width } = this;
    const normalizedMx = ((mx - width / 2) / width) * 2;
    this._updateParticles(normalizedMx);
    const buffer = this._setupBuffer();
    this.clear([0.0, 0.0, 0.0, 1.0]);
    this._drawParticles(buffer);
  }

  private _updateParticles(normalizedMx: number) {
    const { _particleSystem } = this;
    const wind = new Vector(normalizedMx, 0);

    for (let i = 0; i < 2; i++) {
      _particleSystem.generate();
    }
    _particleSystem.applyForce(wind);
    _particleSystem.render();
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
    this.buffers[0] = buffer;

    return buffer;
  }

  private _drawParticles(buffer: GLBuffer) {
    const { gl, textures } = this;

    buffer.use();
    textures.use("particle");

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.count);
  }

  handleContextRestored(e: Event) {
    this.init();
    this._handleContextRestored?.(e);
  }

  handleContextLost(e: Event) {
    e.preventDefault();
    this._resetToInitialState();
    this._handleContextLost?.(e);
  }
}

export default SmokeParticleSystemGL;

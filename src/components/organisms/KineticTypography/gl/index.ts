import type { ShaderSource } from "@/types/glsl";
import vertexShaderSource from "./vert.glsl";
import fragmentShaderSource from "./frag.glsl";
import GL from "@/class/glsl/GL";
import GLBuffer from "@/class/glsl/GLBuffer";
import ParticleSystem from "./ParticleSystem";

const shaderSources: ShaderSource[] = [
  { type: "vertex", source: vertexShaderSource },
  { type: "fragment", source: fragmentShaderSource },
];
const attributeKeys = ["aVertexPosition", "aVertexColor"] as const;
const uniformKeys = ["uResolution"] as const;

class KineticTypographyGlsl extends GL<
  typeof attributeKeys,
  typeof uniformKeys
> {
  private _particleSystem: ParticleSystem;
  constructor(
    protected _canvas: HTMLCanvasElement,
    protected width: number,
    protected height: number,
    coords: number[],
    private _handleContextRestored?: (e: Event) => void,
    private _handleContextLost?: (e: Event) => void,
  ) {
    super(_canvas, width, height, shaderSources, attributeKeys, uniformKeys);
    this._particleSystem = new ParticleSystem();
    this._particleSystem.initParticles(coords);
    _canvas.addEventListener("webglcontextrestored",this.handleContextRestored); // prettier-ignore
    _canvas.addEventListener("webglcontextlost", this.handleContextLost);
  }

  init() {
    this._setupUniforms();
    this.draw(0, 0, 20);
  }

  private _setupUniforms() {
    const { uniforms, width, height } = this;
    uniforms.setUniform("uResolution", "2f", [width, height]);
  }

  draw(mx: number, my: number, mr: number) {
    this._updateParticles(mx, my, mr);
    const buffer = this._setupBuffer();
    this.clear([0.0, 0.0, 0.0, 1.0]);
    this._drawParticles(buffer);
  }

  private _updateParticles(mx: number, my: number, mr: number) {
    this._particleSystem.render(mx, my, mr);
  }

  private _setupBuffer() {
    const { gl, attributes, _particleSystem } = this;

    const buffer = new GLBuffer(gl, _particleSystem.vertices, [
      {
        index: attributes.index("aVertexPosition"),
        itemSize: 2,
        bufferType: "float32",
      },
      {
        index: attributes.index("aVertexColor"),
        itemSize: 3,
        bufferType: "float32",
      },
    ]);

    this.buffers[0] = buffer;
    return buffer;
  }

  private _drawParticles(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.POINTS, 0, buffer.count);
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

export default KineticTypographyGlsl;

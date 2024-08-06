import type { ShaderSource } from "@/types/glsl";
import vertexShaderSource from "./vert.glsl";
import fragmentShaderSource from "./frag.glsl";
import GL from "@/class/glsl/GL";
import GLBuffer from "@/class/glsl/GLBuffer";

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
  constructor(
    protected width: number,
    protected height: number,
  ) {
    super(width, height, shaderSources, attributeKeys, uniformKeys);
    this.init();
  }
  private init() {
    const { width, height, uniforms } = this;

    uniforms.setUniform("uResolution", "2f", [width, height]);
  }

  draw(data: number[]) {
    this.clear();
    this._draw(data);
  }

  private _draw(data: number[]) {
    const buffer = this.setupVertexBuffer(data);
    this.drawParticles(buffer);
  }

  private setupVertexBuffer(data: number[]) {
    const { gl, attributes } = this;

    const buffer = new GLBuffer(gl, data, [
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

    return buffer;
  }

  private drawParticles(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.POINTS, 0, buffer.count);
  }

  handleContextRestored() {
    this._init();
    this.init();
  }
}

export default KineticTypographyGlsl;

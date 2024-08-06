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

  get canvas() {
    const { gl } = this;
    return gl.canvas as HTMLCanvasElement;
  }

  private init() {
    const { canvas, width, height, uniforms } = this;
    canvas.classList.add("absolute", "inset-0");

    uniforms.setUniform("uResolution", "2f", [width, height]);
  }

  draw(coords: number[], colors: number[]) {
    this.clear();
    this._draw(coords, colors);
  }

  private _draw(coords: number[], colors: number[]) {
    const buffer = this.setupVertexBuffer(coords, colors);
    this.drawParticles(buffer);
  }

  private setupVertexBuffer(coords: number[], colors: number[]) {
    const { gl, attributes } = this;

    const index = attributes.index("aVertexPosition");
    const buffer = new GLBuffer(gl, coords, 2, index, "FLOAT", "STATIC_DRAW");

    const colorIndex = attributes.index("aVertexColor");
    buffer.addBuffer(colors, 3, colorIndex, "FLOAT", "STATIC_DRAW");

    return buffer;
  }

  private drawParticles(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.POINTS, 0, buffer.count);
  }
}

export default KineticTypographyGlsl;

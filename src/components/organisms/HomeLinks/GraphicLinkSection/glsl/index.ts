import vertexShaderSource from "./vert.glsl";
import fragmentShaderSource from "./frag.glsl";
import { ShaderSource } from "@/types/glsl";
import GL from "@/class/glsl/GL";
import GLBuffer from "@/class/glsl/GLBuffer";

const shaderSources: ShaderSource[] = [
  { type: "vertex", source: vertexShaderSource },
  { type: "fragment", source: fragmentShaderSource },
];
const attributeKeys = ["aVertexPosition", "aVertexColor"] as const;

class GraphicLinkSectionGlsl extends GL<typeof attributeKeys> {
  constructor(
    protected _canvas: HTMLCanvasElement,
    protected width: number,
    protected height: number,
  ) {
    super(_canvas, width, height, shaderSources, attributeKeys);
  }

  init() {}
  draw() {
    this._draw();
  }

  private _draw() {
    const buffer = this.setupBuffer();
    this.drawBuffer(buffer);
  }

  private setupBuffer() {
    const { gl, attributes } = this;

    const buffer = new GLBuffer(
      gl,
      [
        0.0, 0.5, 0.0, 1, 0, 0, 1, -0.5, -0.5, 0.0, 0, 1, 0, 1, 0.5, -0.5, 0.0,
        0, 0, 1, 1,
      ],
      [
        {
          itemSize: 3,
          index: attributes.index("aVertexPosition"),
          bufferType: "float32",
        },
        {
          itemSize: 4,
          index: attributes.index("aVertexColor"),
          bufferType: "uint8",
        },
      ],
    );
    this.buffers[0] = buffer;

    return buffer;
  }

  private drawBuffer(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.TRIANGLES, 0, buffer.count);
  }

  handleContextRestored(e: Event): void {
    this.draw();
  }

  handleContextLost(e: Event): void {
    e.preventDefault();
    this._resetToInitialState();
  }
}

export default GraphicLinkSectionGlsl;

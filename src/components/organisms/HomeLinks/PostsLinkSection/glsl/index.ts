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

class PostsLinkSectionGlsl extends GL<typeof attributeKeys> {
  constructor(
    protected width: number,
    protected height: number,
  ) {
    super(width, height, shaderSources, attributeKeys);

    this.init();
  }

  private init() {
    this._init();
  }

  draw() {
    this._draw();
  }

  private _draw() {
    const buffer = this.setupBuffer();
    this.drawBuffer(buffer);
  }

  private setupBuffer() {
    const { gl, attributes } = this;

    const vertices = [0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0];
    const index = attributes.index("aVertexPosition");
    const buffer = new GLBuffer(
      gl,
      vertices,
      3,
      index,
      "float32",
      "STATIC_DRAW",
    );

    const colors = [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1];
    new GLBuffer(
      gl,
      colors,
      4,
      attributes.index("aVertexColor"),
      "uint8",
      "STATIC_DRAW",
    );

    return buffer;
  }

  private drawBuffer(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.TRIANGLES, 0, buffer.count);
  }
}

export default PostsLinkSectionGlsl;

import type { ShaderSource } from "@/types/glsl";
import GL from "@/class/glsl/GL";
import GLBuffer from "@/class/glsl/GLBuffer";

const vertexShaderSource = `
attribute vec2 aVertexPosition;
void main() {
  gl_Position=vec4(aVertexPosition,0.,1.);
}
`;
const fragmentShaderSource = `
precision mediump float;
uniform vec2 uResolution;
void main() {
  vec2 uv=gl_FragCoord.xy/uResolution.xy;
  float len=length(uv-.5);
  float wb=step(len,.5);
  gl_FragColor=vec4(wb);
}
`;
const shaderSources: ShaderSource[] = [
  { type: "vertex", source: vertexShaderSource },
  { type: "fragment", source: fragmentShaderSource },
];
const attributeKeys = ["aVertexPosition"] as const;
const uniformKeys = ["uResolution"] as const;

class ParticleOffScreen extends GL<typeof attributeKeys, typeof uniformKeys> {
  constructor(
    protected width: number,
    protected height: number,
  ) {
    super(width, height);
  }
  async init() {
    try {
      await this.initGL(shaderSources, attributeKeys, uniformKeys);
      this._setupUniforms();
      this._draw();
    } catch (e) {
      console.error(e);
      throw new Error("particle offscreen initialize failed");
    }
  }
  private _setupUniforms() {
    const { uniforms, width, height } = this;
    uniforms.setUniform("uResolution", "2fv", [width, height]);
  }
  private _draw() {
    const buffer = this._initBuffer();
    this._drawParticle(buffer);
  }
  private _initBuffer() {
    const { gl, attributes } = this;
    const vertices = [-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0];
    const buffer = new GLBuffer(gl, vertices, {
      itemSize: 2,
      index: attributes.index("aVertexPosition"),
      bufferType: "float32",
    });
    return buffer;
  }
  private _drawParticle(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.count);
  }
}

export default ParticleOffScreen;

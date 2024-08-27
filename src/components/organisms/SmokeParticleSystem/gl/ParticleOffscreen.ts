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
void main(){
  vec2 st=gl_FragCoord.xy/uResolution;
  float alphaMask=step(length(st-.5),.5);
  vec4 color=vec4(1.-smoothstep(0.,1.,length(st-.5)));
  gl_FragColor=vec4(color.rgb,color.a*alphaMask);
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
    const canvas = document.createElement("canvas");
    super(canvas, width, height, shaderSources, attributeKeys, uniformKeys);
    this.init();
  }

  init() {
    this.buffers = [];
    this._setupUniforms();
    this.draw();
  }

  private _setupUniforms() {
    const { uniforms, width, height } = this;
    uniforms.setUniform("uResolution", "2fv", [width, height]);
  }

  draw() {
    const buffer = this._initBuffer();
    this._drawParticle(buffer);
  }

  private _drawParticle(buffer: GLBuffer) {
    const { gl } = this;
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.count);
  }

  private _initBuffer() {
    const { gl, attributes } = this;

    const vertices = [-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0];
    const buffer = new GLBuffer(gl, vertices, {
      itemSize: 2,
      index: attributes.index("aVertexPosition"),
      bufferType: "float32",
    });
    this.buffers[0] = buffer;

    return buffer;
  }

  handleContextRestored(e: Event): void {
    this.init();
  }

  handleContextLost(e: Event): void {
    e.preventDefault();
  }
}

export default ParticleOffScreen;

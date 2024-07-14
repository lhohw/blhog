import GLBuffer from "./GLBuffer";
import GLAttribute from "./GLAttribute";
import GLBufferPattern from "./GLBufferPattern";

export type ShaderSource = {
  type: "vertex" | "fragment";
  source: string;
};
class GL {
  private gl: WebGLRenderingContext | null = null;
  private glBuffer: GLBuffer | null = null;
  constructor(
    private width: number,
    private height: number,
    private shaderSources: ShaderSource[],
    private vertices: number[],
    private pattern: GLBufferPattern,
  ) {
    const props = this.init();
    if (!props?.gl || !props?.glBuffer) return;

    this.gl = props.gl;
    this.glBuffer = props.glBuffer;
  }
  draw(transparent = false) {
    const { gl, glBuffer } = this;
    if (!gl || !glBuffer) return;

    this.drawArrays(gl, glBuffer, transparent);
  }

  get canvas() {
    const { gl } = this;
    return gl?.canvas as HTMLCanvasElement | undefined;
  }

  private init() {
    const { width, height, shaderSources } = this;

    try {
      const canvas = document.createElement("canvas");
      const gl = this.initCtx(canvas, width, height);
      const shaders = this.initShaders(gl, shaderSources);
      const program = this.initProgram(gl, shaders);
      const glBuffer = this.initBuffer(gl);
      this.initAttributes(gl, program, glBuffer);

      return { gl, glBuffer };
    } catch (e) {
      console.error(e);
    }

    return null;
  }

  private initCtx(canvas: HTMLCanvasElement, width: number, height: number) {
    const gl = canvas.getContext("webgl");
    if (!gl) throw new Error("webgl not supported");

    canvas.width = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);

    return gl;
  }

  private initShaders(
    gl: WebGLRenderingContext,
    shaderSources: ShaderSource[],
  ) {
    const shaders = [];

    for (let i = 0; i < shaderSources.length; i++) {
      const { type, source } = shaderSources[i];
      const shaderType =
        type === "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
      const shader = gl.createShader(shaderType);
      if (!shader) throw new Error("shader not initialized");

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(
          gl.getShaderInfoLog(shader) || "failed to compile shader",
        );
      }

      shaders.push(shader);
    }

    return shaders;
  }

  private initProgram(gl: WebGLRenderingContext, shaders: WebGLShader[]) {
    const program = gl.createProgram();
    if (!program) throw new Error("program not initialized");

    for (let i = 0; i < shaders.length; i++) {
      const shader = shaders[i];
      gl.attachShader(program, shader);
    }

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        gl.getProgramInfoLog(program) || "failed to link program",
      );
    }

    gl.useProgram(program);

    return program;
  }

  private initBuffer(gl: WebGLRenderingContext) {
    const { vertices, pattern } = this;

    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("failed to bind buffer");

    const glBuffer = new GLBuffer(buffer, vertices, pattern);

    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, glBuffer.data, gl.STATIC_DRAW);

    this.glBuffer = glBuffer;

    return glBuffer;
  }

  private initAttributes(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    glBuffer: GLBuffer,
  ) {
    const attribute = new GLAttribute(program, glBuffer);
    attribute.setAttributes(gl);

    return attribute;
  }

  private drawArrays(
    gl: WebGLRenderingContext,
    glBuffer: GLBuffer,
    transparent: boolean,
  ) {
    if (!transparent) {
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer.buffer);
    gl.drawArrays(gl.TRIANGLES, 0, glBuffer.count);
  }
}

export default GL;

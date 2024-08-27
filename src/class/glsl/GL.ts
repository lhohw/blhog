import type { ShaderSource, TextureSource } from "@/types/glsl";
import GLAttributes from "./GLAttributes";
import GLUniforms from "./GLUniforms";
import GLTextures from "./GLTextures";
import GLBuffer from "./GLBuffer";

abstract class GL<
  A extends readonly string[] = readonly string[],
  U extends readonly string[] = readonly string[],
  T extends readonly TextureSource<U>[] = readonly TextureSource<U>[],
> {
  private _gl: WebGLRenderingContext | null = null;
  private _shaders: WebGLShader[] | null = null;
  private _program: WebGLProgram | null = null;
  private _attributes: GLAttributes<A> | null = null;
  private _uniforms: GLUniforms<U> | null = null;
  private _textures: GLTextures<T> | null = null;
  protected buffers: GLBuffer[] = [];

  protected constructor(
    protected _canvas: HTMLCanvasElement,
    protected width: number,
    protected height: number,
    shaderSources: ShaderSource[],
    attributeKeys?: A,
    uniformKeys?: U,
    textureSources?: T,
  ) {
    this._gl = this._initCanvas();
    this.initGL(shaderSources, attributeKeys, uniformKeys, textureSources);
  }

  /**
   * only GL resource (gl, shaders, program, attributes, uniforms, textures) initialized.
   * please set data to use on shader in init() method
   * ex) setup uniforms, setup blend ...
   */
  abstract init(): void;

  /**
   * method to draw
   * it includes clear, setup buffer, apply force, calculate frame, draw particles ...
   */
  abstract draw(...args: any[]): void;

  /**
   * TODO: hidden in GL
   *
   * coerce to create method to handle context lost (restored & lost)
   * it's often implemented to call
   *  restored: init, draw
   *  lost: e.preventDefault
   * so, it may could be hidden in GL
   * but, need how to re-setup uniforms, buffer, etc... that exists in higher
   */
  abstract handleContextRestored(e: Event): void;

  /**
   * TODO: hidden in GL
   *
   * coerce to create method to handle context lost (restored & lost)
   * it's often implemented to call
   *  restored: init, draw
   *  lost: e.preventDefault, resetToInitialState
   * it may could be hidden in GL
   * but, need how to re-setup uniforms, buffer, etc... that exists in higher
   */
  abstract handleContextLost(e: Event): void;

  get gl() {
    const gl = this._gl;
    if (!gl) throw new Error("gl not supported");
    return gl;
  }

  get canvas() {
    return this.gl.canvas as HTMLCanvasElement;
  }

  get shaders() {
    const shaders = this._shaders;
    if (!shaders) throw new Error("shaders not initialized");
    return shaders;
  }

  get program() {
    const program = this._program;
    if (!program) throw new Error("program not initialized");
    return program;
  }

  get attributes() {
    const attributes = this._attributes;
    if (!attributes) throw new Error("attributes not initialized");
    return attributes;
  }

  get uniforms() {
    const uniforms = this._uniforms;
    if (!uniforms) throw new Error("uniforms not initialized");
    return uniforms;
  }

  get textures() {
    const textures = this._textures;
    if (!textures) throw new Error("textures not initialized");
    return textures;
  }

  cleanup() {
    const { gl, buffers, shaders, program } = this;

    for (const buf of buffers) buf.deleteBuffer();
    for (const shader of shaders) gl.deleteShader(shader);
    gl.deleteProgram(program);
  }

  private _initCanvas() {
    const { _canvas, width, height } = this;

    const gl = _canvas.getContext("webgl");
    if (!gl) throw new Error("gl not supported");

    _canvas.width = width;
    _canvas.height = height;

    gl.viewport(0, 0, width, height);

    return gl;
  }

  private initGL(
    shaderSources: ShaderSource[],
    attributeKeys?: A,
    uniformKeys?: U,
    textureSources?: T,
  ) {
    const { _gl } = this;
    if (!_gl) throw new Error("gl not defined");

    const shaders = this._initShaders(_gl, shaderSources);
    const program = this._initProgram(_gl, shaders);
    const attributes = this._initAttributes(_gl, program, attributeKeys);
    const uniforms = this._initUniforms(_gl, program, uniformKeys);
    const textures = this._initTextures(_gl, uniforms, textureSources);

    this._gl = _gl;
    this._shaders = shaders;
    this._program = program;
    this._attributes = attributes;
    this._uniforms = uniforms;
    this._textures = textures;
  }

  static preloadImages<U extends readonly string[] = readonly string[]>(
    textureSources: TextureSource<U>[],
  ) {
    const preloadImage = (
      textureSource: (typeof textureSources)[number],
      idx: number,
    ): Promise<typeof textureSource> => {
      const { src, img, width, height, index } = textureSource;

      if (img) return Promise.resolve(textureSource);

      return new Promise((res) => {
        const image = new Image(width, height);
        if (!src) throw new Error("src is required");

        image.src = src;
        textureSource.index = index ?? idx;
        textureSource.img = image;

        image.onload = () => {
          res(textureSource);
        };
      });
    };

    const preloadedImages = textureSources.map(preloadImage);
    return Promise.all(preloadedImages);
  }

  private _initShaders(
    gl: WebGLRenderingContext,
    shaderSources: ShaderSource[],
  ) {
    const shaders = [];

    for (let i = 0; i < shaderSources.length; i++) {
      const { type, source } = shaderSources[i];
      const shaderType =
        type === "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
      const shader = gl.createShader(shaderType);
      if (!shader) throw new Error(type + " shader not initialized");

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (
        !gl.getShaderParameter(shader, gl.COMPILE_STATUS) &&
        !gl.isContextLost()
      ) {
        throw new Error(
          gl.getShaderInfoLog(shader) || "failed to compile shader",
        );
      }

      shaders.push(shader);
    }

    return shaders;
  }

  private _initProgram(gl: WebGLRenderingContext, shaders: WebGLShader[]) {
    const program = gl.createProgram();
    if (!program) throw new Error("program not defined");

    for (const shader of shaders) {
      gl.attachShader(program, shader);
    }

    gl.linkProgram(program);
    if (
      !gl.getProgramParameter(program, gl.LINK_STATUS) &&
      !gl.isContextLost()
    ) {
      throw new Error(
        gl.getProgramInfoLog(program) || "failed to link program",
      );
    }

    gl.useProgram(program);
    return program;
  }

  private _initAttributes(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    attributeKeys?: A,
  ) {
    if (!attributeKeys) return null;

    const attributes = new GLAttributes(gl, program, attributeKeys);
    return attributes;
  }

  private _initUniforms(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    _uniformKeys?: U,
  ) {
    if (!_uniformKeys) return null;

    const uniforms = new GLUniforms(gl, program, _uniformKeys);
    return uniforms;
  }

  private _initTextures(
    gl: WebGLRenderingContext,
    uniforms: GLUniforms<U> | null,
    textureSources?: T,
  ) {
    if (!textureSources) return null;
    if (!uniforms) throw new Error("uniforms not initialized");

    const textures = new GLTextures(gl, textureSources, uniforms);
    return textures;
  }

  protected _resetToInitialState() {
    const { gl } = this;
    const numAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    const tmp = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tmp);
    for (let ii = 0; ii < numAttribs; ++ii) {
      gl.disableVertexAttribArray(ii);
      gl.vertexAttribPointer(ii, 4, gl.FLOAT, false, 0, 0);
      gl.vertexAttrib1f(ii, 0);
    }
    gl.deleteBuffer(tmp);

    const numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    for (let ii = 0; ii < numTextureUnits; ++ii) {
      gl.activeTexture(gl.TEXTURE0 + ii);
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.useProgram(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.DITHER);
    gl.disable(gl.SCISSOR_TEST);
    gl.blendColor(0, 0, 0, 0);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
    gl.clearStencil(-1);
    gl.colorMask(true, true, true, true);
    gl.cullFace(gl.BACK);
    gl.depthFunc(gl.LESS);
    gl.depthMask(true);
    gl.depthRange(0, 1);
    gl.frontFace(gl.CCW);
    gl.hint(gl.GENERATE_MIPMAP_HINT, gl.DONT_CARE);
    gl.lineWidth(1);
    gl.pixelStorei(gl.PACK_ALIGNMENT, 4);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    // TODO: Delete this IF.
    if (gl.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
      gl.pixelStorei(
        gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,
        gl.BROWSER_DEFAULT_WEBGL,
      );
    }
    gl.polygonOffset(0, 0);
    gl.sampleCoverage(1, false);
    gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
    gl.stencilFunc(gl.ALWAYS, 0, 0xffffffff);
    gl.stencilMask(0xffffffff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    gl.viewport(
      0,
      0,
      (gl.canvas as HTMLCanvasElement).clientWidth,
      (gl.canvas as HTMLCanvasElement).clientHeight,
    );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    // TODO: This should NOT be needed but Firefox fails with 'hint'
    while (gl.getError());
  }

  clear(
    color = [1.0, 1.0, 1.0, 1.0],
    bit: number = WebGLRenderingContext.COLOR_BUFFER_BIT,
  ) {
    const { _gl } = this;
    if (!_gl) {
      console.error("gl not initialized");
      return;
    }

    const [r, g, b, a] = color;
    _gl.clearColor(r, g, b, a);
    _gl.clear(bit);
  }

  cull(dir: "CCW" | "CW" = "CCW", face: "BACK" | "FRONT" = "BACK") {
    const { gl } = this;

    gl.frontFace(gl[dir]);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl[face]);
  }

  blend(
    options: Partial<{
      blendFunc:
        | { sFactor: "SRC_ALPHA"; dFactor: "ONE_MINUS_SRC_ALPHA" }
        | { sFactor: "ONE_MINUS_SRC_ALPHA"; dFactor: "SRC_ALPHA" };
      blendEquation: "FUNC_ADD" | "FUNC_SUBTRACT" | "FUNC_REVERSE_SUBTRACT";
    }> = {
      blendFunc: { sFactor: "SRC_ALPHA", dFactor: "ONE_MINUS_SRC_ALPHA" },
      blendEquation: "FUNC_ADD",
    },
  ) {
    const { gl } = this;

    if (!options.blendFunc) {
      options.blendFunc = {
        sFactor: "SRC_ALPHA",
        dFactor: "ONE_MINUS_SRC_ALPHA",
      };
    }
    if (!options.blendEquation) {
      options.blendEquation = "FUNC_ADD";
    }

    const { blendFunc, blendEquation } = options;
    const { sFactor, dFactor } = blendFunc;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl[sFactor], gl[dFactor]);
    gl.blendEquation(gl[blendEquation]);
  }

  depthTest() {
    const { gl } = this;
    gl.enable(gl.DEPTH_TEST);
  }
}

export default GL;

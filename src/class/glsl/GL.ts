import type { ShaderSource, TextureSource } from "@/types/glsl";
import GLAttributes from "./GLAttributes";
import GLUniforms from "./GLUniforms";
import GLTextures from "./GLTextures";

class GL<
  A extends readonly string[] = readonly string[],
  U extends readonly string[] = readonly string[],
  T extends readonly TextureSource<U>[] = readonly TextureSource<U>[],
> {
  private _gl: WebGLRenderingContext | null = null;
  private _attributes: GLAttributes<A> | null = null;
  private _uniforms: GLUniforms<U> | null = null;
  private _textures: GLTextures<T> | null = null;
  protected constructor(
    protected width: number,
    protected height: number,
  ) {
    try {
      this._gl = this._initCanvas();
    } catch (e) {
      console.error(e);
      this._resetToInitialState();
    }
  }
  get gl() {
    const gl = this._gl;
    if (!gl) throw new Error("gl not supported");
    return gl;
  }

  get canvas() {
    return this.gl.canvas as HTMLCanvasElement;
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

  private _initCanvas() {
    const { width, height } = this;
    const canvas = document.createElement("canvas");

    const gl = canvas.getContext("webgl");
    if (!gl) throw new Error("gl not supported");

    canvas.width = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);

    return gl;
  }

  protected async initGL(
    shaderSources: ShaderSource[],
    attributeKeys?: A,
    uniformKeys?: U,
    textureSources?: T,
  ) {
    const { _gl } = this;
    if (!_gl) throw new Error("gl not defined");

    const _textureSources = this._preloadImages(textureSources);
    const shaders = this._initShaders(_gl, shaderSources);
    const program = this._initProgram(_gl, shaders);
    const attributes = this._initAttributes(_gl, program, attributeKeys);
    const uniforms = this._initUniforms(_gl, program, uniformKeys);
    await this.waitForLoadImage(_textureSources);
    const textures = this._initTextures(_gl, uniforms, textureSources);

    this._gl = _gl;
    this._attributes = attributes;
    this._uniforms = uniforms;
    this._textures = textures;
  }

  private _preloadImages(_textureSources?: T) {
    if (!_textureSources?.length) return [];

    return _textureSources.map(this._preloadImage);
  }

  private _preloadImage(textureSource: T[number], idx: number) {
    const { src, img, width, height, index } = textureSource;

    if (!img) {
      const image = new Image(width, height);
      if (!src) throw new Error("src is required");
      image.src = src;
      textureSource.index = index ?? idx;
      textureSource.img = image;
    }

    return textureSource;
  }

  private waitForLoadImage(textureSources: TextureSource[]) {
    const promises = textureSources.map(({ img }) => {
      return new Promise((res) => {
        if (img instanceof HTMLImageElement) {
          img.onload = () => res(true);
        } else {
          res(true);
        }
      });
    });
    return Promise.all(promises);
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

  private _resetToInitialState() {
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

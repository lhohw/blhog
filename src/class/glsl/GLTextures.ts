import type { TextureSource } from "@/types/glsl";
import GLUniforms from "./GLUniforms";

class GLTextures<
  T extends readonly TextureSource[] = readonly TextureSource[],
  U extends readonly string[] = readonly string[],
> {
  private _textures: Record<T[number]["key"], GLTexture> = null!;
  private _glTextures: WebGLTexture[] = [];
  constructor(
    private _gl: WebGLRenderingContext,
    private _textureSources: T,
    private uniforms: GLUniforms<U>,
  ) {
    const { _glTextures } = this;
    this._textures = _textureSources.reduce(
      (acc, textureSource) => {
        const { key, index = 0, uniformKey } = textureSource;

        if (!_glTextures[index]) {
          const texture = _gl.createTexture();
          if (!texture) throw new Error("texture not created");

          _glTextures[index] = texture;
        }

        const uniformIndex = uniforms.index(uniformKey);

        return {
          ...acc,
          [key]: new GLTexture(
            _gl,
            textureSource,
            _glTextures[index],
            uniformIndex,
          ),
        };
      },
      {} as typeof this._textures,
    );
  }

  use(key: T[number]["key"]) {
    const { _textures } = this;

    _textures[key].use();
  }
}

class GLTexture {
  constructor(
    private _gl: WebGLRenderingContext,
    private _textureSource: TextureSource,
    private _texture: WebGLTexture,
    private _uniformIndex: WebGLUniformLocation | null,
  ) {
    this._init();
  }

  private get textureUnit(): GLenum {
    const { _gl, _textureSource } = this;
    // @ts-ignore
    return _gl[`TEXTURE${_textureSource.index}`];
  }

  use() {
    const { _gl, _texture, _textureSource, _uniformIndex, textureUnit } = this;

    _gl.activeTexture(textureUnit);
    _gl.bindTexture(_gl.TEXTURE_2D, _texture);
    _gl.uniform1i(_uniformIndex, _textureSource.index!);
  }

  private _init() {
    const { _gl, _texture, _textureSource } = this;
    const { img, mipmap, params } = _textureSource;

    _gl.bindTexture(_gl.TEXTURE_2D, _texture);
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, true);
    _gl.texImage2D(
      _gl.TEXTURE_2D,
      0,
      _gl.RGBA,
      _gl.RGBA,
      _gl.UNSIGNED_BYTE,
      img!,
    );

    if (mipmap) {
      _gl.generateMipmap(_gl.TEXTURE_2D);
    }

    // prettier-ignore
    if (params) {
      const { magFilter, minFilter, wrapS, wrapT } = params;
      if (magFilter) _gl.texParameteri(_gl.TEXTURE_2D, _gl["TEXTURE_MAG_FILTER"], _gl[magFilter]);
      if (minFilter) _gl.texParameteri(_gl.TEXTURE_2D, _gl["TEXTURE_MIN_FILTER"], _gl[minFilter]);
      if (wrapS) _gl.texParameteri(_gl.TEXTURE_2D, _gl["TEXTURE_WRAP_S"], _gl[wrapS]);
      if (wrapT) _gl.texParameteri(_gl.TEXTURE_2D, _gl["TEXTURE_WRAP_T"], _gl[wrapT]);
    }

    _gl.bindTexture(_gl.TEXTURE_2D, null);
  }
}

export default GLTextures;

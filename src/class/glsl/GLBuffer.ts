import type { BufferPattern } from "@/types/glsl";
import {
  getBytesPerElement,
  getView,
  toDataType,
} from "@/lib/utils/glsl/buffer";

class GLBuffer {
  private _isUsing = false;
  private _buffer: WebGLBuffer;
  private _numberOfItems = 0;
  private _stride = 0;
  private _offsets: number[] = [];
  constructor(
    private _gl: WebGLRenderingContext,
    private _vertices: number[],
    private _patterns: BufferPattern | BufferPattern[],
  ) {
    if (!Array.isArray(this._patterns)) this._patterns = [this._patterns];

    this._init();
    this._buffer = this._initBuffer();
    this.use();
  }

  private get patterns() {
    return this._patterns as BufferPattern[];
  }

  private _init() {
    const { _vertices, patterns, _offsets } = this;

    let offset = 0;
    let totalItemSize = 0;

    for (let i = 0; i < patterns.length; i++) {
      const { itemSize, bufferType } = patterns[i];
      _offsets[i] = offset;
      const bytesPerElement = getBytesPerElement(bufferType);
      offset += itemSize * bytesPerElement;
      totalItemSize += itemSize;
    }

    this._stride = offset;
    this._numberOfItems = _vertices.length / totalItemSize;
  }

  private _initBuffer() {
    const { _gl, _stride, _numberOfItems, patterns, _vertices } = this;

    const data = new ArrayBuffer(_stride * _numberOfItems);
    const buffer = _gl.createBuffer();
    if (!buffer) throw new Error("buffer not initialized");

    let bytes = 0;
    let idx = 0;
    for (let i = 0; i < _numberOfItems; i++) {
      for (let j = 0; j < patterns.length; j++) {
        const { itemSize, bufferType } = patterns[j];
        const constructor = getView(bufferType);
        const view = new constructor(data);
        const bytesPerElement = constructor.BYTES_PER_ELEMENT;
        for (let k = 0; k < itemSize; k++) {
          view[bytes / bytesPerElement] = _vertices[idx];
          idx++;
          bytes += bytesPerElement;
        }
      }
    }

    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
    _gl.bufferData(_gl.ARRAY_BUFFER, data, _gl.STATIC_DRAW);

    return buffer;
  }

  get count() {
    return this._numberOfItems;
  }

  use() {
    const { _gl, _buffer, _stride, _offsets, _isUsing, patterns } = this;

    if (_isUsing) return;

    this._isUsing = true;

    _gl.bindBuffer(_gl.ARRAY_BUFFER, _buffer);

    for (let i = 0; i < patterns.length; i++) {
      const { index, itemSize, bufferType } = patterns[i];
      const dataType = toDataType(bufferType);
      const offset = _offsets[i];

      _gl.vertexAttribPointer(
        index,
        itemSize,
        _gl[dataType],
        false,
        _stride,
        offset,
      );
    }
  }
}

export default GLBuffer;

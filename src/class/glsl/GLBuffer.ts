import { arr2view, toDataType } from "@/lib/utils/glsl/buffer";
import type { BufferDataType, BufferType, DrawType } from "@/types/glsl";

class GLBuffer {
  private _buffer: WebGLBuffer;
  private _numberOfItems: number;
  private _isUsing = false;
  private _dataType: BufferDataType;
  constructor(
    private _gl: WebGLRenderingContext,
    private _vertices: number[],
    private _itemSize: number,
    private _index?: number,
    private _itemType: BufferType = "float32",
    private _drawType: DrawType = "STATIC_DRAW",
  ) {
    const buffer = _gl.createBuffer();
    if (!buffer) throw new Error("buffer not initialized");

    this._buffer = buffer;
    const view = arr2view(_vertices, _itemType);
    this._dataType = toDataType(_itemType);
    this._numberOfItems = _vertices.length / _itemSize;

    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
    _gl.bufferData(_gl.ARRAY_BUFFER, view, _gl[_drawType]);
    this.use();
  }

  get count() {
    return this._numberOfItems;
  }

  use() {
    const { _gl, _index, _itemSize, _dataType, _buffer, _isUsing } = this;
    if (_isUsing) return;

    this._isUsing = true;
    _gl.bindBuffer(_gl.ARRAY_BUFFER, _buffer);
    if (_index !== undefined) {
      _gl.vertexAttribPointer(_index, _itemSize, _gl[_dataType], false, 0, 0);
    }
  }
}

export default GLBuffer;

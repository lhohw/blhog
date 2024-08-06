import type { BufferDataType, DrawType } from "@/types/glsl";

class GLBuffer {
  private _buffer: WebGLBuffer;
  private _numberOfItems: number;
  private isUsing = false;
  constructor(
    private _gl: WebGLRenderingContext,
    private _vertices: Float32List,
    private _itemSize: number,
    private _index?: number,
    private _itemType: BufferDataType = "FLOAT",
    private _type: DrawType = "STATIC_DRAW",
  ) {
    const buffer = _gl.createBuffer();
    if (!buffer) throw new Error("buffer not initialized");

    this._buffer = buffer;
    this._numberOfItems = _vertices.length / _itemSize;
    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
    _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(_vertices), _gl[_type]);
    this.use();
  }

  get count() {
    return this._numberOfItems;
  }

  use() {
    const { _gl, _index, _itemSize, _itemType, _buffer, isUsing } = this;
    if (isUsing) return;

    this.isUsing = true;
    _gl.bindBuffer(_gl.ARRAY_BUFFER, _buffer);
    if (_index !== undefined) {
      _gl.vertexAttribPointer(_index, _itemSize, _gl[_itemType], false, 0, 0);
    }
  }

  addBuffer(
    vertices: Float32List,
    itemSize: number,
    index: number,
    itemType: BufferDataType = "FLOAT",
    type: DrawType = "STATIC_DRAW",
  ) {
    const { _gl } = this;

    const buffer = _gl.createBuffer();
    if (!buffer) throw new Error("buffer not initialized");

    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
    _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(vertices), _gl[type]);

    _gl.vertexAttribPointer(index, itemSize, _gl[itemType], false, 0, 0);
  }
}

export default GLBuffer;

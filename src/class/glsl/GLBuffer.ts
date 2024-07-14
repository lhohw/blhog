import GLBufferPattern from "./GLBufferPattern";

class GLBuffer {
  private colCnt: number;
  private rowCnt: number;
  private vertexCnt: number;
  public totalBytesPerRow: number;

  private arrayBuffer: ArrayBuffer;
  constructor(
    private _buffer: WebGLBuffer,
    private vertices: number[],
    private pattern: GLBufferPattern,
  ) {
    this.colCnt = pattern.count;
    this.rowCnt = vertices.length / this.colCnt;
    this.vertexCnt = this.colCnt * this.rowCnt;

    this.totalBytesPerRow = pattern.totalBytes;
    this.arrayBuffer = new ArrayBuffer(this.totalBytesPerRow * this.rowCnt);

    this.init();
  }
  private init() {
    const { rowCnt, pattern, vertices, arrayBuffer } = this;

    let arrIdx = 0;
    let byteOffset = 0;
    for (let i = 0; i < rowCnt; i++) {
      for (let patternIdx = 0; patternIdx < pattern.length; patternIdx++) {
        const { count, bytesPerElement } = pattern.getPiece(patternIdx);
        const view = pattern.getView(patternIdx, arrayBuffer);

        for (let j = 0; j < count; j++) {
          view[byteOffset / bytesPerElement] = vertices[arrIdx];
          byteOffset += bytesPerElement;
          arrIdx++;
        }
      }
    }
  }

  get count() {
    return this.rowCnt;
  }
  get buffer() {
    return this._buffer;
  }
  get data() {
    return this.arrayBuffer;
  }
  get patternLength() {
    return this.pattern.length;
  }

  getKey(idx: number) {
    return this.pattern.getPiece(idx).key;
  }
  getPointerProps(idx: number) {
    const { pattern } = this;
    const { count, dataType, bytesPerElement, key } = pattern.getPiece(idx);

    return {
      key,
      count,
      type: WebGLRenderingContext[dataType],
      patternBytes: count * bytesPerElement,
    };
  }
}

export default GLBuffer;

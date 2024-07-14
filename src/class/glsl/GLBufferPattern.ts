import type { BufferPattern } from "@/types/glsl";
import { getBytesPerElement, getView } from "@/lib/utils/glsl/buffer";

export type GLBufferPatternPiece = BufferPattern & {
  bytesPerElement: number;
  view: InstanceType<ReturnType<typeof getView>> | null;
};
class GLBufferPattern {
  private _count = 0;
  private _totalBytes = 0;
  private pattern: GLBufferPatternPiece[] = [];
  constructor(private _pattern: BufferPattern[]) {
    this.init();
  }
  private init() {
    const { pattern } = this;

    let offset = 0;
    for (let i = 0; i < this._pattern.length; i++) {
      const { type, count } = this._pattern[i];
      const bytesPerElement = getBytesPerElement(type);
      this._count += count;
      this._totalBytes += bytesPerElement * count;
      offset += this._totalBytes;

      pattern[i] = {
        ...this._pattern[i],
        bytesPerElement,
        view: null,
      };
    }
  }

  get count() {
    return this._count;
  }
  get totalBytes() {
    return this._totalBytes;
  }
  get length() {
    return this.pattern.length;
  }

  getView(idx: number, arrayBuffer: ArrayBuffer) {
    const { pattern } = this;
    const { type } = pattern[idx];

    if (pattern[idx].view === null) {
      const constructor = getView(type);
      pattern[idx].view = new constructor(arrayBuffer);
    }
    return pattern[idx].view;
  }
  getPiece(idx: number) {
    const { pattern } = this;
    return pattern[idx];
  }
}

export default GLBufferPattern;

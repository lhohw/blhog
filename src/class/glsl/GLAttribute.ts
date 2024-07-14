import GLBuffer from "./GLBuffer";

class GLAttribute {
  private indices = new Map<string, number>();
  constructor(
    private program: WebGLProgram,
    private buffer: GLBuffer,
  ) {}
  setAttributes(gl: WebGLRenderingContext) {
    this.linkAttribute(gl);
    this.pointAttribute(gl);
  }

  private linkAttribute(gl: WebGLRenderingContext) {
    const { program, buffer, indices } = this;
    for (let i = 0; i < buffer.patternLength; i++) {
      const key = buffer.getKey(i);
      const index = gl.getAttribLocation(program, key);

      indices.set(key, index);
      gl.enableVertexAttribArray(index);
    }
  }
  private pointAttribute(gl: WebGLRenderingContext) {
    const { indices, buffer } = this;

    let offset = 0;
    for (let i = 0; i < buffer.patternLength; i++) {
      const { key, count, type, patternBytes } = buffer.getPointerProps(i);
      const index = indices.get(key);

      if (index === undefined) throw new Error("invalid attribute");

      gl.vertexAttribPointer(
        index,
        count,
        type,
        type !== WebGLRenderingContext["FLOAT"],
        buffer.totalBytesPerRow,
        offset,
      );

      offset += patternBytes;
    }
  }
}

export default GLAttribute;

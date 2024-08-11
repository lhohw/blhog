import { getAttributeConstFunction } from "@/lib/utils/glsl/attribute";

class GLAttributes<A extends readonly string[] = readonly string[]> {
  private attributes: Record<A[number], GLAttributeElement>;
  constructor(
    private gl: WebGLRenderingContext,
    program: WebGLProgram,
    private attributeKeys: A,
  ) {
    this.attributes = attributeKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: new GLAttributeElement(gl, program, key),
      }),
      {} as typeof this.attributes,
    );
  }
  index(key: A[number]) {
    const { attributes } = this;
    return attributes[key].index;
  }
  enable(key: A[number]) {
    const { attributes } = this;
    return attributes[key].enable();
  }
  disable(key: A[number]) {
    const { attributes } = this;
    return attributes[key].disable();
  }
  setAttributeConst(key: A[number], value: Float32List) {
    const { gl } = this;
    const index = this.index(key);
    const setter = getAttributeConstFunction(gl, value);
    setter(index, value);
  }
}

class GLAttributeElement {
  private _index: number | null = null;
  private state = false;
  constructor(
    private gl: WebGLRenderingContext,
    program: WebGLProgram,
    private key: string,
  ) {
    const index = gl.getAttribLocation(program, key);
    this._index = index;
    this.enable();
  }

  get index() {
    const { _index } = this;
    if (_index === null) {
      throw new Error(`index not initialized for ${this.key}`);
    }

    return _index;
  }

  get isEnabled() {
    return this.state === true;
  }

  disable() {
    const { gl, index, state } = this;
    if (!state) return;

    gl.disableVertexAttribArray(index);
    this.state = false;
  }

  enable() {
    const { gl, index, state } = this;
    if (state) return;

    gl.enableVertexAttribArray(index);
    this.state = true;
  }
}

export default GLAttributes;

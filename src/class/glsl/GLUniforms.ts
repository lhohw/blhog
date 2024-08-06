import type { UniformType } from "@/types/glsl";
import { getUniformFunction } from "@/lib/utils/glsl/uniform";

class GLUniforms<U extends readonly string[] = readonly string[]> {
  private uniforms: Record<U[number], GLUniformElement>;
  constructor(
    private gl: WebGLRenderingContext,
    program: WebGLProgram,
    private uniformKeys: U,
  ) {
    this.uniforms = uniformKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: new GLUniformElement(gl, program, key),
      }),
      {} as typeof this.uniforms,
    );
  }

  index(key: U[number]) {
    const { uniforms, uniformKeys } = this;
    if (!uniformKeys.includes(key))
      throw new Error(`uniform [ ${key} ] not defined`);

    return uniforms[key].index;
  }

  setUniform(key: U[number], type: UniformType, values: number[]) {
    const { gl } = this;
    const uniformSetter = getUniformFunction(gl, type);
    const index = this.index(key);
    uniformSetter(index, values);
  }
}

class GLUniformElement {
  constructor(
    private gl: WebGLRenderingContext,
    private program: WebGLProgram,
    private key: string,
  ) {}

  get index() {
    const { gl, program, key } = this;
    return gl.getUniformLocation(program, key);
  }
}

export default GLUniforms;

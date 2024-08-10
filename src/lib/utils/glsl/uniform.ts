import { UniformType } from "@/types/glsl";

export const getUniformFunction = (
  gl: WebGLRenderingContext,
  type: UniformType,
) => {
  if (!type.endsWith("v")) type += "v";

  const f = getUniformSetter(gl, type);
  return f as (
    location: WebGLUniformLocation | null,
    values: Float32List,
  ) => void;
};

export const getUniformSetter = (
  gl: WebGLRenderingContext,
  type: UniformType,
): any => {
  switch (type) {
    case "1i":
      return gl.uniform1i.bind(gl);
    case "1iv":
      return gl.uniform1iv.bind(gl);
    case "1f":
      return gl.uniform1f.bind(gl);
    case "1fv":
      return gl.uniform1fv.bind(gl);
    case "2i":
      return gl.uniform2i.bind(gl);
    case "2iv":
      return gl.uniform2iv.bind(gl);
    case "2f":
      return gl.uniform2f.bind(gl);
    case "2fv":
      return gl.uniform2fv.bind(gl);
    case "3i":
      return gl.uniform3i.bind(gl);
    case "3iv":
      return gl.uniform3iv.bind(gl);
    case "3f":
      return gl.uniform3f.bind(gl);
    case "3fv":
      return gl.uniform3fv.bind(gl);
    case "4i":
      return gl.uniform4i.bind(gl);
    case "4iv":
      return gl.uniform4iv.bind(gl);
    case "4f":
      return gl.uniform4f.bind(gl);
    case "4fv":
      return gl.uniform4fv.bind(gl);
    default: {
      throw new Error("invalid key" + type);
    }
  }
};

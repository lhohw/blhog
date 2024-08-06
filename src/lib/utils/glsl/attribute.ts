export const getAttributeConstFunction = (
  gl: WebGLRenderingContext,
  values: Float32List
): any => {
  const count = values.length;
  const key = `${count}f${isFloatArray(values) ? "v" : ""}`;

  switch (key) {
    case "1f":
      return gl.vertexAttrib1f.bind(gl);
    case "1fv":
      return gl.vertexAttrib1fv.bind(gl);
    case "2f":
      return gl.vertexAttrib2f.bind(gl);
    case "2fv":
      return gl.vertexAttrib2fv.bind(gl);
    case "3f":
      return gl.vertexAttrib3f.bind(gl);
    case "3fv":
      return gl.vertexAttrib3fv.bind(gl);
    case "4f":
      return gl.vertexAttrib4f.bind(gl);
    case "4fv":
      return gl.vertexAttrib4fv.bind(gl);
    default: {
      throw new Error("invalid key" + key);
    }
  }
};

const isFloatArray = (values: Float32List) =>
  values instanceof Float32Array || values instanceof Float64Array;

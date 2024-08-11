export const getAttributeConstFunction = (
  gl: WebGLRenderingContext,
  values: Float32List,
): any => {
  const count = values.length;
  const key = `${count}fv`;

  switch (key) {
    case "1fv":
      return gl.vertexAttrib1fv.bind(gl);
    case "2fv":
      return gl.vertexAttrib2fv.bind(gl);
    case "3fv":
      return gl.vertexAttrib3fv.bind(gl);
    case "4fv":
      return gl.vertexAttrib4fv.bind(gl);
    default: {
      throw new Error("invalid key" + key);
    }
  }
};

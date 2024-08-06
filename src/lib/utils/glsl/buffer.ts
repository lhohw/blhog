import type { BufferDataType, BufferType } from "@/types/glsl";

export const getView = (type: BufferType) => {
  switch (type) {
    case "uint8":
      return Uint8Array;
    case "uint8Clamped":
      return Uint8ClampedArray;
    case "int16":
      return Int16Array;
    case "uint16":
      return Uint16Array;
    case "int32":
      return Int32Array;
    case "uint32":
      return Uint32Array;
    case "float32":
      return Float32Array;
    case "float64":
      return Float64Array;
  }

  throw new Error("invalid type");
};

export const arr2view = (array: number[], type: BufferType) => {
  const constructor = getView(type);
  return new constructor(array);
};

export const toDataType = (type: BufferType): BufferDataType => {
  switch (type) {
    case "int8": {
      return "BYTE";
    }
    case "uint8": {
      return "UNSIGNED_BYTE";
    }
    case "uint8Clamped": {
      return "UNSIGNED_BYTE";
    }
    case "int16": {
      return "SHORT";
    }
    case "uint16": {
      return "UNSIGNED_SHORT";
    }
    case "int32": {
      return "INT";
    }
    case "uint32": {
      return "UNSIGNED_INT";
    }
    case "float32": {
      return "FLOAT";
    }
    case "float64": {
      return "FLOAT";
    }
    case "bigint64": {
      return "FLOAT";
    }
    case "biguint64": {
      return "FLOAT";
    }
  }
};
export const getBytesPerElement = (type: BufferType) => {
  return getView(type).BYTES_PER_ELEMENT;
};

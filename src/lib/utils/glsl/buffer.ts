import type { BufferType } from "@/types/glsl";

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
    case "bigint64":
      return BigInt64Array;
    case "biguint64":
      return BigUint64Array;
  }

  throw new Error("invalid type");
};

export const getBytesPerElement = (type: BufferType) => {
  return getView(type).BYTES_PER_ELEMENT;
};

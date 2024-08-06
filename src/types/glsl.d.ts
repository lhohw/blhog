export type BufferType =
  | "int8"
  | "uint8"
  | "uint8Clamped"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32"
  | "float32"
  | "float64"
  | "bigint64"
  | "biguint64";

export type BufferDataType =
  | "BYTE"
  | "UNSIGNED_BYTE"
  | "UNSIGNED_BYTE"
  | "SHORT"
  | "UNSIGNED_SHORT"
  | "INT"
  | "UNSIGNED_INT"
  | "FLOAT";

export type BufferPattern = {
  key: string;
  type: BufferType;
  count: number;
  dataType: BufferDataType;
};

export type ShaderSource = {
  type: "vertex" | "fragment";
  source: string;
};

export type UniformType =
  | "1i"
  | "1iv"
  | "1f"
  | "1fv"
  | "2i"
  | "2iv"
  | "2f"
  | "2fv"
  | "3i"
  | "3iv"
  | "3f"
  | "3fv"
  | "4i"
  | "4iv"
  | "4f"
  | "4fv";

export type AttributeConstType =
  | "1f"
  | "1fv"
  | "2f"
  | "2fv"
  | "3f"
  | "3fv"
  | "4f"
  | "4fv";

export type DrawType = "STATIC_DRAW" | "STREAM_DRAW" | "DYNAMIC_DRAW";

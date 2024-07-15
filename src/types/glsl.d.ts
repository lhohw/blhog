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

export type IntegerBufferType =
  | "int8"
  | "uint8"
  | "uint8Clamped"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32";

export type FloatBufferType = "float32" | "float64";

export type BufferType =
  | IntegerBufferType
  | FloatBufferType
  | "bigint64"
  | "biguint64";

export type IntegerBufferDataType =
  | "BYTE"
  | "UNSIGNED_BYTE"
  | "SHORT"
  | "UNSIGNED_SHORT"
  | "INT"
  | "UNSIGNED_INT";

export type BufferDataType = IntegerBufferDataType | "FLOAT";

export type BufferPattern = {
  itemSize: number;
  index: number;
  bufferType: BufferType;
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

export type TextureSource<U extends readonly string[] = readonly string[]> = {
  key: string;
  uniformKey: U[number];
  src?: string;
  img?: TexImageSource;
  width?: number;
  height?: number;
  index?: number;
  mipmap?: boolean;
  params?: Partial<{
    minFilter: TexParameterFilterValue;
    magFilter: TexParameterFilterValue;
    wrapS: TexParameterWrapValue;
    wrapT: TexParameterWrapValue;
  }>;
};

export type TexParameterFilterValue =
  | "NEAREST"
  | "LINEAR"
  | "NEAREST_MIPMAP_NEAREST"
  | "NEAREST_MIPMAP_LINEAR"
  | "LINEAR_MIPMAP_LINEAR"
  | "LINEAR_MIPMAP_NEAREST";

export type TexParameterWrapValue =
  | "REPEAT"
  | "MIRRORED_REPEAT"
  | "CLAMP_TO_EDGE";

export type IntegerTypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array;
export type FloatTypedArray = Float32Array | Float64Array;
export type TypedArray = FloatTypedArray | IntegerTypedArray;

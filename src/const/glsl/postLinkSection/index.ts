import type { ShaderSource } from "@/types/glsl";
import vertexShaderSource from "./vertex-shader.glsl";
import fragmentShaderSource from "./fragment-shader.glsl";
import GLBufferPattern from "@/class/glsl/GLBufferPattern";

export const shaderSources: ShaderSource[] = [
  {
    type: "vertex",
    source: vertexShaderSource,
  },
  {
    type: "fragment",
    source: fragmentShaderSource,
  },
];

export const vertices = [
  0.0, 0.5, 0.0,

  255, 0, 0, 255,

  0.5, -0.5, 0.0,

  0, 250, 6, 255,

  -0.5, -0.5, 0.0,

  0, 0, 255, 255,
];

export const pattern = new GLBufferPattern([
  {
    key: "aVertexPosition",
    type: "float32",
    count: 3,
    dataType: "FLOAT",
  },
  {
    key: "aVertexColor",
    type: "uint8",
    count: 4,
    dataType: "UNSIGNED_BYTE",
  },
]);

declare module "@mapbox/rehype-prism" {
  const rehypePrism: any;
  export default rehypePrism;
}

declare module "*.glsl" {
  const source: string;
  export default source;
}

declare module "*.vert" {
  const source: string;
  export default source;
}

declare module "*.frag" {
  const source: string;
  export default source;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
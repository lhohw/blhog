precision mediump float;

uniform sampler2D uSampler;

varying vec2 vTexCoords;
varying float vTexAlpha;

void main(){
  vec4 color=texture2D(uSampler,vTexCoords);
  gl_FragColor=vec4(color.rgb,min(color.a,vTexAlpha));
}
attribute vec2 aVertexPosition;
attribute vec2 aTexCoords;
attribute float aTexAlpha;

varying vec2 vTexCoords;
varying float vTexAlpha;

uniform vec2 uResolution;

void main(){
  vTexAlpha=aTexAlpha;
  vTexCoords=aTexCoords;
  gl_Position=vec4(vec2(2.)*aVertexPosition/uResolution.xy-vec2(1.),0.,1.);
}
attribute vec2 aVertexPosition;
attribute vec3 aVertexColor;

varying vec3 vVertexColor;

uniform vec2 uResolution;

void main(){
  vVertexColor=aVertexColor;
  vec2 position=2.*aVertexPosition/uResolution-1.;
  gl_Position=vec4(position.x,-position.y,0.,1.);
  gl_PointSize=.659999;
}

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;

uniform float u_time;
uniform sampler2D u_tex0;

uniform float u_control_a;
uniform float u_control_b;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

// ------------------- FUNCTIONS -------------------------------
#pragma include "../libs/librandom.frag"

#define GRID 24.0
// ------------------- SHADER ----------------------------------
void main(){
  
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  st *= GRID;
  st = floor( st );
  
  float a = rand( st, floor(u_time * 9.0) ); 
  
  gl_FragColor = vec4( u_color_a, a );

}

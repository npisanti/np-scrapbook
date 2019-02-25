
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

varying vec2 st;
uniform vec2 u_resolution;

uniform float u_time;
uniform sampler2D u_tex0;

uniform float u_control_a;
uniform float u_control_b;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

// ------------------- FUNCTIONS -------------------------------
#pragma include "np-fraglib.frag"

// ------------------- SHADER ----------------------------------
void main(){
  
  //vec4 source = texture2D( u_tex0, st ); // for texture access
  //gl_FragColor = source;
  
  gl_FragColor = vec4( u_control_a, 0.0, 0.0, 1.0 );

}

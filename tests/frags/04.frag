
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;

uniform float u_time;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

uniform float u_control_a;
uniform float u_control_b;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

// ------------------- FUNCTIONS -------------------------------
#pragma include "../../libs/libnoise.frag"
#pragma include "../../libs/libshapes.frag"

#define GRID 24.0
// ------------------- SHADER ----------------------------------
void main(){
  
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec2 nt = st;
    nt.x += noise( vec2( 0.0, u_time) )*0.01 ;   
    nt.y += 0.005;
    
    vec4 z1 = texture2D( u_tex1, nt );

    float s = poly_sdf( st, 3 );
    float a = stroke( s, 0.2, 0.1 );
    vec4 color = vec4( u_color_a * a, 1.0 );

    color += z1 * 0.96;
    color.a = 1.0;

    gl_FragColor = color;

}

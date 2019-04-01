
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
#pragma include "../../libs/libshapes.frag"

// ------------------- SHADER ----------------------------------
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float ratio = u_resolution.x / u_resolution.y; 
    vec2 coord = vec2( st.x * ratio, st.y );
    
    float a = stroke( circle_sdf( coord ), 0.7, 0.2);
    
    float undef;
    a *= undef; 

    gl_FragColor = vec4( u_color_a, a );
}

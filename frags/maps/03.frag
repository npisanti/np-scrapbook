
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

varying vec2 st;

#pragma include "../../libs/libnoise.frag"
#pragma include "../../libs/libshapes.frag"

void main(){

    float u_plane = u_time * 0.0;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    float ratio = u_resolution.x / u_resolution.y;
    st.x *= ratio;
    st.y += u_time * 0.03;

    float no = noise( vec3( st*2.1, u_plane ) ) * 0.7 
             + noise( vec3( st*4.0, u_plane ) ) * 0.27
             + noise( vec3( st*30., u_plane ) ) * 0.03;
    
    float w = 0.018;
    
    vec3 color_a = vec3( 0.8, 0.25, 0.1 );
    vec3 color_b = vec3( 1.0, 0.2, 0.2 );
    
    vec3 land = vec3( 0.0 );
    land += color_a * stroke( no, 0.1, w ) * 0.5; 
    land += color_a * stroke( no, 0.20, w ) * 0.75; 
    land += color_b * stroke( no, 0.30, w ) * 0.9; 
    land += color_b * stroke( no, 0.40, w ); 

    gl_FragColor = vec4( land, 1.0 );

}

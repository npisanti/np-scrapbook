
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_tex0;

#include "../../libs/libnoise.frag"
#include "../../libs/libshapes.frag"

void main(){

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    float ratio = u_resolution.x / u_resolution.y;
    st.x *= ratio;
    
    st.y += u_time*0.03;

    float no = noise( vec2( st*1.0 ) ) * 0.34 
             + noise( vec2( st*2.0 ) ) * 0.6
             + noise( vec2( st*10. ) ) * 0.04
             + noise( vec2( st*30. ) ) * 0.01
             + noise( vec2( st*200.) ) * 0.01;
   
    float w = 0.01;
    
    vec3 color = vec3( 1.0 );
    
    vec3 land = vec3( 0.0 );
    land += color * stroke( no, 0.15, w ) * 0.5; 
    land += color * stroke( no, 0.30, w ) * 0.75; 
    land += color * stroke( no, 0.45, w ); 
    land += color * stroke( no, 0.60, w ) * 1.25; 
    land += color * stroke( no, 0.75, w ) * 1.5; 

    gl_FragColor = vec4( land, 1.0 );

}

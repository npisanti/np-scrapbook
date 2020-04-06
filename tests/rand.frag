
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_tex0;

#include "../../libs/librandom.frag"

void main(){

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float ratio = u_resolution.x / u_resolution.y;
    
    st.x *= ratio;
    
    st *= 24.0;
    st = floor( st );
    
    float r = rand( st, 2.0 );
    r = step( 0.5, r );
    
    gl_FragColor = vec4( vec3(1.0), r );

}

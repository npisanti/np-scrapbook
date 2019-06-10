
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
#pragma include "../libs/liblfo.frag"

// ------------------- SHADER ----------------------------------
void main(){
  
    vec2 st = gl_FragCoord.xy/u_resolution;

    //float ratio = u_resolution.x / u_resolution.y;
    //st.x *= ratio;

    //vec4 source = texture2D( u_tex0, st ); // for texture access
    //gl_FragColor = source;
    float band =  abs( fract( fract(st.x*2.0) + u_time*0.2) * 2.0 -1.0 );
    
    //float band = sin( fract( fract(st.x*4.0) + u_time*0.2) * TWO_PI );
    gl_FragColor = vec4( 1.0, band*0.4, 0.0, 1.0 );

}

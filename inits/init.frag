
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
#pragma include "../libs/libshapes.frag"
//#pragma include "../libs/liblfo.frag"
//#pragma include "../libs/librandom.frag"
//#pragma include "../libs/libnoise.frag"
//#pragma include "../libs/libeasing.frag"

// ------------------- SHADER ----------------------------------
void main(){
  
    vec2 st = gl_FragCoord.xy/u_resolution;

    //float ratio = u_resolution.x / u_resolution.y;
    //st.x *= ratio;

    //vec4 source = texture2D( u_tex0, st ); // for texture access
    //gl_FragColor = source;

    gl_FragColor = vec4( u_control_a, 0.0, 0.0, 1.0 );

}

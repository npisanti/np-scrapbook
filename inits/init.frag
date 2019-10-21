
#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;

// ------------------- FUNCTIONS -------------------------------


// ------------------- SHADER ----------------------------------
void main(){
  
    vec2 st = gl_FragCoord.xy/u_resolution;

    //float ratio = u_resolution.x / u_resolution.y;
    //st.x *= ratio;

    //vec4 source = texture2D( u_tex0, st ); // for texture access
    //gl_FragColor = source;

    gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );

}

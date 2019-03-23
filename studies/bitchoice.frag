
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;

// ------------------- SHADER ----------------------------------
void main(){
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float val = st.x;

    float index = floor( st.y*6.0 );

    float bitsel = pow( 2.0, index );

    float choice = step( 0.5, fract( val * bitsel ) );


    gl_FragColor = vec4( vec3(1.0), choice );

}


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
varying vec2 st;

float rand(vec2 st, float t){
    return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453);
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float rat = u_resolution.x / u_resolution.y;

    float nox = rand( st, 0.0 ) - 0.5;
    float noy = rand( st, 1.0 ) - 0.5;

    float pct = 0.002;
    st.x -= pct * nox ;
    st.y -= pct * noy * rat - 0.0025;

    float decay = 0.001;
    st.y -= decay;
    st.x -= decay*0.4;

    vec4 source = texture2D( u_tex0, st );

    vec4 z1 = texture2D( u_tex1, st );
    
    vec4 color = source*0.99;
    
    color.a = min( color.a, 1.0 );
    
    gl_FragColor =  color;
}

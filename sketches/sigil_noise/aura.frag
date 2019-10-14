
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
varying vec2 st;

float rand(vec2 st, float t){
    return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453);
}

// variables : -------------
uniform float u_feedback;
uniform vec3 u_background;
// -------------------------

void main (void) {
    
    vec2 st = gl_FragCoord.xy/u_resolution;
    float rat = u_resolution.x / u_resolution.y;

    vec2 pos = st*50.0;

    float nox = rand( pos, u_time ) - 0.5;
    float noy = rand( pos+1.0, u_time ) - 0.5;

    float pct = 0.02;
    st.x -= pct * nox;
    st.y -= pct * noy * rat;

    vec4 source = texture2D( u_tex0, st );

    vec3 color = source.rgb*u_feedback + u_background*(1.0-u_feedback);

    gl_FragColor = vec4( color, 1.0 );
}

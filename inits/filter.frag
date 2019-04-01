
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

uniform sampler2D u_tex0;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec4 source = texture2D( u_tex0, st );
    gl_FragColor = vec4( st.x*0.2, source.g, source.b, 1.0 ); 
    // source.a
}

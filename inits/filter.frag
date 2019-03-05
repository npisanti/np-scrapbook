
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;
varying vec2 st;

void main (void) {
    vec4 source = texture2D( u_tex0, st );
    gl_FragColor = vec4( source.r*0.25, source.r*1.0, source.r*0.25, source.a );
}

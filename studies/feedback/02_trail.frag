
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
varying vec2 st;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    vec4 source = texture2D( u_tex0, st );
    vec4 z1 = texture2D( u_tex1, vec2(st.x, st.y+0.01) );
    
    vec4 color = source + z1*0.85;
    
    color.a = min( color.a, 1.0 );
    
    gl_FragColor = color;
}


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
varying vec2 st;

uniform vec3 u_color_a;
uniform vec3 u_color_b;

void main (void) {
    
    float offset = step( 0.9, fract(u_time) ) * step( 0.7, fract(u_time*1.27) ) * 0.15;
    
    vec4 source = texture2D( u_tex0, st );
    vec4 left = texture2D( u_tex0, vec2(st.x - offset, st.y) );
    vec4 right = texture2D( u_tex0, vec2(st.x + offset, st.y) );
    
    vec4 color = source;
    
    vec4 extra = vec4(0.0);
    extra += vec4( u_color_a.r*left.a, u_color_a.g*left.a, u_color_a.b*left.a, left.a )*2.0;
    extra += vec4( u_color_b.r*right.a, u_color_b.g*right.a, u_color_b.b*right.a, right.a )*2.0;
    
    color = mix( extra, color, step(0.01, color.a ) );
    
    
    vec4 feedback = texture2D( u_tex1, vec2(st.x, st.y+0.0025) );
    
    gl_FragColor = color*0.2+ feedback*0.9;
    //gl_FragColor = color;
}

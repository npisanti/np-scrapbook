
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;

uniform vec3 u_color_a;
uniform vec3 u_color_b;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution;
        
    float offset = step( 0.95, fract(u_time) ) * step( 0.37, fract(u_time*1.57) ) * 0.035;
    
    vec4 source = texture2D( u_tex0, st );
    vec4 left = texture2D( u_tex0, vec2(st.x - offset, st.y) );
    vec4 right = texture2D( u_tex0, vec2(st.x + offset, st.y) );
    
    vec4 color = source;
    
    vec4 extra = vec4( left.r*u_color_a.r, left.g*u_color_a.g, left.b*u_color_a.b, left.a );
    extra += vec4( right.r*u_color_b.r, right.g*u_color_b.g, right.b*u_color_b.b, right.a );
    
    color = mix( extra, color, step(0.01, color.a ) );
    
    gl_FragColor = color;
}

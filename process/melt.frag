
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

uniform sampler2D u_tex0;

#pragma include "../libs/libnoise.frag"
#pragma include "../libs/liblfo.frag"

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float pct = lfo_ramp( 0.25 );
    
    pct *= pct;
    pct *= pct;
    
    float no = noise( vec2(st.x*60.0, st.y) );
    no += 1.0;
    no *= 0.5;
    
    st.y -= pct * no;
    
    vec4 source = texture2D( u_tex0, st );
    
    gl_FragColor = source; 
    // source.a
}

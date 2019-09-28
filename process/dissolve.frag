
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
    
    float pct = lfo_tri( 0.5 );
    
    pct *= pct;
    pct *= pct;
    
    pct *= 0.4;
    
    vec2 pos = vec2(st.x, st.y)*50.0;
    float nox = noise( vec3(pos, 0.0 ) );
    float noy = noise( vec3(pos, 1.0 ) );
    
    st.x -= pct * nox;
    st.y -= pct * noy;
    
    vec4 source = texture2D( u_tex0, st );
    
    gl_FragColor = source; 
    // source.a
}

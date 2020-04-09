
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
    
	float u_amount = 0.0001;
    float u_granularity = 30.0;
    
    float t = u_time * 0.2;
    vec2 pos = vec2(st.x, st.y)*u_granularity;
    
    float nox = noise( vec3(pos, t ) );
    float noy = noise( vec3(pos, t+1.) );
    
    st.x -= u_amount * nox;
    st.y -= u_amount * noy;
    
    vec4 source = texture2D( u_tex0, st );
    
    gl_FragColor = source; 

}

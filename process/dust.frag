
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

uniform sampler2D u_tex0;

float lfo_tri(  in float speed ){ return abs( (fract(u_time*speed) * 2.0) - 1.0 ); }

float rand(vec2 st, float t){
    return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453);
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float pct = lfo_tri( 0.15 );
    
    pct *= pct;
    pct *= pct;
    
    vec2 pos = vec2(st.x, st.y)*50.0;
    
    //float nox = rand( pos, u_time * 1.2 ) - 0.5;
    //float noy = rand( pos, u_time ) - 0.5;
    
    float nox = rand( pos, 1.0 ) - 0.5;
    float noy = rand( pos, 2.0 ) - 0.5;
    
    pct *= 0.4;
    
    st.x -= pct * nox;
    st.y -= pct * noy;
    
    vec4 source = texture2D( u_tex0, st );
    
    gl_FragColor = source; 

}

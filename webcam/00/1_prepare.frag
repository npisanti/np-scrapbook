
#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
varying vec2 st;


void main (void) {
    float low = 0.3;
    float high = 0.7;
    
    vec4 source = texture2D( u_tex0, st );
    float luminance = source.r*0.299 + source.g*0.587 + source.b*0.114;	
    
    float range = high - low;
    float remapped = luminance - low;
    remapped = max( 0.0, remapped );
    remapped = min( remapped, range );
    remapped = remapped / range;
    
    float reduce = 0.25;
    float top = 0.05;
    float blur = 0.02;

    float gate = smoothstep(reduce-blur, reduce, st.x) * smoothstep(1.0-reduce+blur, 1.0-reduce, st.x ) * smoothstep( top-blur, top, st.y);

    gl_FragColor = vec4( vec3(1.0), remapped * gate );
}


#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
varying vec2 st;

#pragma include "../../libs/librandom.frag"

float square( vec2 st, float side, float width ){
    side = 0.5 - side;
    float outer = step( side, st.x ) * step( side, st.y ) * step( st.x, 1.0-side ) * step( st.y, 1.0-side );
    side += width;
    float inner = step( side, st.x ) * step( side, st.y ) * step( st.x, 1.0-side ) * step( st.y, 1.0-side );
    
    
    //outer = step( st.y, 1.0-side );
    // * step( st.x, 1.0-side ) * step( st.y, 1.0-side );
    return outer - inner;
}

void main (void) {
    
    float low = 0.05;
    float high = 0.2;
    
    vec2 t;
    float invx = step( 0.5, st.x );
    t.x = mix( st.x, 1.0 - st.x, invx );
    t.y = st.y;    

    vec4 source = texture2D( u_tex0, t );

    float luminance = source.r*0.299 + source.g*0.587 + source.b*0.114;	
    
    float range = high - low;
    float remapped = luminance - low;
    remapped = max( 0.0, remapped );
    remapped = min( remapped, range );
    remapped = remapped / range;
    
    float reduce = 0.05;
    float top = 0.05;
    float blur = 0.02;

    float gate = smoothstep(reduce-blur, reduce, st.x) * smoothstep(1.0-reduce+blur, 1.0-reduce, st.x ) * smoothstep( top-blur, top, st.y);

    float hands = remapped * gate;

    float squares = 0.0;
    for (int i=0; i<4; ++i ){
        float ind = float(i)*2.0;
        vec2 off = vec2( rand(ind, u_time), rand(ind+1.0, u_time) ) * 0.04;
        squares += square( st+ off, 0.030, 0.004 );
    }
    squares = min( squares, 1.0 );
    
    float result = mix( squares, hands, step(0.01, hands) );
    
    result = hands;
    
    gl_FragColor = vec4( vec3(1.0), result );
}


#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
varying vec2 st;

uniform vec3 u_color_a;

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
    float high = 0.3;

    vec2 downreso = vec2( 120, 80 );
    vec2 pt = floor( st * downreso ) / downreso;

    vec4 source = texture2D( u_tex0, pt );

    float luminance = source.r*0.299 + source.g*0.587 + source.b*0.114;	
    
    float range = high - low;
    float remapped = luminance - low;
    remapped = max( 0.0, remapped );
    remapped = min( remapped, range );
    remapped = remapped / range;
    
    float reduce = 0.15;
    float top = 0.05;
    float blur = 0.02;

    float gate = smoothstep(reduce-blur, reduce, st.x) * smoothstep(1.0-reduce+blur, 1.0-reduce, st.x ) * smoothstep( top-blur, top, st.y);

    float hands_alpha = remapped * gate;
    
    // -------- end hands processing --------------
    
    float pulse = step( 0.5, fract(u_time) ) * step( 0.7, fract(u_time*1.27) );
    

    float squares = 0.0;
    for (int i=0; i<4; ++i ){
        float ind = float(i)*2.0;
        vec2 off = (vec2( rand(ind, u_time), rand(ind+1.0, u_time) ) -0.5) * 0.08*pulse;
        squares += square( st+ off, 0.030, 0.004 );
    }
    squares = min( squares, 1.0 );
    
    float statics = rand( st, u_time );
    
    vec3 hands_color = mix( vec3(1.0), u_color_a, pulse );
    hands_alpha *= (1.0-pulse*statics);
    vec4 hands = vec4( hands_color, hands_alpha );
    
    vec4 squares_render = vec4( vec3(1.0), squares );
    
    gl_FragColor = mix( squares_render, hands, step(0.01, hands_alpha) );
}

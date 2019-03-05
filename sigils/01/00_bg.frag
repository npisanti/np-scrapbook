
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_color_b;

#pragma include "../../libs/libshapes.frag"
#pragma include "../../libs/librandom.frag"
#pragma include "../../libs/libnoise.frag"

const float aa = 0.005;

float rangrid( vec2 st, float cols, float rows ){
    vec2 grid = floor( vec2(st.x * cols, st.y * rows) );
    float r = rand( grid, u_time );
    r = floor( r*4.99999 ) * 0.25;
    return r;
}

float rectjit( vec2 st ){

    float xb = 2.0;
    float xb_jitter = 10.0;
    float yb = 24.0;
    float yb_jitter = 10.0;
    float density = 0.2;

    // mult grids    
    float t0 = rangrid( st, xb + rand(0., u_time)*xb_jitter, yb + rand(1., u_time) * yb_jitter );
    t0 = step( t0, density );
    float t1 = rangrid( st, xb + rand(2., u_time)*xb_jitter, yb + rand(3., u_time) * yb_jitter );
    t1 = step( t1, density);
    
    return t0 * t1;
}

void main(){
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 dt = rotated( st, PI * 0.05 );

    float t;

    // noise bands
    float t0 = noise( vec2( dt.y*4.0, u_time ) );
    t0 = step( 0.4, t0 );
    
    // classic static
    float dust = rand( st, u_time ); 
    dust = map( dust, 0.9, 1.0, 0.0, 1. );
    
    // scanlines y
    float t10 = step( 0.5, fract( st.y * u_resolution.y*0.25) );
    
    float t11 = rectjit( dt );

    t = t11*t0 + dust;

    t = min( t, 1.0 );
    
    float a = t * 0.4;
    
    vec3 color = vec3( 1.0, 0.5, 0.28 );
    vec3 white = vec3( 1.0 );
    gl_FragColor = vec4( u_color_b, a);  
      
}

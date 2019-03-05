
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#pragma include "../../libs/libshapes.frag"
#pragma include "../../libs/libnoise.frag"
#pragma include "../../libs/librandom.frag"
#pragma include "../../libs/liblfo.frag"

const float aa = 0.005;

float polymoire( vec2 st, int N, float spacing, float fatness, float speed ){
    vec2 rot = rotated( st, u_time*speed);
    float s0 = poly_sdf( rot, N );
    float t = stroke( fract( s0*spacing), .5, fatness, aa );
    return t;
}


float rangrid( vec2 st, float cols, float rows ){
    vec2 grid = floor( vec2(st.x * cols, st.y * rows) );
    float r = rand( grid, u_time );
    r = floor( r*4.99999 ) * 0.25;
    return r;
}


float expband( float coord, float num ) {
    float pos = coord - u_time*0.25;
    
    //float t = abs(fract( pos*num )*2.0 -1.0); // triangle
    float t = (sin( fract(pos*num)*TWO_PI ) + 1.0) * 0.5; // sine
    
    return t*t*t; // for slimmer bands multiply more times
}


float noisegrid( vec2 st ){
                        // num  * density
    float x = floor(st.x * 48.) * 8.0; 
    float y = floor(st.y * 48.) * 8.0;
    float r = noise( vec3( x, y, u_time*0.5 ) );
    
    r = map( r, 0.0, 0.6, 0.0, 1.0 );
    //r = floor( r*4.99999 ) * 0.25;
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

    // tiling
    //st *= 4.0;
    //st = fract(st);

    // warp coord-----------------density--------speed---amount
    float nx = st.x + noise(vec2(st.x*5.0, u_time*0.2)) * 0.3;
    //st.x = nx;

    float sx = st.x + rand(st.y, 0.0)*0.1;
    //st.x = sx;

    vec2 dt = rotated( st, PI * 0.05 );


    float t;

    // noise bands
    float t0 = noise( vec2( dt.y*4.0, u_time ) );
    t0 = step( 0.4, t0 );
    
    // lines 
    float t1 = rand( st.y*u_resolution.y*0.5, u_time );
    t1 = step( 0.95, t1 );
    
    float t2 = rangrid( st, 3., 6.);
    float t3 = polymoire( st+0.5, 8, 43.0, 0.25, 0.2 );
    float t4 = polymoire( st-0.5, 11, 43.0, 0.25, 0.2 );
    float t5 = expband( st.x, 6.0 );
    float t6 = noisegrid( st );
    
    // classic static
    float dust = rand( st, u_time ); 
    dust = map( dust, 0.9, 1.0, 0.0, 1. );
    //dust = step( 0.8 , dust );
        
    float t8 = fract( st.x * 21. );
    float t9 = fract( dt.x * (25.0 + sin(u_time)*5.0) );
    
    // scanlines y
    float t10 = step( 0.5, fract( st.y * u_resolution.y*0.25) );
    
    float t11 = rectjit( dt );

    //t = t11*t0 + t3*t4*0.3;
    t = t11*t0 + dust;
    //t = t0 + t1 - 2.0*t0*t1;
    //t = flip( t2, t3);
    //t = t*t*t*t*t*t;
    t = min( t, 1.0 );
    
    //float s = stroke( circle_sdf(vec2(st.x-0.1, st.y)), 0.6, 0.2, aa );

    //float a = t + s - 2.0*t*s; // invert by shape s
    float a = t * 0.9;
    
    
    vec3 color = vec3( 1.0, 0.5, 0.28 );
    vec3 white = vec3( 1.0 );
    gl_FragColor = vec4( white, a);  
      
}

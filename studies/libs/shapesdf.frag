
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#include "libsdf.frag"
#include "np-random.frag"
#include "np-lfo.frag"

const float aa = 0.005;


void main(){
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse.xy/u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // tiling (goes before translations)  
    //st *= 4.0;
    //st = fract(st);    
   
    // to translate you subtract
    //st -= (mouse-0.5);
    //st -= 0.5; // centers the graphics

    // to rotate you use rotated( st, radians )
    //st = rotated( st, u_time );

    // random jitter
    //st += vec2( rand(0.0f, u_time), rand(0.1f, u_time) )*0.015;
    
    //float s = 0.0;
    //s = min( s, 1.0 ); // corrects sum


    //st.x = flip(st.x,step(.5,st.y));
    vec2 offset = vec2(0.05, 0.0);
    float s0 = rhomb( st - offset );
    float s1 = rhomb( st + offset );


    //s =  bridge(color, right, .4,.075);
    
    //s = rhomb( st );
    
    //s = fract( s*( 1.0 + lfo_tri( 0.25 )*2.0 ));
    
    //s = stroke( s, 0.5, 0.2 );
     

    // black when the two shapes overlap
    //float poly = shape_line( st - 0.5 + mouse, 5, 0.2, 0.03 );
    
    
    float g = gate( s0, .5, .1, aa );
    g = bridge( g, s1, .5, .1, aa );


    //vec3 color = vec3( (stroke( s0, fract(u_time*0.5)*3., .3, aa)) );

    vec3 color = vec3(g);

    // radial subsection
    //s *= arc( st, 0.0, lfo_tri( 0.3 )*TWO_PI );


    // invert
    //s = 1.0 - s;
    
    // noise texture
    //s *=rand( st, u_time );
    
    //vec3 color = vec3 (1.0, 0.2, 0.2) * s;
    gl_FragColor = vec4(color,1.0);
    
}

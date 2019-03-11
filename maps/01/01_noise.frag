
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform float u_control_b;

uniform sampler2D u_tex0;

varying vec2 st;

#pragma include "../../libs/libnoise.frag"
#pragma include "../../libs/libshapes.frag"

void main(){

    float ratio = u_resolution.x / u_resolution.y;
    vec2 str = st;
    str.x *= ratio;
    str.y += u_time*0.03;

    float no = noise( vec2( str*1.0 ) ) * 0.34 
             + noise( vec2( str*2.0 ) ) * 0.6
             + noise( vec2( str*10. ) ) * 0.04
             + noise( vec2( str*30. ) ) * 0.01
             + noise( vec2( str*200.) ) * 0.01;
   
    float w = 0.01;
    
    vec3 color = vec3( 0.0 );
    color += u_color_b * stroke( no, 0.15, w ) * 0.5; 
    color += u_color_b * stroke( no, 0.30, w ) * 0.75; 
    color += u_color_b * stroke( no, 0.45, w ); 
    color += u_color_b * stroke( no, 0.60, w ) * 1.25; 
    color += u_color_b * stroke( no, 0.75, w ) * 1.5; 

    gl_FragColor = vec4( color, 1.0 );

}

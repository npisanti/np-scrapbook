
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

varying vec2 st;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;

uniform float u_control_a;
uniform float u_control_b;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

// ------------------- FUNCTIONS -------------------------------
#pragma include "np-fraglib.frag"

// ------------------- SHADER ----------------------------------
void main(){
    float ratio = u_resolution.x / u_resolution.y; 
    vec2 coord = vec2( st.x * ratio, st.y );

    //coord *= 14.0;
    //coord = fract(t);

    float a;
    
    // ---- triangle, circle, square ----
    // a = stroke( tri_sdf( coord ), 0.5, 0.05);
    //a = stroke( poly_sdf( coord, 3 ), 0.3, 0.05);
    a = stroke( circle_sdf( coord ), 0.5, 0.1, 0.005);
    //a = stroke( rect_sdf( coord, vec2( 1.0 ) ), 0.5, 0.05);

    // ---- other shapes ----
    //a = stroke( rect_sdf( coord, vec2( 0.5, 1.0 ) ), 0.5, 0.05 );
    //a = stroke( hex_sdf( coord ), 0.5, 0.05);
    //a = stroke( rhomb_sdf( coord ), 0.5, 0.05);
    //a = stroke( poly_sdf( coord, 9 ), 0.5, 0.05);
    //a = stroke( vesica_sdf( coord, 0.3 ), 0.5, 0.1);
    
    //a = stroke( spiral_sdf( coord, 0.2 ), 0.5, 0.05);
    //a = stroke( rays_sdf( coord, 6 ), 0.5, 0.1);
    
    //a = stroke( cross_sdf( coord, 0.8 ), 0.5, 0.1);
    //a = stroke( star_sdf( coord, 6, 0.1 ), 0.5, 0.1);
    //a = stroke( flower_sdf( coord, 6 ), 0.3, 0.1);

    
    gl_FragColor = vec4( u_color_a, a );
}

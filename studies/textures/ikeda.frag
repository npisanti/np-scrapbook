// Author Nicola Pisanti ( npisanti.com ) - 2018

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color_a;
uniform float u_control;

float rand(vec2 st, float t){
    return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453);
}

float rand( in float i, in float t ){
    return fract(sin(dot( vec2(i, t), vec2(12.9898,78.233))) * 43758.5453);
}
// ikeda like shader made studying The Book of Shaders
// it is also an example for tiling
// and for getting coordinates for random

// changing this will change the speed of the different lines
const float id = 7.0;
//const float threshold = 0.4;

#define slider st.x
#define row st.y

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float threshold = 1.0-u_control;

	// for tiling you simply multiply the coordinates for an index
	slider *= 120.0; // cols
	row *= 7.0;  // rows
 
	// get direction multiplier
	float dir = step( mod(row, 2.0), 0.9999 );
	dir *= 2.0;
	dir -= 1.0;
	
	// offset x before getting the indices for the bars
	slider+= dir*u_time*(80.0*rand( floor(row), id ) + 5.0);

	// draw each tile to make the bars
	vec2 i_pos = floor( st );
	float ran = rand(i_pos, 1.0);
	float gate = step( threshold, ran);
	ran -= threshold;
	ran /= (1.0-threshold);
    
	gl_FragColor = vec4( vec3(1.0), gate * ran);
}

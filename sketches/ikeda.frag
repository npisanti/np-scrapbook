
// Author Nicola Pisanti ( npisanti.com ) - 2018

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

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
const float threshold = 0.8;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	// for tiling you simply multiply the coordinates for an index
	st.x *= 70.0; // cols
	st.y *= 6.0;  // rows
 
	// get direction multiplier
	float dir = step( mod(st.y, 2.0), 0.9999 );
	dir *= 2.0;
	dir -= 1.0;
	
	// offset x before getting the indices for the bars
	st.x += dir*u_time*(80.0*rand( floor(st.y), id ) + 5.0);

	// draw each tile to make the bars
	vec2 i_pos = floor( st );
	float ran = rand(i_pos, 1.0);
	float gate = step( threshold, ran);
	ran -= threshold;
	ran /= (1.0-threshold);
	vec3 color = vec3 (1.0 );
	
	gl_FragColor = vec4(color, gate * ran);
}

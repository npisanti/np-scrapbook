// Author Nicola Pisanti ( npisanti.com ) - 2018

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#pragma include "np-fraglib.frag"

// Hud exercise
// also example for noise functions
// remember: noise returns a value ranging from -1.0 to 1.0

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	
	// adapts to window ratio
	float ratio = u_resolution.x / u_resolution.y;
	st.x *= ratio;
	st.x -= (ratio-1.0)*0.5; // centers graphics

	vec3 color = vec3 ( 0.1, 0.01, 0.01); // background color
	vec3 fg = vec3 ( 1.0, lfo_tri(0.1)*0.4, 0.1); // triangular lfo

	float c = cross_sdf( rotated( st, PI*0.25 ), 6.0 ) ;	
    c = step ( c, 0.02 );
	color += fg * c;
	
	float r = rect_sdf( st, vec2(0.95));
    r = stroke( r, 0.99, 0.01 );
	color += fg * r;

	for (int i=0; i<3; ++i ){
		float rad = 0.25 + float(i)*0.06;
		// rotation using noise
		float a = noise( vec2(i, u_time*0.1) )*TWO_PI;
        vec2 p = rotated(st, a);
		float ci = circle_sdf( p );
        ci = stroke( ci, rad, 0.1 );
        ci *= arc( p, 0.0, PI*0.75 );
		color += fg * ci * 0.15;
	}
        
	const float offset = 4.6;
	
	for (int i=0; i<4; ++i){
		// xy movement using noise, we need different indices
		float nx = noise( vec2(float(i)*offset,   u_time*0.1) );
		float ny = noise( vec2(float(i+4)*offset, u_time*0.1) );
		vec2 pos = st - vec2( nx*0.35, ny*0.3 );
		//float t = tri_sdf( pos );	
        float t = poly_sdf( pos, 3);	
        t = stroke( t, 0.05, 0.02 );
		color += fg * t;
	}
	
	gl_FragColor = vec4(color, 1.0);
}

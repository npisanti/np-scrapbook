
#ifndef QTR_PI
#define QTR_PI 0.78539816339
#endif
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966192313216916398
#endif
#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif
#ifndef TAU
#define TAU 6.2831853071795864769252867665590
#endif
#ifndef PHI
#define PHI 1.618033988749894848204586834
#endif
#ifndef EPSILON
#define EPSILON 0.0000001
#endif

// --------------------------- MATH ---------------------------------
float usin( in float rad ){	return (sin(rad)*0.5 + 0.5); }
float ucos( in float rad ){	return (cos(rad)*0.5 + 0.5); }

// --------------------------- LFOs ---------------------------------
float lfo_sin(  in float speed ){ return (sin(u_time*speed*TWO_PI)*0.5 + 0.5); }
float lfo_cos(  in float speed ){ return (cos(u_time*speed*TWO_PI)*0.5 + 0.5); }
float lfo_saw(  in float speed ){ return 1.0-fract(u_time*speed); }
float lfo_ramp( in float speed ){ return fract(u_time*speed); }
float lfo_tri(  in float speed ){ return abs( (fract(u_time*speed) * 2.0) - 1.0 ); }
float lfo_pulse( in float speed, float pulse ){ return step( pulse, fract(u_time*speed) ); }
float lfo_square( in float speed ){ return step( 0.5, fract(u_time*speed) ); }


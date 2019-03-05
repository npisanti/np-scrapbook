
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

// --------------------------- LFOs ---------------------------------
float lfo_sin(  in float speed ){ return (sin(u_time*speed*TWO_PI)*0.5 + 0.5); }
float lfo_cos(  in float speed ){ return (cos(u_time*speed*TWO_PI)*0.5 + 0.5); }
float lfo_saw(  in float speed ){ return 1.0-fract(u_time*speed); }
float lfo_ramp( in float speed ){ return fract(u_time*speed); }
float lfo_tri(  in float speed ){ return abs( (fract(u_time*speed) * 2.0) - 1.0 ); }
float lfo_pulse( in float speed, float pulse ){ return step( pulse, fract(u_time*speed) ); }
float lfo_square( in float speed ){ return step( 0.5, fract(u_time*speed) ); }

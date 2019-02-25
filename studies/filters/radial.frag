
// RadialRemap shader
// Nicola Pisanti ( npisanti.com ) - 2018

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;

// ------------------------- functions ------------------------------
#define TWO_PI 6.2831853071795864769252867665590
const float div_1_pi = 1.0 / TWO_PI;

// map input value, to range clamped to minin and maxin
float map01( float value, float minin, float maxin ){ 
    value -= minin; 
    value = max( value, 0.0 ); 
    float range = maxin - minin; 
    value = min( value, range ); 
    float pct = value / range; 
    return pct;
}

//------------------------------------------------
float quadratic_correct (float x){
    // adapted from BEZMATH.PS (1993)
    // by Don Lancaster, SYNERGETICS Inc. 
    // http://www.tinaja.com/text/bezmath.html

    // fixed coefficients
    float a = 0.16;
    float b = 1.0 - a;

    // solve t from x (an inverse operation)
    float om2a = 1.0 - 2.0*a;
    float t = (sqrt(a*a + om2a*x) - a)/om2a;
    float y = (1.0-2.0*b)*(t*t) + (2.0*b)*t;
    return y;
}
// ----------------------- SHADER CODE ------------------------------

// todo: map01: when maxin < minin the returned value is in 1.0 - 0.0 range

void main(){
    
    float u_range = 0.25;
    float u_offset = fract( u_time*0.16 );
    float u_radius_min = 0.1;
    float u_radius_max = 0.5;
    float u_warp = 0.0;
    float u_correct = 0.2;

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    st -= 0.5;
    
    float angle = atan( st.x, st.y ); 
    float dist = sqrt( dot( st, st ) );

    vec2 radial;
    radial.y = map01(dist, u_radius_min, u_radius_max );
    //radial.y = 1.0 -radial.y;
    float gatey = step( 0.01, radial.y) * step( radial.y, 0.98 );
    
    radial.x = angle * div_1_pi;
    radial.x = fract( radial.x + u_offset + radial.y*u_warp );    
    radial.x /= u_range;
    float gatex = step( 0.01, radial.x) * step( radial.x, 0.98 );
    

    float amt = quadratic_correct(radial.y) * u_correct;
    //float amt = radial.y * 0.3;
    radial.x = map01(radial.x, amt, (1.0-amt));
    
    vec4 source = texture2D( u_tex0, radial );
    source.a *= (gatex*gatey);
    
	gl_FragColor = source;
    
}

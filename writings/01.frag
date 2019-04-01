
// Nicola Pisanti ( npisanti.com ) - 2018

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.2831853071795864769252867665590

uniform vec2 u_resolution;
uniform float u_time;

// --------------- condensed functions ------------------------------
float rand(vec2 st, float t){ return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453); }

float circle_sdf(vec2 st) { return length(st-.5)*2.; }

float stroke(float x, float d, float w){ float r = step(d,x+w*.5) - step(d,x-w*.5); return clamp(r, 0., 1.); }

float select( float index, vec2 range ){ float s0 = step( range.x, index ); float s1 = step( index, range.y ); return s0*s1; }

// ------------------------------------------------------------------


// ----------------------- SHADER CODE ------------------------------

const float aa = 0.01;

const float u_seed = 1.0;
const float u_density = 0.35;    
const float u_speed = 0.32;

#define TILES 12.0

float glyph( vec2 st, float index ){
    float g = 0.0;
    
    float ra0 = rand( vec2( index, 0.0 ), u_seed );
    float e0 = step( 0.3333, ra0 );    
    float e0b = step( 0.6666, ra0 );
    g += stroke( circle_sdf( st ), 0.27 - e0b*0.12, 0.06+e0b*0.24 );

    float radstep = TWO_PI / 12.0;
    
    float mra1 =  rand( vec2( index, 1.0), u_seed );
    float mra2 =  rand( vec2( index, 2.0), u_seed );

    vec2 st_off = st-0.5;
    
    for( int i=0; i<6; ++i){
        
        float theta = float(i)*radstep;
        float cos_theta = cos( theta );
        float sin_theta = sin( theta );
        
        mat2 rot0 = mat2( cos_theta, -sin_theta, sin_theta, cos_theta );
        vec2 rt0 = st_off * rot0;
        rt0 += 0.5;
        
        float mult = pow(2.0, float(i)); // i^2
        float e1a = step( 0.5, fract( mra1 * mult ) );    
        float e1b = step( 0.5, fract( mra2 * mult ) );    
        
        g +=    stroke( rt0.x, 0.5, 0.03 ) 
                * stroke( rt0.y, 0.15 + e1b*0.1 , 0.1 + e1b*0.1 )*e1a; 

        mat2 rot6 = mat2( -cos_theta, sin_theta, -sin_theta, -cos_theta );
        vec2 rt6 = st_off * rot6;
        rt6 += 0.5;
        
        mult = pow(2.0, float(i+6)); // i^2
        e1a = step( 0.5, fract( mra1 * mult ) );    
        e1b = step( 0.5, fract( mra2 * mult ) );    
        
        g +=    stroke( rt6.x, 0.5, 0.03 ) 
                * stroke( rt6.y, 0.15 + e1b*0.1 , 0.1 + e1b*0.1 )*e1a; 

    }

    return g;
}

float write( vec2 st, float ratio ){
    
    st *= TILES;
    float cols = floor(TILES * ratio);
    float max = TILES * cols;
    
    vec2 tile = floor( st );
    st -= tile;

    float timepoint = u_time*u_speed;
    float index = tile.x + tile.y*cols;
    float cursor = floor(fract(timepoint)*max);
    
    float written = select( index, vec2( 0, cursor ) );
    
    float page = floor( timepoint ) * max;
    index += page;
    
    return glyph( st, index ) * written;
}

void main(){
    
  
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float ratio = u_resolution.x / u_resolution.y;
    st.x *= ratio;
    // one glyph
    //float alpha = glyph( st, floor(u_time) ); 
    
    // writing
    float alpha = write( st, ratio );
    
	vec3 color = vec3( 1.0 );	
	gl_FragColor = vec4(color, alpha);
}


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

mat2 rotate2d( in float _angle ){ return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)); }
vec2 rotated( vec2 _st, in float _angle ){ _st -= 0.5; _st *= rotate2d( _angle ); _st += 0.5; return _st;}
// ------------------------------------------------------------------


// ----------------------- SHADER CODE ------------------------------

const float aa = 0.01;

const float u_seed = 1.0;
const float u_density = 0.35;    
const float u_speed = 0.32;

#define TILES 12.0

float glyph( vec2 st, float index ){
    float g = 0.0;
    
    float ra0 = rand( vec2( index, 13.0 ), u_seed );
    float e0 = step( 0.3333, ra0 );    
    float e0b = step( 0.6666, ra0 );
    g += stroke( circle_sdf( st ), 0.27 - e0b*0.12, 0.06+e0b*0.24 );

    float step = TWO_PI / 12.0;
    
    for( int i=0; i<12; ++i){
        vec2 rt = rotated( st, float(i)*step );
        float ra1 = rand( vec2( index, i), u_seed );
        float e1a = step( 0.3333, ra1 );    
        float e1b = step( 0.6666, ra1 );    
        g +=    stroke( rt.x, 0.5, 0.03 ) 
                * stroke( rt.y, 0.15 + e1b*0.1 , 0.1 + e1b*0.1 )*e1a; 
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
	vec2 t = st;
    t.y = 1.0 - t.y;
    float ratio = u_resolution.x / u_resolution.y;
    t.x *= ratio;
    //st.y = 1.0 - st.y; // now y is from up to down

    // one glyph
    //float alpha = glyph( st, floor(u_time) ); 
    
    // writing
    float alpha = write( t, ratio );
    
	vec3 color = vec3( 1.0 );	
	gl_FragColor = vec4(color, alpha);
}

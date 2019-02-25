
// Nicola Pisanti ( npisanti.com ) - 2018

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// --------------- condensed functions ------------------------------
float rand(vec2 st, float t){ return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453); }

float rect_sdf(vec2 st, vec2 s) { st = st*2.-1.; return max( abs(st.x/s.x), abs(st.y/s.y) ); }

float stroke( float x, float d, float w, float fade ){ return smoothstep(d-fade, d+fade, x+w*.5) - smoothstep(d-fade, d+fade, x-w*.5); } float stroke(float x, float d, float w){ float r = step(d,x+w*.5) - step(d,x-w*.5); return clamp(r, 0., 1.); }

float select( float index, vec2 range ){ float s0 = step( range.x, index ); float s1 = step( index, range.y ); return s0*s1; }

// ------------------------------------------------------------------


// ----------------------- SHADER CODE ------------------------------

const float aa = 0.05;

const float u_seed = 1.0;
const float u_density = 0.35;    
const float u_speed = 0.14;

#define ROWS 26.0
#define COLS 40.0 

float glyph( vec2 st, float index ){
    const float w = 0.1;
    
    float e0 = step( u_density, rand( vec2( index, 0.0), u_seed ));    
    float s0 = stroke( rect_sdf( st + vec2(0.0, 0.333*0.5), vec2(1.0, 0.666) ), 0.8, w);

    float e1 = step( u_density, rand( vec2( index, 1.0), u_seed ));
    float s1 = stroke( rect_sdf( st - vec2(0.0, 0.333*0.5), vec2(1.0, 0.666) ), 0.8, w);

    float e2 = step( u_density, rand( vec2( index, 2.0), u_seed ));    
    float s2 = stroke( st.x, 0.5, 0.05 ) * stroke( st.y, 0.5, 0.85 );
    
    return s0*e0 + s1*e1 + s2*e2;
}

float glyphs( vec2 st ){
    st.x *= COLS;
    st.y *= ROWS;
    float max = COLS * ROWS;
    
    vec2 tile = floor( st );
    st -= tile;

    float index = tile.x + tile.y*COLS;
    float lines = select( index, vec2( 0, floor(fract(u_time*u_speed)*max)) );
    float page = floor( u_time*u_speed ) * max;
    index += page;
    
    return glyph( st, index ) * lines;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //st.y = 1.0 - st.y; // now y is from up to down

    float alpha = glyphs( st );
    
	vec3 color = vec3 (1.0, 0.10, 0.25);	
	gl_FragColor = vec4(color, alpha);
}

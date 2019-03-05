
#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif

#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#ifndef TAU
#define TAU 6.2831853071795864769252867665590
#endif
// -------------------- POSITION AND OPERATIONS ---------------------

mat2 rotate2d( in float _angle ){ 
    return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)); 
}

vec2 rotated( vec2 _st, in float _angle ){ 
    _st -= 0.5; 
    _st *= rotate2d( _angle ); 
    _st += 0.5; 
    return _st;
}

float select( vec2 index, vec4 ranges ){ 
    vec2 s0 = step( ranges.xz, index ); 
    vec2 s1 = step( index, ranges.yw ); 
    return s0.x * s0.y * s1.x * s1.y; 
}

float select( float index, vec2 range ){ 
    float s0 = step( range.x, index ); 
    float s1 = step( index, range.y ); 
    return s0*s1; 
}

vec2 tile(in vec2 _st, in float _n ){ 
    _st *= _n; 
    return fract(_st); 
}

vec2 tile(in vec2 _st, in float _rows, in float _columns ){ 
    _st.x *= _columns; 
    _st.y *= _rows;
    return fract(_st); 
}

float flip(float v, float pct) { 
    return mix(v, 1.-v, pct);
}


// ------------------------ STROKES ----------------------------------

float stroke( float x, float d, float w, float fade ){ 
    return smoothstep(d-fade, d+fade, x+w*.5) - smoothstep(d-fade, d+fade, x-w*.5); 
} 
    
float stroke(float x, float d, float w){ 
    float r = step(d,x+w*.5) - step(d,x-w*.5); 
    return clamp(r, 0., 1.); 
}

float bridge( float g, float x, float t, float w, float fade) { 
    g *= 1.-stroke(x,t,w*2., fade); 
    return g + stroke(x,t,w, fade); 
}

// cuts a radial subsection 
float arc( in vec2 _st, in float _start, in float _stop ){ 
    _st -= 0.5; 
    float at = atan( _st.x, _st.y ); 
    float dist = sqrt(dot(_st, _st)); 
    float aa = (1.0-dist)*0.005; 
    float a0 = 1.0 - smoothstep( at-aa, at+aa, _start - PI ); 
    float a1 = smoothstep( at-aa, at+aa, _stop - PI ); 
    return a0*a1; 
}

// black when the two shapes overlap 
float invertsum( in float s0, in float s1 ){ 
    return s0 + s1 - s0*s1*2.0; 
}

float map( float value, float minin, float maxin, float minout, float maxout ){ 
    value -= minin; 
    value = max( value, 0.0 ); 
    float range = maxin - minin; 
    value = min( value, range ); 
    float pct = value / range; 
    return mix( minout, maxout, pct );
}


// ------------------------ SHAPES -----------------------------------

// FROM PATRICIO GONZALES VIVO LIBSDF

float circle_sdf(vec2 st) { 
    return length(st-.5)*2.; 
}

float hex_sdf(vec2 st) { 
    st = abs(st*2.-1.); 
    return max(abs(st.y), st.x * 0.866025 + st.y * 0.5);
}

float poly_sdf(vec2 st, int V) { 
    st = st*2.-1.;
    float a = atan(st.x,st.y)+PI; 
    float r = length(st); 
    float v = TAU/float(V); 
    return cos(floor(.5+a/v)*v-a)*r; 
}

float rect_sdf(vec2 st, vec2 s) { 
    st = st*2.-1.; return max( abs(st.x/s.x), abs(st.y/s.y) );
 }

float tri_sdf(vec2 st) { 
    st = (st*2.-1.)*2.; 
    return max(abs(st.x) * 0.866025 + st.y * 0.5, -st.y * 0.5); 
}

float rhomb_sdf(vec2 st) { 
    return max(tri_sdf(st), 
    tri_sdf(vec2(st.x,1.-st.y))); 
}

float spiral_sdf(vec2 st, float t) { 
    st -= .5; float r = dot(st,st); 
    float a = atan(st.y,st.x);
    return abs(sin(fract(log(r)*t+a*0.159))); 
}

float star_sdf(vec2 st, int V, float s) { 
    st = st*4.-2.; 
    float a = atan(st.y, st.x)/TAU; 
    float seg = a * float(V); 
    a = ((floor(seg) + 0.5)/float(V) +  mix(s,-s,step(.5,fract(seg))))  * TAU; 
    return abs(dot(vec2(cos(a),sin(a)), st)); 
}

float rays_sdf(vec2 st, int N) { 
    st -= .5; 
    return fract(atan(st.y,st.x)/TAU*float(N)); 
}

float cross_sdf(vec2 st, float s) { 
    vec2 size = vec2(.25, s); 
    return min( rect_sdf(st.xy,size.xy), rect_sdf(st.xy,size.yx)); 
}

float vesica_sdf(vec2 st, float w) { 
    vec2 offset = vec2(w*.5,0.); 
    return max( circle_sdf(st-offset), 
    circle_sdf(st+offset)); 
}

float heart_sdf(vec2 st) { 
    st -= vec2(.5,.8); 
    float r = length(st)*5.; 
    st = normalize(st);
    return r - ((st.y*pow(abs(st.x),0.67))/ (st.y+1.5)-(2.)*st.y+1.26); 
}

float flower_sdf(vec2 st, int N) { 
    st = st*2.-1.; float r = length(st)*2.; 
    float a = atan(st.y,st.x); 
    float v = float(N)*.5; 
    return 1.-(abs(cos(a*v))*.5+.5)/r; 
}


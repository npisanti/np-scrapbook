
// -------------------- POSITION AND OPERATIONS ---------------------

mat2 rotate2d( in float _angle ){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

vec2 position( in vec2 _st,  in vec2 _coord, in float _angle ){
	vec2 pos = _st-_coord;
	pos *= rotate2d( _angle );
    return pos;
}

vec2 position( in vec2 _st, in vec2 _coord ){
	return _st-_coord;
}

vec2 tile(in vec2 _st, in float _n ){
    _st *= _n;
    return fract(_st);
}

// cuts a radial subsection 
float arc( in vec2 _st, in float _start, in float _stop ){
    float at = atan( _st.x, _st.y );
    float dist = sqrt(dot(_st, _st));
    float aa = (1.0-dist)*0.005; // smoothing value
    float a0 = 1.0 - smoothstep( at-aa, at+aa, _start - PI );
    float a1 = smoothstep( at-aa, at+aa, _stop - PI );
    return a0*a1;
}

// black when the two shapes overlap 
float bridge( in float s0, in float s1 ){
    return s0 + s1 - s0*s1*2.0;
}

// ------------------------ SHAPES -----------------------------------

// circle
float circle_fill(in vec2 _st, in float _radius){
    const float aa = 0.001;
    _radius = pow(_radius, 2.0);
	return 1.-smoothstep(_radius-aa,
                         _radius+aa,
                         dot(_st,_st));
}


// ring shape
float circle_line(in vec2 _st, in float _radius, in float _width ) {
    const float aa = 0.001;
    float r0 = pow(_radius, 2.0);
    float r1 = pow(_radius + _width, 2.0);
    float d = dot( _st, _st );
	return  smoothstep(r0-aa, r0+aa, d) - smoothstep(r1-aa, r1+aa, d);
}


float rect_fill(in vec2 _st, in vec2 _size){
    const vec2 aa = vec2( 0.001 ); 
    _st +=  0.5;
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+aa,
                        _st);
    uv *= smoothstep(_size,
                    _size+aa,
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float rect_line (in vec2 _st, in vec2 _size, in float _width ) {
	float b0 = rect_fill( _st, _size );
	float b1 = rect_fill( _st, _size - vec2( _width )*2.0 );
	return b0 - b1;
}



float cross(in vec2 _st, float _size, in float _width){
    return  min( rect_fill(_st, vec2(_size,  _width)) +
            rect_fill(_st, vec2(_width, _size)), 1.0 );
}


float shape_fill(in vec2 _st, int N, float _radius){
	float a=atan( _st.x, _st.y );
	float b=6.28319/float(N);
	float d = cos(floor(.5+a/b)*b-a)*length(_st.xy );
	float f = smoothstep( _radius+0.005, _radius, d);
	return f;
}

float shape_line(in vec2 _st, int N, float _radius, float _width){
	float a=atan( _st.x, _st.y );
	float b=6.28319/float(N);
	float d = cos(floor(.5+a/b)*b-a)*length(_st.xy );
	float f= smoothstep( _radius+0.005, _radius, d) - smoothstep( _radius+0.005 - _width, _radius - _width, d);
	return f;
}

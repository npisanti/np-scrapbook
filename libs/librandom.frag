
// -------------------------- RANDOM ------------------------------
// if this random fails check out
// http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
float rand(vec2 st, float t){
    return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453);
}

float rand( in float i, in float t ){
    return fract(sin(dot( vec2(i, t), vec2(12.9898,78.233))) * 43758.5453);
}

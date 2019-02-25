
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float PHI = 1.61803398874989484820459 * 00000.1;    
float GPI  = 3.14159265358979323846264 * 00000.1; // PI
float SRT = 1.41421356237309504880169 * 10000.0; 
float gold_noise(in vec2 coordinate, in float seed) {
    return fract(sin(dot(coordinate*seed, vec2(PHI, GPI)))*SRT);
}

float usin( in float rad ){ return (sin(rad)*0.5 + 0.5); }

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 16.0; // Scale the coordinate system
    vec2 ipos = floor(st);  // get the integer coords

    float ran = gold_noise( ipos, floor(u_time*6.) );
    vec3 color = vec3(1.0,0.1+usin(u_time*2.3)*0.4,0.1);
    
    gl_FragColor = vec4(color * ran ,1.0);
}

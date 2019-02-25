

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float rect ( in vec2 st, in vec2 xy0, in vec2 xy1, float border ){
    vec2 bl0 = step( xy0, st);
    vec2 tr0 = step( vec2(1.0)-xy1, 1.0-st);
    float outer = bl0.x * bl0.y * tr0.x * tr0.y;;

    vec2 bl1 = step(xy0+vec2(border),st);
    vec2 tr1 = step(vec2(1.0)-xy1+vec2(border),1.0-st);
    float inner = bl1.x * bl1.y * tr1.x * tr1.y;
    return outer - inner;
}

float rect ( in vec2 st, in vec2 xy0, in vec2 xy1){
    vec2 bl0 = step( xy0, st);
    vec2 tr0 = step( vec2(1.0)-xy1, 1.0-st);
    float outer = bl0.x * bl0.y * tr0.x * tr0.y;;
    return outer;
}

float bridge( in float s0, in float s1 ){
    return (s0+s1- 2.0*s0*s1);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    float r0 = rect(st, vec2(0.230,0.220), vec2(0.600,0.590), 0.05);
    float r1 = rect(st, vec2(0.370,0.390), vec2(0.710,0.730), 0.05);
    
    float r = bridge( r0, r1);
    color = vec3( 1.0, 0.2, 0.2 );
    
    gl_FragColor = vec4(color, r );
}

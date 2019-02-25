
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform vec3 u_color_a;

uniform sampler2D u_tex0;

varying vec2 st;

// --------------------------- FUNCTIONS -----------------------------

float usin( float _time ){ return (sin(_time) * 0.5)+0.5; }

// canonic random one-liner
float rand(vec2 st, float t){ return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453); }
float rand( float i, float t ){ return rand(vec2(i,i), t); }

mat2 rotate2d( in float _angle ){ return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)); }
vec2 rotated( vec2 _st, in float _angle ){ _st -= 0.5; _st *= rotate2d( _angle ); _st += 0.5; return _st;}

float stroke( float x, float d, float w, float fade ){ return smoothstep(d-fade, d+fade, x+w*.5) - smoothstep(d-fade, d+fade, x-w*.5); } float stroke(float x, float d, float w){ float r = step(d,x+w*.5) - step(d,x-w*.5); return clamp(r, 0., 1.); }

float poly_sdf(vec2 st, int V) { st = st*2.-1.; float a = atan(st.x,st.y)+PI; float r = length(st); float v = TWO_PI/float(V); return cos(floor(.5+a/v)*v-a)*r; }

float polymoire( vec2 st, int N, float spacing, float fatness, float speed ){
    vec2 rot = rotated( st, u_time*speed);
    float s0 = poly_sdf( rot, N );
    float t = stroke( fract( s0*spacing), .5, fatness );
    return t;
}

// --------------------------- SHADER --------------------------------

void main(){

    vec4 source = texture2D( u_tex0, st ); // for texture access

    float alpha = source.r;

    vec3 color = vec3( 1.0 );
 
    float t3 = polymoire( st+vec2(-0.5, 0.5), 8, 43.0, 0.8, 0.01 );
    float t4 = polymoire( st+0.5, 11, 43.0, 0.5, 0.02 );

    float t = t3*t4;
    
    //t *= alpha;

    gl_FragColor = vec4( u_color_a, t );

}

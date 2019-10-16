
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
varying vec2 st;

float rand(vec2 st, float t){
    return fract(sin(dot(st.xy + fract(t*0.0013) ,vec2(12.9898,78.233))) * 43758.5453);
}

float lfo_tri(  in float speed ){ return abs( (fract(u_time*speed) * 2.0) - 1.0 ); }

// variables : -------------
uniform float u_feedback;
uniform vec3 u_background;
uniform float u_wind;
// -------------------------

void main (void) {
    
    vec2 st = gl_FragCoord.xy/u_resolution;
    float rat = u_resolution.x / u_resolution.y;
    
    float decay = 0.0025;
    st.y += decay;

    float rnd_x = rand( st, 0.0 ) - 0.5;
    float rnd_y = rand( st, 1.0 ) - 0.5;

    float pct = 0.02;
    st.x -= decay * rnd_x;;
    
    // adds wind 
    st.x += sin(u_time + st.y*20.0)*(u_wind + lfo_tri( 0.55 )* u_wind);
    st.x += sin(u_time + st.y*85.0)*u_wind*lfo_tri( 0.45 );
    
    st.y -= decay*(6.+fract(u_time*0.765)*2.) * rnd_y * rat;

    vec4 source = texture2D( u_tex0, st );
    
    vec3 color = source.rgb * u_feedback + u_background*(1.0-u_feedback);

    gl_FragColor =  vec4( color, 1.0 );
}

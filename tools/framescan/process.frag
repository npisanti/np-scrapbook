
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform sampler2D u_tex0;

uniform float u_low;
uniform float u_high;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

	st.x = 1.0 - st.x;
	st.y = 1.0 - st.y;

    vec4 source = texture2D( u_tex0, st ); 
    vec3 color = source.rgb;
    float luminance = color.r*0.299 + color.g*0.587 + color.b*0.114;	

    float alpha =  1.0 - smoothstep( u_low, u_high, luminance );

    gl_FragColor = vec4( vec3(1.0), alpha  );
}

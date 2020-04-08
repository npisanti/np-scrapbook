
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform sampler2D u_tex0;

void main(){
    
    vec2 st = gl_FragCoord.xy/u_resolution;

	st.x += 0.4;
	
    vec4 source = texture2D( u_tex0, st ); // for texture access
    vec3 color = source.rgb;
    float luminance = color.r*0.299 + color.g*0.587 + color.b*0.114;	


    float low = 0.15;
    float high = 0.45;
    
    float alpha = smoothstep( low, high, luminance );
    
    gl_FragColor = vec4( vec3(alpha), 1.0 );
    // gl_FragColor = vec4( 1.0, 1.0, 1.0, alpha );
}

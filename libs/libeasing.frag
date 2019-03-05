
// ---- http://www.iquilezles.org/www/articles/functions/functions.htm --------

float almostIdentity( float x, float m, float n ){
    if( x>m ) return x;

    const float a = 2.0*n - m
    const float b = 2.0*m - 3.0*n;
    const float t = x/m;

    return (a*t + b)*t*t + n;
}

float impulse( float k, float x ){
    const float h = k*x;
    return h*exp(1.0-h);
}

float cubicPulse( float c, float w, float x ){
    x = fabs(x - c);
    if( x>w ) return 0.0;
    x /= w;
    return 1.0 - x*x*(3.0-2.0*x);
}

float expStep( float x, float k, float n ){
    return exp( -k*pow(x,n) );
}

float gain(float x, float k) {
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}

float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
}
	
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

float sinc( float x, float k ){
    const float a = PI * ((float(k)*x-1.0);
    return sin(a)/a;
}

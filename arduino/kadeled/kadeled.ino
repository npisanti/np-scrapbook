
#define MIN 0.001f
#define MAXSPEED 0.02f

// analog read on A0, transistor control on pin 9 
#define KNOB A0
#define LEDPIN 9

float phase;
float inc;
  
void setup() {
  
  pinMode(LEDPIN, OUTPUT);
    
  inc = 0.0001f;
  phase = 0.0f;
}

void loop() {
  
  int sensorValue = analogRead(KNOB);
  
  inc = (float(sensorValue) / 1020.0f );
  inc = (inc>1.0f) ? 1.0f : inc;
  inc *= inc;
    
  if( inc < MIN ){
    phase = 0.5f;
    digitalWrite( LEDPIN, LOW );
  }else if( inc ==1.0f ){
    phase = 0.999f;
    digitalWrite( LEDPIN, HIGH );
  }else{
    inc *= MAXSPEED;
    phase += inc;
    if( phase >= 1.0f ) {
      phase -= 1.0f;
    }
    float tri = abs( phase*2.0f - 1.0f );
    
    int wave = tri * tri * 255;    
    analogWrite(LEDPIN, wave );  
  }
  
  delay(1); 
}

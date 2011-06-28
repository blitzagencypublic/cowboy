#include <MIDI.h>

unsigned int incomingByte = 0;
String output;
const int ledPin = 13;
const int lowCMIDI = 36;
int pentatonic[21] = {
  0,2,4,7,9,12,14,16,19,21,24,26,28,31,33,36,38,40,43,45,48};
int length[4] = {
  250,500,1000, 1500};


void setup()
{
  MIDI.begin(); 
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
}

void loop()
{
  // do I have any data?
  if (Serial.available() > 0) {
    
    // Read the first byte from the Serial port
    incomingByte = Serial.read();
    
    // map that byte to a value between 0 and 20 for the 21 values in my pentatonic array
    int newnote = map(incomingByte, 0,255, 0,20);
    
    newnote = lowCMIDI + pentatonic[newnote];
    int newLength = 200;
    // read the second byte to get the appropriate length;
    if (Serial.available() > 0) {
      incomingByte = Serial.read(); 
      incomingByte = constrain(incomingByte , 0, 255);
      newLength = map(incomingByte, 0,255, 0,3);  
    }
    //turn the note on
    MIDI.sendNoteOn(newnote, 127, 1) ;

    delay(length[newLength]);
    
    MIDI.sendNoteOff(newnote, 0, 1) ;
  }
 
}







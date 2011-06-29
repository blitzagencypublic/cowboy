#include <MIDI.h>

unsigned int incomingByte = 0;
const int ledPin = 13;
const int lowCMIDI = 36;

const int pentatonic[21] = {
  0,2,4,7,9,12,14,16,19,21,24,26,28,31,33,36,38,40,43,45,48};
const int length[4] = {
  250,500,1000, 1500};
  
int allNotes[4] ; 
unsigned long allShutoffs[4] = {0,0,0,0};



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
    int newLength = 250;
    // read the second byte to get the appropriate length;
    if (Serial.available() > 0) {
      incomingByte = Serial.read(); 
      incomingByte = constrain(incomingByte , 0, 255);
      newLength = map(incomingByte, 0,255, 0,3);  
      newLength = length[newLength];
    }
   
    //turn the note on
    
    for (int i = 0; i < 4; i++)
    {
      unsigned long currentMillis = millis();
      //Serial.println("hello"); 
      if ( currentMillis > allShutoffs[i])
      {
        MIDI.sendNoteOff(allNotes[i],0,1); 
        allNotes[i] = newnote;
        MIDI.sendNoteOn(newnote, 127, 1) ;
        allShutoffs[i] = millis() + long(newLength);
      }
    }
    
    /*
    MIDI.sendNoteOn(newnote, 127, 1) ;

    delay(newLength);
    
    MIDI.sendNoteOff(newnote, 0, 1) ;
    */
  }
 
}







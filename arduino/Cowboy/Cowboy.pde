#include <MIDI.h>

unsigned int incomingByte = 0;
String output;
const int ledPin = 13;

void setup()
{
  MIDI.begin(); 
  randomSeed(analogRead(0));
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
}

void loop()
{
  // send data only when you receive data:
  if (Serial.available() > 0) {
    
    incomingByte = Serial.read();
    incomingByte = constrain(incomingByte , 32, 127);

    int newnote = map(incomingByte, 32,127, 65,105);
    int newLength = 250;
    if (Serial.available() >0 ) {
      
      incomingByte = Serial.read(); 
      incomingByte = constrain(incomingByte , 32, 127);
      newLength = map(incomingByte, 32,127, -8192,8192);  
    }
    
    MIDI.sendNoteOn(newnote, 127, 1) ;
    
    delay(250);
    /*
    int delaytime = 10000 / abs(newLength);
    
    for (int i = 0; i < newLength; i++)
    {
    MIDI.sendPitchBend(i,1);
    delay(10);
    }
    */
    MIDI.sendNoteOff(newnote, 0, 1) ;
  }
  /*
  for (int i = 0 ; i <= 7 ; i++)
   {
   MIDI.sendNoteOn((60 + majorScale[ i]), 70, 1) ;
   delay(600);
   MIDI.sendNoteOff((60 + majorScale[ i]),0,1);
   }
   
   for (int i = 7 ; i >=0  ; i--)
   {
   MIDI.sendNoteOn((60 + majorScale[ i]), 70, 1) ;
   delay(300);
   MIDI.sendNoteOff((60 + majorScale[ i]),0,1);
   }
   */
}






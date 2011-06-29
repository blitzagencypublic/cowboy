#include <MIDI.h>

unsigned int incomingByte = 0;
const int ledPin = 10;
const int lowCMIDI = 36;

const int pentatonic[21] = {
  0,2,4,7,9,12,14,16,19,21,24,26,28,31,33,36,38,40,43,45,48};
const int length[4] = {
  250,500,1000, 1500};

int allNotes[4] ; 
unsigned long allShutoffs[4] = {
  0,0,0,0};

int currentLEDMode = HIGH;
int displayState = 0;

void setup()
{
  MIDI.begin(); 
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, currentLEDMode);
}

void loop()
{
  // do I have any data?

  if (Serial.available() > 0) {

    // Read the first byte from the Serial port
    incomingByte = Serial.read();

    // map that byte to a value between 0 and 20 for the 21 values in my pentatonic array
    int newnote = constrain(incomingByte, 0,255);
    newnote = map(incomingByte, 0,255, 0,20);
    newnote = lowCMIDI + pentatonic[newnote];
    int newLength = 250;
    // read the second byte to get the appropriate length;
    if (Serial.available() > 0) {
      incomingByte = Serial.read(); 
      incomingByte = constrain(incomingByte , 0, 255);
      newLength = map(incomingByte, 0,255, 0,3);  
      newLength = length[newLength];
      newLength = 300;
    }
    //we've got note and length, now check the note buffer
    checkTheNoteBuffer(newnote, newLength);

  }
  /*else
  {
    if (displayState == 1) {
      displayState = 0 ;
      for (int i = 0; i < 4; i++ )
      {
        Serial.println("Note :" + allNotes[i] );
        Serial.println("Shutoff :" + allShutoffs[i] );
      } 
    }
  }
  */
}
void checkTheNoteBuffer( int note, int length)
{
  //prep the current time variable
  unsigned long currentMillis;



  // loop through my four note buffer
  int i;
  for (i = 0; i < 4; i++)
  {
    // get the current time
    currentMillis = millis();

    // if the current time is greater than the notes shutoff time, we can use the next note.
    if ( currentMillis > allShutoffs[i])
    {
      // turn off the old note
      MIDI.sendNoteOff(allNotes[i],0,1); 
      // set the value in the note buffer
      allNotes[i] = note;
      // turn the note on.
      MIDI.sendNoteOn(note, 127, 1) ;
      //save it's shutoff time
      allShutoffs[i] = (millis() + long(length));

      // if we're cycling note one, change the led value
      if (i == 0)
      {
        if (currentLEDMode == HIGH) currentLEDMode = LOW;
        if (currentLEDMode == LOW) currentLEDMode = HIGH;
      }
      displayState = 1;
    }
  }

}









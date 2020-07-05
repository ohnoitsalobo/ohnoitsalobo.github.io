var synth = new Tone.Synth({
  oscillator: {
    type: 'triangle',
    // modulationType: 'sawtooth',
    // modulationIndex: 3,
    // harmonicity: 3.4
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster()

/*            C     C#/Db     D     D#/Eb     E       F     F#/Gb     G     G#/Ab    A   A#/Bb     B       C'    */
var tone = [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.32, 987.76, 1046.5];

function playTone(t){
    // synth.triggerAttackRelease(tone[t], "8n");
    var transpose = 1;
    for(var i = 0; i < (noteIndex%12); i++)
        transpose *= 1.059463;
    synth.triggerAttackRelease(tone[t]*transpose/2, "8n");
    // playedHighlight(t);
}

function mouseReleased(){
    let xpos, ypos, offset = 0.07*shortAxis;
    xpos = 0.5*shortAxis;
    ypos = 0.11*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos        &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(12);
    }
    if(mouseX>xpos        && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(0);
    }
    xpos = 0.69*shortAxis;
    ypos = 0.17*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(1);
    }
    xpos = 0.83*shortAxis;
    ypos = 0.31*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(2);
    }
    xpos = 0.88*shortAxis;
    ypos = 0.5*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(3);
    }
    xpos = 0.83*shortAxis;
    ypos = 0.69*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(4);
    }
    xpos = 0.69*shortAxis;
    ypos = 0.83*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(5);
    }
    xpos = 0.5*shortAxis;
    ypos = 0.88*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(6);
    }
    xpos = 0.31*shortAxis;
    ypos = 0.83*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(7);
    }
    xpos = 0.17*shortAxis;
    ypos = 0.69*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(8);
    }
    xpos = 0.11*shortAxis;
    ypos = 0.5*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(9);
    }
    xpos = 0.17*shortAxis;
    ypos = 0.31*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(10);
    }
    xpos = 0.31*shortAxis;
    ypos = 0.17*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(11);
    }
    return false;
}

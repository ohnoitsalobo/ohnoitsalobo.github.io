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
    var transpose = 1;
    for(var i = 0; i < (noteIndex%12); i++)
        transpose *= 1.059463;
    synth.triggerAttackRelease(tone[t]*transpose/2, "8n");
}

function mouseReleased(){
    let xpos, ypos, ypos1, offset = 0.07*shortAxis;
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
    ////// CHANGE KEY
    xpos  = 1.15*shortAxis;
    ypos  = 0.19*shortAxis;
    ypos1 = 0.41*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        noteIndex = (noteIndex + 1)%12;
        keySelect.selected(keyList[noteIndex]);
    }
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos1-offset && mouseY<ypos1+offset){
        noteIndex = (noteIndex + 11)%12;
        keySelect.selected(keyList[noteIndex]);
    }
    ////// CHANGE PATTERN
    xpos  = 1.55*shortAxis;
    ypos  = 0.19*shortAxis; 
    ypos1 = 0.41*shortAxis;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        majorMinorOther = (majorMinorOther + 5)%6;
        modeSelect.selected(modeList[majorMinorOther]);
        changeMode();
    }
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos1-offset && mouseY<ypos1+offset){
        majorMinorOther = (majorMinorOther + 1)%6;
        modeSelect.selected(modeList[majorMinorOther]);
        changeMode();
    }
    
    xpos  = 1.35*shortAxis;
    ypos  = 0.44*shortAxis; 
    ypos1 = 0.76*shortAxis;
    ////// CHANGE MAJOR MODE
    if(majorMinorOther == 0){
        var choice = majorModeSelect.value();
        let i = 0;
        for(let k = 0; k < majorModeList.length; k++){
            if (choice === majorModeList[k])
                i = k;
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            majorModeSelect.selected(majorModeList[(i+1)%7]);
            changeMajorMode();
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos1-offset && mouseY<ypos1+offset){
            majorModeSelect.selected(majorModeList[(i+6)%7]);
            changeMajorMode();
        }
    }
    console.log(mouseX/shortAxis + "," + mouseY/shortAxis, majorMinorOther);
    ////// CHANGE MELODIC MINOR MODE
    if(majorMinorOther == 1){
        var choice = melodicMinorModeSelect.value();
        let i = 0;
        for(let k = 0; k < melodicMinorModeList.length; k++){
            if (choice === melodicMinorModeList[k])
                i = k;
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            melodicMinorModeSelect.selected(melodicMinorModeList[(i+1)%7]);
            changeMelodicMinorMode();
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos1-offset && mouseY<ypos1+offset){
            melodicMinorModeSelect.selected(melodicMinorModeList[(i+6)%7]);
            changeMelodicMinorMode();
        }
    }
    ////// CHANGE HARMONIC MINOR MODE
    if(majorMinorOther == 2){
        var choice = harmonicMinorModeSelect.value();
        let i = 0;
        for(let k = 0; k < harmonicMinorModeList.length; k++){
            if (choice === harmonicMinorModeList[k])
                i = k;
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            harmonicMinorModeSelect.selected(harmonicMinorModeList[(i+1)%7]);
            changeHarmonicMinorMode();
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos1-offset && mouseY<ypos1+offset){
            harmonicMinorModeSelect.selected(harmonicMinorModeList[(i+6)%7]);
            changeHarmonicMinorMode();
        }
    }
    ////// CHANGE HARMONIC MAJOR MODE
    if(majorMinorOther == 3){
        var choice = harmonicMajorModeSelect.value();
        let i = 0;
        for(let k = 0; k < harmonicMajorModeList.length; k++){
            if (choice === harmonicMajorModeList[k])
                i = k;
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            harmonicMajorModeSelect.selected(harmonicMajorModeList[(i+1)%7]);
            changeHarmonicMajorMode();
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos1-offset && mouseY<ypos1+offset){
            harmonicMajorModeSelect.selected(harmonicMajorModeList[(i+6)%7]);
            changeHarmonicMajorMode();
        }
    }
    ////// CHANGE DOUBLE HARMONIC MODE
    if(majorMinorOther == 4){
        var choice = doubleHarmonicModeSelect.value();
        let i = 0;
        for(let k = 0; k < doubleHarmonicModeList.length; k++){
            if (choice === doubleHarmonicModeList[k])
                i = k;
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            doubleHarmonicModeSelect.selected(doubleHarmonicModeList[(i+1)%7]);
            changeDoubleHarmonicMode();
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos1-offset && mouseY<ypos1+offset){
            doubleHarmonicModeSelect.selected(doubleHarmonicModeList[(i+6)%7]);
            changeDoubleHarmonicMode();
        }
    }
    ////// CHANGE OTHER MODE
    if(majorMinorOther == 5){
        var choice = otherModeSelect.value();
        let i = 0;
        for(let k = 0; k < otherModeList.length; k++){
            if (choice === otherModeList[k])
                i = k;
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            otherModeSelect.selected(otherModeList[(i+28)%29]);
            changeOtherMode();
        }
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos1-offset && mouseY<ypos1+offset){
            otherModeSelect.selected(otherModeList[(i+1)%29]);
            changeOtherMode();
        }
    }
    return false;
}

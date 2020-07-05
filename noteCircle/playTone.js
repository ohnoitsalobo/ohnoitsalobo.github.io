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

function keyPressed(){
    console.log(doubleHarmonicModeIndex);
    if(key == 'q' || key == 'Q'){ // 0
        playTone(0);
    }
    if(key == 'w' || key == 'W'){ // 1
        if(majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 9 || 
               majorModeIndex ==10 )
                playTone(2);
            else
                playTone(1);
        }
        if(majorMinorOther == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 1 ||
               melodicMinorModeIndex == 3 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==10 )
                playTone(2);
            else
                playTone(1);
        }
        if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==10 )
                playTone(2);
            else
                if(harmonicMinorModeIndex == 8)
                    playTone(3);
                else
                    playTone(1);
        }
        if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 2 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==10 )
                playTone(2);
            else
                if(harmonicMajorModeIndex == 8)
                    playTone(3);
                else
                    playTone(1);
        }
        if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 3 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex ==10 || 
               doubleHarmonicModeIndex ==11 )
                playTone(1);
            else
                if(doubleHarmonicModeIndex == 1 || 
                   doubleHarmonicModeIndex == 8)
                    playTone(3);
                else
                    playTone(2);
        }
    }
    if(key == 'e' || key == 'E'){ // 2
        if(majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 1 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 )
                playTone(4);
            else
                playTone(3);
        }
        if(majorMinorOther == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==11 )
                playTone(3);
            else
                playTone(4);
        }
        if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 2 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 5 || 
               // harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==11 )
                playTone(3);
            else
                playTone(4);
        }
        if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 3 || 
               // harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex ==10 )
                playTone(4);
            else
                playTone(3);
        }
        if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 3 || 
               // doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 )
                playTone(4);
            else
                if(doubleHarmonicModeIndex == 11)
                    playTone(2);
                else
                    playTone(3);
        }
    }
    if(key == 'r' || key == 'R'){ // 3
        if(majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 4 || 
               majorModeIndex == 6 || 
               majorModeIndex == 7 || 
               majorModeIndex == 9 || 
               majorModeIndex ==11 )
                playTone(5);
            else
                playTone(6);
        }
        if(majorMinorOther == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==10 )
                playTone(5);
            else{
                if(melodicMinorModeIndex == 11)
                    playTone(4);
                else
                    playTone(6);
            }
        }
        if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 2 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==10 )
                playTone(5);
            else
                if(harmonicMinorModeIndex == 11)
                    playTone(4);
                else
                    playTone(6);
        }
        if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 2 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==11 )
                playTone(5);
            else
                if(harmonicMajorModeIndex == 4)
                    playTone(4);
                else
                    playTone(6);
        }
        if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 2 ||
               doubleHarmonicModeIndex == 3 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 11 )
                playTone(5);
            else
                if(doubleHarmonicModeIndex == 4)
                    playTone(4);
                else
                    playTone(6);
        }
    }
    if(key == 't' || key == 'T'){ // 4
        if(majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 4 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 9 || 
               majorModeIndex ==10 )
                playTone(7);
            else
                playTone(6);
        }
        if(majorMinorOther == 1){ 
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                playTone(7);
            else{
                if(melodicMinorModeIndex == 9 ||
                   melodicMinorModeIndex ==11 )
                    playTone(6);
                else
                    playTone(8);
            }
        }
        if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex ==10 )
                playTone(7);
            else
                if(harmonicMinorModeIndex == 2 ||
                   harmonicMinorModeIndex ==11 )
                    playTone(6);
                else
                    playTone(8);
        }
        if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==10 )
                playTone(7);
            else
                if(harmonicMajorModeIndex == 2 ||
                   harmonicMajorModeIndex ==11 )
                    playTone(6);
                else
                    playTone(8);
        }
        if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 5 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 9 || 
               doubleHarmonicModeIndex == 10 )
                playTone(7);
            else
                if(doubleHarmonicModeIndex == 7 ||
                   doubleHarmonicModeIndex ==11 )
                    playTone(6);
                else
                    playTone(8);
        }
    }
    if(key == 'y' || key == 'Y'){ // 5
        if(majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 )
                playTone(9);
            else
                playTone(8);
        }
        if(majorMinorOther == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 3 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                playTone(9);
            else
                playTone(8);
        }
        if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               // harmonicMinorModeIndex == 3 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==11 )
                playTone(8);
            else
                playTone(9);
        }
        if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 3 ||
               harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 6 || 
               // harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==11 )
                playTone(8);
            else
                playTone(9);
        }
        if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 3 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 5 || 
               // doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 || 
               doubleHarmonicModeIndex == 11 )
                playTone(8);
            else
                if(doubleHarmonicModeIndex == 1 )
                    playTone(10);
                else
                    playTone(9);
        }
    }
    if(key == 'u' || key == 'U'){ // 6
        if(majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 1 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 6 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 ){
                playTone(11);
            }else
                playTone(10);
        }
        if(majorMinorOther == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 1 ||
               melodicMinorModeIndex == 3 || 
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                playTone(11);
            else
                playTone(10);
        }
        if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 4 || 
               // harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex == 9 )
                playTone(11);
            else
                if(harmonicMinorModeIndex ==11 )
                    playTone(9);
                else
                    playTone(10);
        }
        if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex == 9 )
                playTone(11);
            else
                if(harmonicMajorModeIndex ==11 )
                    playTone(9);
                else
                    playTone(10);
        }
        if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 2 || 
               doubleHarmonicModeIndex == 5 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 )
                playTone(11);
            else
                if(doubleHarmonicModeIndex == 4 ||
                   doubleHarmonicModeIndex ==11 )
                    playTone(9);
                else
                    playTone(10);
        }
    }
    if(key == 'i' || key == 'I'){ // 7
        playTone(12);
    }
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
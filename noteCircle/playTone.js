var synth = new Tone.PolySynth(6, Tone.Synth,
// var synth = new Tone.Synth(
{
    oscillator: {
        type    : 'triangle8',
        volume  : -10,
    },
    envelope: {
        attack  : 0.05,
        decay   : 0.01,
        sustain : 0.9,
        release : 0.1
    }
}
).toMaster()

/*            C     C#/Db     D     D#/Eb     E       F     F#/Gb     G     G#/Ab    A   A#/Bb     B       C'    */
var tone = [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.32, 987.76, 1046.5];
let playedAlpha = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 

function playTone(t){
    var transpose = 1;
    for(var i = 0; i < notesAreLocked(); i++)
        transpose *= 1.059463;
    synth.triggerAttackRelease(tone[t]*transpose/2, "8n");
    playedAlpha[t] = 100;
}

function modeCheck(t){
        if(t == 1){ // 0
            return 0;
        }
        if(t == 2){ // 1
            if(majorMinorOther == 0){
                if(majorModeIndex == 0 || 
                   majorModeIndex == 2 ||
                   majorModeIndex == 3 || 
                   majorModeIndex == 5 || 
                   majorModeIndex == 7 || 
                   majorModeIndex == 9 || 
                   majorModeIndex ==10 )
                    return 2;
                else
                    return 1;
            }
            if(majorMinorOther == 1){
                if(melodicMinorModeIndex == 0 || 
                   melodicMinorModeIndex == 1 ||
                   melodicMinorModeIndex == 3 || 
                   melodicMinorModeIndex == 5 || 
                   melodicMinorModeIndex == 7 || 
                   melodicMinorModeIndex == 9 || 
                   melodicMinorModeIndex ==10 )
                    return 2;
                else
                    return 1;
            }
            if(majorMinorOther == 2){
                if(harmonicMinorModeIndex == 0 || 
                   harmonicMinorModeIndex == 1 ||
                   harmonicMinorModeIndex == 3 || 
                   harmonicMinorModeIndex == 5 || 
                   harmonicMinorModeIndex == 6 || 
                   harmonicMinorModeIndex == 9 || 
                   harmonicMinorModeIndex ==10 )
                    return 2;
                else
                    if(harmonicMinorModeIndex == 8)
                        return 3;
                    else
                        return 1;
            }
            if(majorMinorOther == 3){
                if(harmonicMajorModeIndex == 0 || 
                   harmonicMajorModeIndex == 2 ||
                   harmonicMajorModeIndex == 3 || 
                   harmonicMajorModeIndex == 5 || 
                   harmonicMajorModeIndex == 6 || 
                   harmonicMajorModeIndex == 9 || 
                   harmonicMajorModeIndex ==10 )
                    return 2;
                else
                    if(harmonicMajorModeIndex == 8)
                        return 3;
                    else
                        return 1;
            }
            if(majorMinorOther == 4){
                if(doubleHarmonicModeIndex == 0 || 
                   doubleHarmonicModeIndex == 3 ||
                   doubleHarmonicModeIndex == 4 || 
                   doubleHarmonicModeIndex == 6 || 
                   doubleHarmonicModeIndex == 7 || 
                   doubleHarmonicModeIndex ==10 || 
                   doubleHarmonicModeIndex ==11 )
                    return 1;
                else
                    if(doubleHarmonicModeIndex == 1 || 
                       doubleHarmonicModeIndex == 8)
                        return 3;
                    else
                        return 2;
            }
        }
        if(t == 3){ // 2
            if(majorMinorOther == 0){
                if(majorModeIndex == 0 || 
                   majorModeIndex == 1 ||
                   majorModeIndex == 3 || 
                   majorModeIndex == 5 || 
                   majorModeIndex == 7 || 
                   majorModeIndex == 8 || 
                   majorModeIndex ==10 )
                    return 4;
                else
                    return 3;
            }
            if(majorMinorOther == 1){
                if(melodicMinorModeIndex == 0 || 
                   melodicMinorModeIndex == 2 ||
                   melodicMinorModeIndex == 4 || 
                   melodicMinorModeIndex == 6 || 
                   melodicMinorModeIndex == 8 || 
                   melodicMinorModeIndex == 9 || 
                   melodicMinorModeIndex ==11 )
                    return 3;
                else
                    return 4;
            }
            if(majorMinorOther == 2){
                if(harmonicMinorModeIndex == 0 || 
                   harmonicMinorModeIndex == 2 ||
                   harmonicMinorModeIndex == 4 || 
                   harmonicMinorModeIndex == 5 || 
                   // harmonicMinorModeIndex == 8 || 
                   harmonicMinorModeIndex == 9 || 
                   harmonicMinorModeIndex ==11 )
                    return 3;
                else
                    return 4;
            }
            if(majorMinorOther == 3){
                if(harmonicMajorModeIndex == 0 || 
                   harmonicMajorModeIndex == 1 ||
                   harmonicMajorModeIndex == 3 || 
                   // harmonicMajorModeIndex == 4 || 
                   harmonicMajorModeIndex == 7 || 
                   harmonicMajorModeIndex == 8 || 
                   harmonicMajorModeIndex ==10 )
                    return 4;
                else
                    return 3;
            }
            if(majorMinorOther == 4){
                if(doubleHarmonicModeIndex == 0 || 
                   doubleHarmonicModeIndex == 1 ||
                   doubleHarmonicModeIndex == 3 || 
                   // doubleHarmonicModeIndex == 4 || 
                   doubleHarmonicModeIndex == 7 || 
                   doubleHarmonicModeIndex == 8 || 
                   doubleHarmonicModeIndex == 9 )
                    return 4;
                else
                    if(doubleHarmonicModeIndex == 11)
                        return 2;
                    else
                        return 3;
            }
        }
        if(t == 4){ // 3
            if(majorMinorOther == 0){
                if(majorModeIndex == 0 || 
                   majorModeIndex == 2 ||
                   majorModeIndex == 4 || 
                   majorModeIndex == 6 || 
                   majorModeIndex == 7 || 
                   majorModeIndex == 9 || 
                   majorModeIndex ==11 )
                    return 5;
                else
                    return 6;
            }
            if(majorMinorOther == 1){
                if(melodicMinorModeIndex == 0 || 
                   melodicMinorModeIndex == 2 ||
                   melodicMinorModeIndex == 4 || 
                   melodicMinorModeIndex == 6 || 
                   melodicMinorModeIndex == 7 || 
                   melodicMinorModeIndex == 9 || 
                   melodicMinorModeIndex ==10 )
                    return 5;
                else{
                    if(melodicMinorModeIndex == 11)
                        return 4;
                    else
                        return 6;
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
                    return 5;
                else
                    if(harmonicMinorModeIndex == 11)
                        return 4;
                    else
                        return 6;
            }
            if(majorMinorOther == 3){
                if(harmonicMajorModeIndex == 0 || 
                   harmonicMajorModeIndex == 2 ||
                   harmonicMajorModeIndex == 3 || 
                   harmonicMajorModeIndex == 6 || 
                   harmonicMajorModeIndex == 7 || 
                   harmonicMajorModeIndex == 9 || 
                   harmonicMajorModeIndex ==11 )
                    return 5;
                else
                    if(harmonicMajorModeIndex == 4)
                        return 4;
                    else
                        return 6;
            }
            if(majorMinorOther == 4){
                if(doubleHarmonicModeIndex == 0 || 
                   doubleHarmonicModeIndex == 2 ||
                   doubleHarmonicModeIndex == 3 || 
                   doubleHarmonicModeIndex == 6 || 
                   doubleHarmonicModeIndex == 7 || 
                   doubleHarmonicModeIndex == 8 || 
                   doubleHarmonicModeIndex == 11 )
                    return 5;
                else
                    if(doubleHarmonicModeIndex == 4)
                        return 4;
                    else
                        return 6;
            }
        }
        if(t == 5){ // 4
            if(majorMinorOther == 0){
                if(majorModeIndex == 0 || 
                   majorModeIndex == 2 ||
                   majorModeIndex == 4 || 
                   majorModeIndex == 5 || 
                   majorModeIndex == 7 || 
                   majorModeIndex == 9 || 
                   majorModeIndex ==10 )
                    return 7;
                else
                    return 6;
            }
            if(majorMinorOther == 1){ 
                if(melodicMinorModeIndex == 0 || 
                   melodicMinorModeIndex == 2 ||
                   melodicMinorModeIndex == 4 || 
                   melodicMinorModeIndex == 5 || 
                   melodicMinorModeIndex == 7 || 
                   melodicMinorModeIndex == 8 || 
                   melodicMinorModeIndex ==10 )
                    return 7;
                else{
                    if(melodicMinorModeIndex == 9 ||
                       melodicMinorModeIndex ==11 )
                        return 6;
                    else
                        return 8;
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
                    return 7;
                else
                    if(harmonicMinorModeIndex == 2 ||
                       harmonicMinorModeIndex ==11 )
                        return 6;
                    else
                        return 8;
            }
            if(majorMinorOther == 3){
                if(harmonicMajorModeIndex == 0 || 
                   harmonicMajorModeIndex == 1 ||
                   harmonicMajorModeIndex == 4 || 
                   harmonicMajorModeIndex == 5 || 
                   harmonicMajorModeIndex == 7 || 
                   harmonicMajorModeIndex == 9 || 
                   harmonicMajorModeIndex ==10 )
                    return 7;
                else
                    if(harmonicMajorModeIndex == 2 ||
                       harmonicMajorModeIndex ==11 )
                        return 6;
                    else
                        return 8;
            }
            if(majorMinorOther == 4){
                if(doubleHarmonicModeIndex == 0 || 
                   doubleHarmonicModeIndex == 1 ||
                   doubleHarmonicModeIndex == 4 || 
                   doubleHarmonicModeIndex == 5 || 
                   doubleHarmonicModeIndex == 6 || 
                   doubleHarmonicModeIndex == 9 || 
                   doubleHarmonicModeIndex == 10 )
                    return 7;
                else
                    if(doubleHarmonicModeIndex == 7 ||
                       doubleHarmonicModeIndex ==11 )
                        return 6;
                    else
                        return 8;
            }
        }
        if(t == 6){ // 5
            if(majorMinorOther == 0){
                if(majorModeIndex == 0 || 
                   majorModeIndex == 2 ||
                   majorModeIndex == 3 || 
                   majorModeIndex == 5 || 
                   majorModeIndex == 7 || 
                   majorModeIndex == 8 || 
                   majorModeIndex ==10 )
                    return 9;
                else
                    return 8;
            }
            if(majorMinorOther == 1){
                if(melodicMinorModeIndex == 0 || 
                   melodicMinorModeIndex == 2 ||
                   melodicMinorModeIndex == 3 || 
                   melodicMinorModeIndex == 5 || 
                   melodicMinorModeIndex == 6 || 
                   melodicMinorModeIndex == 8 || 
                   melodicMinorModeIndex ==10 )
                    return 9;
                else
                    return 8;
            }
            if(majorMinorOther == 2){
                if(harmonicMinorModeIndex == 0 || 
                   // harmonicMinorModeIndex == 3 ||
                   harmonicMinorModeIndex == 4 || 
                   harmonicMinorModeIndex == 6 || 
                   harmonicMinorModeIndex == 7 || 
                   harmonicMinorModeIndex == 9 || 
                   harmonicMinorModeIndex ==11 )
                    return 8;
                else
                    return 9;
            }
            if(majorMinorOther == 3){
                if(harmonicMajorModeIndex == 0 || 
                   harmonicMajorModeIndex == 3 ||
                   harmonicMajorModeIndex == 4 || 
                   harmonicMajorModeIndex == 6 || 
                   // harmonicMajorModeIndex == 8 || 
                   harmonicMajorModeIndex == 9 || 
                   harmonicMajorModeIndex ==11 )
                    return 8;
                else
                    return 9;
            }
            if(majorMinorOther == 4){
                if(doubleHarmonicModeIndex == 0 || 
                   doubleHarmonicModeIndex == 3 ||
                   doubleHarmonicModeIndex == 4 || 
                   doubleHarmonicModeIndex == 5 || 
                   // doubleHarmonicModeIndex == 8 || 
                   doubleHarmonicModeIndex == 9 || 
                   doubleHarmonicModeIndex == 11 )
                    return 8;
                else
                    if(doubleHarmonicModeIndex == 1 )
                        return 10;
                    else
                        return 9;
            }
        }
        if(t == 7){ // 6
            if(majorMinorOther == 0){
                if(majorModeIndex == 0 || 
                   majorModeIndex == 1 ||
                   majorModeIndex == 3 || 
                   majorModeIndex == 5 || 
                   majorModeIndex == 6 || 
                   majorModeIndex == 8 || 
                   majorModeIndex ==10 ){
                    return 11;
                }else
                    return 10;
            }
            if(majorMinorOther == 1){
                if(melodicMinorModeIndex == 0 || 
                   melodicMinorModeIndex == 1 ||
                   melodicMinorModeIndex == 3 || 
                   melodicMinorModeIndex == 4 || 
                   melodicMinorModeIndex == 6 || 
                   melodicMinorModeIndex == 8 || 
                   melodicMinorModeIndex ==10 )
                    return 11;
                else
                    return 10;
            }
            if(majorMinorOther == 2){
                if(harmonicMinorModeIndex == 0 || 
                   harmonicMinorModeIndex == 1 ||
                   harmonicMinorModeIndex == 3 || 
                   harmonicMinorModeIndex == 4 || 
                   // harmonicMinorModeIndex == 5 || 
                   harmonicMinorModeIndex == 8 || 
                   harmonicMinorModeIndex == 9 )
                    return 11;
                else
                    if(harmonicMinorModeIndex ==11 )
                        return 9;
                    else
                        return 10;
            }
            if(majorMinorOther == 3){
                if(harmonicMajorModeIndex == 0 || 
                   harmonicMajorModeIndex == 1 ||
                   harmonicMajorModeIndex == 3 || 
                   harmonicMajorModeIndex == 5 || 
                   harmonicMajorModeIndex == 6 || 
                   harmonicMajorModeIndex == 8 || 
                   harmonicMajorModeIndex == 9 )
                    return 11;
                else
                    if(harmonicMajorModeIndex ==11 )
                        return 9;
                    else
                        return 10;
            }
            if(majorMinorOther == 4){
                if(doubleHarmonicModeIndex == 0 || 
                   doubleHarmonicModeIndex == 1 ||
                   doubleHarmonicModeIndex == 2 || 
                   doubleHarmonicModeIndex == 5 || 
                   doubleHarmonicModeIndex == 6 || 
                   doubleHarmonicModeIndex == 8 || 
                   doubleHarmonicModeIndex == 9 )
                    return 11;
                else
                    if(doubleHarmonicModeIndex == 4 ||
                       doubleHarmonicModeIndex ==11 )
                        return 9;
                    else
                        return 10;
            }
        }
        if(t == 8){ // 7
            return 12;
        }
}

function keyPressed(){
    if(majorMinorOther == 5)
        return;
    else{
        if(key == '1') playTone(modeCheck(1));
        if(key == '2') playTone(modeCheck(2));
        if(key == '3') playTone(modeCheck(3));
        if(key == '4') playTone(modeCheck(4));
        if(key == '5') playTone(modeCheck(5));
        if(key == '6') playTone(modeCheck(6));
        if(key == '7') playTone(modeCheck(7));
        if(key == '8') playTone(modeCheck(8));
    }
    // return false;
}

function mousePressed(){
    // console.log(mouseX/(shortAxis*scale) + "," + mouseY/(shortAxis*scale));
    let xpos, ypos, ypos1, offset = 0.08*(shortAxis*scale);
    xpos = 0.5*(shortAxis*scale);
    ypos = 0.11*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos        &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(12);
    }
    if(mouseX>xpos        && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(0);
    }
    xpos = 0.69*(shortAxis*scale);
    ypos = 0.17*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(1);
    }
    xpos = 0.83*(shortAxis*scale);
    ypos = 0.31*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(2);
    }
    xpos = 0.88*(shortAxis*scale);
    ypos = 0.5*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(3);
    }
    xpos = 0.83*(shortAxis*scale);
    ypos = 0.69*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(4);
    }
    xpos = 0.69*(shortAxis*scale);
    ypos = 0.83*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(5);
    }
    xpos = 0.5*(shortAxis*scale);
    ypos = 0.88*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(6);
    }
    xpos = 0.31*(shortAxis*scale);
    ypos = 0.83*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(7);
    }
    xpos = 0.17*(shortAxis*scale);
    ypos = 0.69*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(8);
    }
    xpos = 0.11*(shortAxis*scale);
    ypos = 0.5*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(9);
    }
    xpos = 0.17*(shortAxis*scale);
    ypos = 0.31*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(10);
    }
    xpos = 0.31*(shortAxis*scale);
    ypos = 0.17*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(11);
    }
    
    ////// CHANGE KEY
    xpos  = 1.15*(shortAxis*scale);
    ypos  = 0.19*(shortAxis*scale);
    ypos1 = 0.41*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        keySelect.selected(keyList[(keyIndex + 1)%12]);
        changeKey();
    }
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos1-offset && mouseY<ypos1+offset){
        keySelect.selected(keyList[(keyIndex + 11)%12]);
        changeKey();
    }
    if(showOverlay){
        ////// CHANGE PATTERN
        xpos  = 1.55*(shortAxis*scale);
        ypos  = 0.19*(shortAxis*scale); 
        ypos1 = 0.41*(shortAxis*scale);
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
        
        xpos  = 1.35*(shortAxis*scale);
        ypos  = 0.44*(shortAxis*scale); 
        ypos1 = 0.76*(shortAxis*scale);
        ////// CHANGE MAJOR MODE
        if(majorMinorOther == 0){
            var choice = majorModeSelect.value();
            let i = 0;
            for(let k = 0; k < majorModeList.length; k++){
                if (choice == majorModeList[k])
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
                if (choice == melodicMinorModeList[k])
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
                if (choice == harmonicMinorModeList[k])
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
                if (choice == harmonicMajorModeList[k])
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
                if (choice == doubleHarmonicModeList[k])
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
        xpos = 0.5*(shortAxis*scale);
        ypos = 0.5*(shortAxis*scale);
        offset = 0.1*(shortAxis*scale);
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            if(majorMinorOther != 5){
                if(!lockNotes){
                    speed = 1;
                    if(majorMinorOther == 0) keyIndex = keyIndex + (12 - majorModeIndex         )%12;
                    if(majorMinorOther == 1) keyIndex = keyIndex + (12 - melodicMinorModeIndex  )%12;
                    if(majorMinorOther == 2) keyIndex = keyIndex + (12 - harmonicMinorModeIndex )%12;
                    if(majorMinorOther == 3) keyIndex = keyIndex + (12 - harmonicMajorModeIndex )%12;
                    if(majorMinorOther == 4) keyIndex = keyIndex + (12 - doubleHarmonicModeIndex)%12; 
                }else{
                    speed = 0.5;
                    keyIndex = notesAreLocked();
                }
                lockNotes = !lockNotes;
            }
        }
    }
    xpos = 0.1*(shortAxis*scale);
    ypos = 0.06*(shortAxis*scale);
    offset = ypos;
    if(mouseX>xpos-xpos && mouseX<xpos+xpos &&
       mouseY>ypos-ypos && mouseY<ypos+ypos){
        showOverlay = !showOverlay;
    }
    ypos = 0.94*(shortAxis*scale);
    if(mouseX>xpos-xpos   && mouseX<xpos+xpos &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        showEnharmonic = (showEnharmonic + 1)%5;
        if(showEnharmonic == 0){
            // fillalpha = 150
            for (var i = 0; i < 13; i++)
                playedAlpha[i] = 40;
        }
    }
    return false;
}

function mouseWheel(event){
    let xpos, ypos, offset = 0.07*(shortAxis*scale);
    xpos  = 1.15*(shortAxis*scale);
    ypos  = 0.3*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        changeKeyMouse(event);
    }
    
    if(showOverlay){
        xpos  = 1.55*(shortAxis*scale);
        ypos  = 0.3*(shortAxis*scale);
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            changeModeMouse(event);
        }
        
        xpos  = 1.35*(shortAxis*scale);
        ypos  = 0.6*(shortAxis*scale);
        offset = offset*1.5;
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            if(majorMinorOther == 0) changeMajorModeMouse(event);
            if(majorMinorOther == 1) changeMelodicMinorModeMouse(event);
            if(majorMinorOther == 2) changeHarmonicMinorModeMouse(event);
            if(majorMinorOther == 3) changeHarmonicMajorModeMouse(event);
            if(majorMinorOther == 4) changeDoubleHarmonicModeMouse(event);
            if(majorMinorOther == 5) changeOtherModeMouse(event);
        }
    }
    
    // return false;
}

function doubleClicked(){
    let xpos, ypos, offset = 0.07*(shortAxis*scale);
    xpos  = 1.15*(shortAxis*scale);
    ypos  = 0.3*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        keyIndex = 0;
        keySelect.selected(keyList[0]);
    }
   
    xpos  = 1.55*(shortAxis*scale);
    ypos  = 0.3*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        majorMinorOther = 0;
        modeSelect.selected(modeList[0]);
        changeMode();
    }
    
    xpos  = 1.35*(shortAxis*scale);
    ypos  = 0.6*(shortAxis*scale);
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        majorModeSelect.selected(majorModeList[0]);
        melodicMinorModeSelect.selected(melodicMinorModeList[0]);
        harmonicMinorModeSelect.selected(harmonicMinorModeList[0]);
        harmonicMajorModeSelect.selected(harmonicMajorModeList[0]);
        doubleHarmonicModeSelect.selected(doubleHarmonicModeList[0]);
        otherModeSelect.selected(otherModeList[0]);
        changeMajorMode();
        changeMelodicMinorMode();
        changeHarmonicMinorMode();
        changeHarmonicMajorMode();
        changeDoubleHarmonicMode();
        changeOtherMode();
    }
    
    // return false;
}
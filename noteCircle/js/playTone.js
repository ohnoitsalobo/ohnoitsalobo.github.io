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

let root2_12 = 1.059463;
/*            C     C#/Db     D     D#/Eb     E       F     F#/Gb     G     G#/Ab    A   A#/Bb     B       C'    */
var tone = [
/* C  */ 440/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12,
/* C# */ 440/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12,
/* D  */ 440/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12,
/* Eb */ 440/root2_12/root2_12/root2_12/root2_12/root2_12/root2_12,
/* E  */ 440/root2_12/root2_12/root2_12/root2_12/root2_12,
/* F  */ 440/root2_12/root2_12/root2_12/root2_12,
/* F# */ 440/root2_12/root2_12/root2_12,
/* G  */ 440/root2_12/root2_12,
/* G# */ 440/root2_12,
/* A  */ 440,
/* Bb */ 440*root2_12,
/* B  */ 440*root2_12*root2_12,
/* C' */ 440*root2_12*root2_12*root2_12,
];

function playTone(t){
    var transpose = floor(t/13+1);
    for(var i = 0; i < notesAreLocked(); i++)
        transpose *= 1.059463;
    synth.triggerAttackRelease(tone[t%13]*transpose, "8n");
    if(keyIsPressed && (t%13)%12 == 0 ){
        playedAlpha[ 0] = 100;
        playedAlpha[12] = 100;
    }else
        playedAlpha[t%13] = 100;
}
function playTones(a, b){
    playTone(a);
    playTone(b);
}
function playTriad(a){
    playTone(modeCheck(a));
    playTone(modeCheck((a+2))%8);
    playTone(modeCheck((a+4))%8);
}

/*  */
function modeCheck(t){
    if     (t == 1){ // 0
        return 0;
    }
    else if(t == 2){ // 1
        if     (majorMinorOther == 0){
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
        else if(majorMinorOther == 1){
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
        else if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==10 )
                return 2;
            else {
                if(harmonicMinorModeIndex == 8)
                    return 3;
                else
                    return 1;
            }
        }
        else if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 2 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==10 )
                return 2;
            else {
                if(harmonicMajorModeIndex == 8)
                    return 3;
                else
                    return 1;
            }
        }
        else if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 3 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex ==10 || 
               doubleHarmonicModeIndex ==11 )
                return 1;
            else {
                if(doubleHarmonicModeIndex == 1 || 
                   doubleHarmonicModeIndex == 8)
                    return 3;
                else
                    return 2;
            }
        }
    }
    else if(t == 3){ // 2
        if     (majorMinorOther == 0){
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
        else if(majorMinorOther == 1){
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
        else if(majorMinorOther == 2){
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
        else if(majorMinorOther == 3){
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
        else if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 3 || 
               // doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 )
                return 4;
            else {
                if(doubleHarmonicModeIndex == 11)
                    return 2;
                else
                    return 3;
            }
        }
    }
    else if(t == 4){ // 3
        if     (majorMinorOther == 0){
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
        else if(majorMinorOther == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==10 )
                return 5;
            else {
                if(melodicMinorModeIndex == 11)
                    return 4;
                else
                    return 6;
            }
        }
        else if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 2 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==10 )
                return 5;
            else {
                if(harmonicMinorModeIndex == 11)
                    return 4;
                else
                    return 6;
            }
        }
        else if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 2 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==11 )
                return 5;
            else {
                if(harmonicMajorModeIndex == 4)
                    return 4;
                else
                    return 6;
            }
        }
        else if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 2 ||
               doubleHarmonicModeIndex == 3 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 11 )
                return 5;
            else {
                if(doubleHarmonicModeIndex == 4)
                    return 4;
                else
                    return 6;
            }
        }
    }
    else if(t == 5){ // 4
        if     (majorMinorOther == 0){
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
        else if(majorMinorOther == 1){ 
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                return 7;
            else {
                if(melodicMinorModeIndex == 9 ||
                   melodicMinorModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
        else if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex ==10 )
                return 7;
            else {
                if(harmonicMinorModeIndex == 2 ||
                   harmonicMinorModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
        else if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==10 )
                return 7;
            else {
                if(harmonicMajorModeIndex == 2 ||
                   harmonicMajorModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
        else if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 5 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 9 || 
               doubleHarmonicModeIndex == 10 )
                return 7;
            else {
                if(doubleHarmonicModeIndex == 7 ||
                   doubleHarmonicModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
    }
    else if(t == 6){ // 5
        if     (majorMinorOther == 0){
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
        else if(majorMinorOther == 1){
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
        else if(majorMinorOther == 2){
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
        else if(majorMinorOther == 3){
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
        else if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 3 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 5 || 
               // doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 || 
               doubleHarmonicModeIndex == 11 )
                return 8;
            else {
                if(doubleHarmonicModeIndex == 1 )
                    return 10;
                else
                    return 9;
            }
        }
    }
    else if(t == 7){ // 6
        if     (majorMinorOther == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 1 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 6 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 )
                return 11;
            else
                return 10;
        }
        else if(majorMinorOther == 1){
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
        else if(majorMinorOther == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 4 || 
               // harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex == 9 )
                return 11;
            else {
                if(harmonicMinorModeIndex ==11 )
                    return 9;
                else
                    return 10;
            }
        }
        else if(majorMinorOther == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex == 9 )
                return 11;
            else {
                if(harmonicMajorModeIndex ==11 )
                    return 9;
                else
                    return 10;
            }
        }
        else if(majorMinorOther == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 2 || 
               doubleHarmonicModeIndex == 5 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 )
                return 11;
            else {
                if(doubleHarmonicModeIndex == 4 ||
                   doubleHarmonicModeIndex ==11 )
                    return 9;
                else
                    return 10;
            }
        }
    }
    else if(t == 8){ // 7
        return 12;
    }
    else
        return 0;
}
/*  */

function keyPressed(){
    if(majorMinorOther == 5)
        return;
    else{
             if(key == '1' ) playTone(modeCheck(1));
        else if(key == '2' ) playTone(modeCheck(2));
        else if(key == '3' ) playTone(modeCheck(3));
        else if(key == '4' ) playTone(modeCheck(4));
        else if(key == '5' ) playTone(modeCheck(5));
        else if(key == '6' ) playTone(modeCheck(6));
        else if(key == '7' ) playTone(modeCheck(7));
        else if(key == '8' ) playTone(modeCheck(8));
        else if(key == '9' ) playTone(modeCheck(2)+13);
        else if(key == '0' ) playTone(modeCheck(3)+13);
        else if(key == '-' ) playTone(modeCheck(4)+13);
        else if(key == '=' ) playTone(modeCheck(5)+13);
        else if(key == '[' ) playTone(modeCheck(6)+13);
        else if(key == ']' ) playTone(modeCheck(7)+13);
        else if(key == '\\') playTone(modeCheck(8)+13);
    }
    // return false;
}

function mouseReleased(){
    // mouseOverText.html("Tap here to enable / disable tips.");
    ////// PLAY TONES
    let xpos, ypos, ypos1, offset = 0.08*scaled;
    xpos = 0.5*scaled;
    ypos = 0.11*scaled;
    if(mouseX>xpos-offset && mouseX<xpos        &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(12);
        mouseOverText.html(
            "The <b><i>octave</i></b> of a given note is the same 'note name' as the note, i.e. it is simultaneously the same note <i>and</i> a different one.<br />\
            An octave (P8) interval <i>above</i> physically rings out at exactly <i>twice</i> the physical frequency; conversely, an octave <i>below</i> rings out at <i>half</i> the frequency.<br />\
            Since we commonly use a scale system built around 7 divisions of the scale, the prefix 'oct-' indicates that this is the 8th note (which is also the first note, repeated).<br /><br />\
            <button onclick=\"playTones(0, 12);\">Click here to hear the interval.</button>"
        );
    }
    if(mouseX>xpos        && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(0);
        mouseOverText.html(
            "The <b><i>root</i></b> is the 'home' note of any given scale, also known as <i>tonic</i>, or <i>key</i>. The name <i>root</i> is also commonly used to refer to the chord that is built by playing this first note along with the 3rd and 5th note of the scale - the 'root chord' or 'root triad'.<br />\
            This interval is called a <b><i>unison</i></b> (1) interval, and in certain contexts it is also called a <b><i>diminished second</i></b> (d2).<br /><br />\
            <button onclick=\"playTone(0);\">Click here to hear the interval.</button>"
        );
    }
    xpos = 0.69*scaled;
    ypos = 0.17*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(1);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor second</i></b> (min2, m2) or <b><i>flat 2</i></b> (\u266D2), or <br />\
            <b><i>augmented unison</i></b> (aug1, A1) or <b><i>sharp 1</i></b> (\u266F1).<br /><br />\
            <button onclick=\"playTones(0, 1);\">Click here to hear the m2 interval.</button><br /><br />\
            <small>The minor second is 1 semitone above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major seventh</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 11);\">Click here to hear the inverted m2 interval (M7).</button>"
        );
    }
    xpos = 0.83*scaled;
    ypos = 0.31*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(2);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major second</i></b> (maj2, M2) or just <b>2</b>, or <br />\
            <b><i>diminished third</i></b> (dim3, d3).<br /><br />\
            <button onclick=\"playTones(0, 2);\">Click here to hear the M2 interval.</button><br /><br />\
            <small>The major second is 2 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor seventh</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 10);\">Click here to hear the inverted M2 interval (m7).</button>"
        );
    }
    xpos = 0.88*scaled;
    ypos = 0.5*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(3);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor third</i></b> (min3, m3) or <b><i>flat 3</i></b> (\u266D3), or <br />\
            <b><i>augmented second</i></b> (aug2, A2) or <b><i>sharp 2</i></b> (\u266F2).<br /><br />\
            <button onclick=\"playTones(0, 3);\">Click here to hear the m3 interval.</button><br /><br />\
            <small>The minor third is 3 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major sixth</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 9);\">Click here to hear the inverted m3 interval (M6).</button>"
        );
    }
    xpos = 0.83*scaled;
    ypos = 0.69*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(4);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major third</i></b> (maj3, M3) or just <b>3</b>, or <br />\
            <b><i>diminished fourth</i></b> (dim4, d4) or <b><i>flat 4</i></b> (\u266D4).<br /><br />\
            <button onclick=\"playTones(0, 4);\">Click here to hear the M3 interval.</button><br /><br />\
            <small>The major third is 4 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor sixth</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 8);\">Click here to hear the inverted M3 interval (m6).</button>"
        );
    }
    xpos = 0.69*scaled;
    ypos = 0.83*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(5);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>perfect fourth</i></b> (perf4, P4), or<br />\
            <b><i>augmented third</i></b> (aug3, A3) or <b><i>sharp 3</i></b> (\u266F3).<br /><br />\
            <button onclick=\"playTones(0, 5);\">Click here to hear the P4 interval.</button><br /><br />\
            <small>The perfect fourth is 5 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>perfect fifth</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 7);\">Click here to hear the inverted P4 interval (P5).</button>"
        );
    }
    xpos = 0.5*scaled;
    ypos = 0.88*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(6);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as:<br /><br />\
            <b><i>augmented fourth</i></b> (aug4, A4) or <b><i>sharp 4</i></b> (\u266F4)<br />\
            <b><i>diminished fifth</i></b> (dim5, d5), or <b><i>flat 5</i></b> (\u266D5),<br />\
            the <b><i>tritone</i></b>, or more dramatically the <b><i>devil's interval</i></b>.<br /><br />\
            <button onclick=\"playTones(0, 6);\">Click here to hear the devil's interval.</button><br /><br />\
            <small>The tritone is 6 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you ... the same interval!<br /><br />\
            There is a lot of interesting history behind this one interval, but suffice it to say that 'traditional' composers were often very reluctant, or outright refused, to use the 'tritone' interval as a basis in their compositions, due to its perceived dissonance.</small>"
        );
    }
    xpos = 0.31*scaled;
    ypos = 0.83*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(7);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>perfect fifth</i></b> (perf5, P5),<br />\
            <b><i>diminished sixth</i></b> (dim6, d6).<br /><br />\
            <button onclick=\"playTones(0, 7);\">Click here to hear the P5 interval.</button><br /><br />\
            <small>The perfect fifth is 7 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>perfect fourth</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 5);\">Click here to hear the inverted P5 interval (P4).</button>"
        );

    }
    xpos = 0.17*scaled;
    ypos = 0.69*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(8);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor sixth</i></b> (min6, m6) or <b><i>flat 6</i></b> (\u266D6), or <br />\
            <b><i>augmented fifth</i></b> (aug5, A5) or <b><i>sharp 5</i></b> (\u266F5).<br /><br />\
            <button onclick=\"playTones(0, 8);\">Click here to hear the m6 interval.</button><br /><br />\
            <small>The minor sixth is 8 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major third</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 4);\">Click here to hear the inverted m6 interval (M3).</button>"
        );
    }
    xpos = 0.11*scaled;
    ypos = 0.5*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(9);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major sixth</i></b> (maj6, M6) or just <b>6</b>, or <br />\
            <b><i>diminished seventh</i></b> (dim7, d7).<br /><br />\
            <button onclick=\"playTones(0, 9);\">Click here to hear the M6 interval.</button><br /><br />\
            <small>The major sixth is 9 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor third</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 3);\">Click here to hear the inverted M6 interval (m3).</button>"
        );
    }
    xpos = 0.17*scaled;
    ypos = 0.31*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(10);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor seventh</i></b> (min7, m7), or <b><i>flat 7</i></b> (\u266D7), or <br />\
            <b><i>augmented sixth</i></b> (aug6, A6) or <b><i>sharp 6</i></b> (\u266F6).<br /><br />\
            <button onclick=\"playTones(0, 10);\">Click here to hear the m7 interval.</button><br /><br />\
            <small>The minor seventh is 10 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major second</i>.</small><br /><br />\
            <button onclick=\"playTones(0, 2);\">Click here to hear the inverted m7 interval (M2).</button>"
        );
    }
    xpos = 0.31*scaled;
    ypos = 0.17*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        playTone(11);
        mouseOverText.html(
            "In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major seventh</i></b> (maj7, M7) or just <b>7</b>, or <br />\
            <b><i>diminished octave</i></b> (dim8, d8) or <b><i>flat 8</i></b> (\u266D8).<br /><br />\
            <button onclick=\"playTones(0, 11);\">Click here to hear the M7 interval.</button><br /><br />\
            <small>The major seventh is 11 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor second</i>.</small><br /><br />\
            <button onclick=\"playTones(0   , 1);\">Click here to hear the inverted M7 interval (m2).</button>"
        );
    }
    
    ////// CHANGE KEY
    xpos  = 1.15*scaled;
    ypos  = 0.19*scaled;
    ypos1 = 0.41*scaled;
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
        xpos  = 1.55*scaled;
        ypos  = 0.19*scaled; 
        ypos1 = 0.41*scaled;
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
        
        xpos  = 1.35*scaled;
        ypos  = 0.44*scaled; 
        ypos1 = 0.76*scaled;
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
        xpos = 0.5*scaled;
        ypos = 0.5*scaled;
        offset = 0.1*scaled;
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
                    mouseOverText.html("With the rotation locked together, the notes currently highlighted for a given mode will remain highlighted until this option is turned off.<br /><br />However, you can still adjust the key independently.");
                }else{
                    speed = 0.4;
                    keyIndex = notesAreLocked();
                }
                lockNotes = !lockNotes;
            }
        }
    }
////// AUTOPLAY SCALE
    xpos  = 1.35*scaled;
    ypos  = 0.6*scaled;
    offset = 0.08*scaled
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        if(majorMinorOther != 5){
            autoplay = millis();
            mouseOverText.html(mouseOver);
        }
    }
////// SHOW / HIDE TIPS
    xpos = 1.75*scaled;
    ypos = 0.5*scaled;
    offset = 0.1*scaled;
    if(mouseX>xpos-offset && mouseX<xpos &&
       mouseY>ypos-offset && mouseY<ypos+offset){
           hideTips();
        }

    xpos = 0.1*scaled;
    ypos = 0.06*scaled;
    offset = ypos;
    if(mouseX>xpos-xpos && mouseX<xpos+xpos &&
       mouseY>ypos-ypos && mouseY<ypos+ypos){
        showOverlay = !showOverlay;
        if(!showOverlay)
            mouseOverText.html("The <b><i>chromatic scale</i></b> is simply all possible notes in sequence. Here you see the 12 notes represented like piano keys wrapped around a circle instead of lying flat. The majority of modern music is built out of patterns and permutations of these 12 notes in different octaves, and this utility shows 5 of those patterns in detail.<br /><br />\
            However, there are a few other patterns that you can explore here (see 'Other scales') and elsewhere online.");
    }
    ypos = 0.94*scaled;
    if(mouseX>xpos-xpos   && mouseX<xpos+xpos &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        showEnharmonic = (showEnharmonic + 1)%5;
        if(showEnharmonic == 0){
            for (var i = 0; i < 13; i++)
                playedAlpha[i] = 40;
        }
        mouseOverText.html(
            "<b><i>Enharmonic notes</i></b> are basically another way of saying <i>\"the same note, but 'spelled' differently\"</i> - usually to make it easier to read. It is analogous to saying <small>(6 = 5 + 1)</small> vs <small>(6 = 3 + 3)</small>; it doesn't change the end result, but can be useful when you're trying to understand the source material. Whether you call something a sharp or a flat note depends on what scale you're working in and how many sharps and/or flats it needs to be easily readable.<br />\
            In common Western music,<br />\
            <big>\u266F</big> = +1 semitone <small>(sharp)</small><br />\
            <big>\u266D</big> = -1 semitone <small>(flat)</small><br />\
            <big>\u{1D12A}</big> = +2 semitones <small>(double sharp)</small><br />\
            <big>\u{1D12B}</big> = -2 semitones <small>(double flat)</small><br />\
            <small>The 'double' modifiers are commonly used to avoid repeating a letter name when constructing scales (see the images below; no notes are repeated, so while it may <i>appear</i> complicated, there is less visual confusion when reading).</small><br /><br />\
            <small>A caveat is that this 'rule' does not directly apply in <i>all</i> systems of music - that is to say, F\u266F is not <i>always</i> the same as G\u266D <i>everywhere</i> - but for the purposes of this app (and most common music derived from Western classical rules), enharmonically 're-spelled' notes are exactly the same notes.</small>"
        );
    }
    return false;
}

function mouseWheel(event){
    let xpos, ypos, offset = 0.07*scaled;
    xpos  = 1.15*scaled;
    ypos  = 0.3*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        changeKeyMouse(event);
    }
    
    if(showOverlay){
        xpos  = 1.55*scaled;
        ypos  = 0.3*scaled;
        if(mouseX>xpos-offset && mouseX<xpos+offset &&
           mouseY>ypos-offset && mouseY<ypos+offset){
            changeModeMouse(event);
        }
        
        xpos  = 1.35*scaled;
        ypos  = 0.6*scaled;
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
    return false;
}

function doubleClicked(){
    let xpos, ypos, offset = 0.07*scaled;
    xpos  = 1.15*scaled;
    ypos  = 0.3*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        keyIndex = 0;
        keySelect.selected(keyList[0]);
    }
   
    xpos  = 1.55*scaled;
    ypos  = 0.3*scaled;
    if(mouseX>xpos-offset && mouseX<xpos+offset &&
       mouseY>ypos-offset && mouseY<ypos+offset){
        majorMinorOther = 0;
        modeSelect.selected(modeList[0]);
        changeMode();
    }
    
    xpos  = 1.35*scaled;
    ypos  = 0.6*scaled;
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
}


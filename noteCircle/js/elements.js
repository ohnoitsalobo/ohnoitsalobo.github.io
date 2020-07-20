// C  =  0; //  0
// Cs =  1; //  1
// Db =  2; //  3
// D  =  3; //  4
// Ds =  4; //  6
// Eb =  5; //  7
// E  =  6; //  8
// F  =  7; // 10
// Fs =  8; // 11
// Gb =  9; // 13
// G  = 10; // 14
// Gs = 11; // 16
// Ab = 12; //  2
// A  = 13; //  5
// As = 14; //  9
// Bb = 15; // 12
// B  = 16; // 15
const imageOrder = [ 0, 1, 3, 4, 6, 7, 8, 10, 11, 13, 14, 16, 2, 5, 9, 12, 15];
// const Bs
// const Cb
// const Es
// const Fb
/*  */
let majorScale = [];
let melodicMinorScale = [];
let harmonicMinorScale = [];
let harmonicMajorScale = [];
let doubleHarmonicScale = [];

function loadScales(){
    let ext = ".png";
    let majorpath          = "modes/all/major-";
    let melodicminorpath   = "modes/all/melodicminor-";
    let harmonicminorpath  = "modes/all/harmonicminor-";
    let harmonicmajorpath  = "modes/all/harmonicmajor-";
    let doubleharmonicpath = "modes/all/doubleharmonic-";
    for(let j = 0; j < 17; j++){
        for(let i = 0; i < 7; i++){
            let index = i+( j*7);
            let filenum = i+(imageOrder[j]*7)+2;
            majorScale          [index] = majorpath          + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + ext;
            melodicMinorScale   [index] = melodicminorpath   + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + ext;
            harmonicMinorScale  [index] = harmonicminorpath  + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + ext;
            harmonicMajorScale  [index] = harmonicmajorpath  + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + ext;
            doubleHarmonicScale [index] = doubleharmonicpath + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + ext;
        }
    }
}                                                          

function drawNotes(){
    img1.remove();
    img2.remove();
    let index = notesAreLocked();
    let offset = 0;
    if     (index == 1 ) offset = 12;
    else if(index == 3 ) offset = 13;
    else if(index == 6 ) offset = 14;
    else if(index == 8 ) offset = 15;
    else if(index == 10) offset = 16;
    let alt1 = "Pattern: " + modeList[majorMinorOther] + "\nKey: " + keySharpList[notesAreLocked()] + "\n" + allModesList[majorMinorOther][currentlySelectedMode]; // "Notation image 1";
    let alt2 = "Pattern: " + modeList[majorMinorOther] + "\nKey: " + keyFlatList [notesAreLocked()] + "\n" + allModesList[majorMinorOther][currentlySelectedMode]; // "Notation image 2";
    if     (majorMinorOther == 0){
        img1 = createImg(majorScale[index*7+currentlySelectedMode], alt1);
        if(offset > 0) 
            img2 = createImg(majorScale[offset*7+currentlySelectedMode], alt2);
    }
    else if(majorMinorOther == 1){
        img1 = createImg(melodicMinorScale[index*7+currentlySelectedMode], alt1);
        if(offset > 0) 
            img2 = createImg(melodicMinorScale[offset*7+currentlySelectedMode], alt2);
    }
    else if(majorMinorOther == 2){
        img1 = createImg(harmonicMinorScale[index*7+currentlySelectedMode], alt1);
        if(offset > 0) 
            img2 = createImg(harmonicMinorScale[offset*7+currentlySelectedMode], alt2);
    }
    else if(majorMinorOther == 3){
        img1 = createImg(harmonicMajorScale[index*7+currentlySelectedMode], alt1);
        if(offset > 0) 
            img2 = createImg(harmonicMajorScale[offset*7+currentlySelectedMode], alt2);
    }
    else if(majorMinorOther == 4){
        img1 = createImg(doubleHarmonicScale[index*7+currentlySelectedMode], alt1);
        if(offset > 0) 
            img2 = createImg(doubleHarmonicScale[offset*7+currentlySelectedMode], alt2);
    }
    img1.parent('img1');
    img1.elt.title = alt1;
    if(offset > 0){
        img2.parent('img2');
        img2.elt.title = alt2;
    }
    showImg = true;
}
/*  */

let playedAlpha = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
let fillcolor = 150, fillalpha = 0;

/*  */
function createNoteCircle(){
    fill(fillcolor, fillalpha); noStroke();
    Size = 0.97*scaled;
    ellipse(0, 0, Size, Size);
    Size = 0.088*scaled;
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textFont('Georgia');
    let xpos = 0.65*scaled, ypos = -0.2*scaled;
    push();
        rotate(PI/2);
        textSize(Size*0.4); fill(0); text('ROOT', 0, -5.25*Size);
        textSize(Size*0.6); fill((lockNotes && majorMinorOther != 5) ? 0 : 255); noStroke();
        if      (showEnharmonic == 1)   text("Key:\n" + keySharpList   [notesAreLocked()], xpos, ypos);
        else if (showEnharmonic == 2)   text("Key:\n" + keySharperList [notesAreLocked()], xpos, ypos);
        else if (showEnharmonic == 3)   text("Key:\n" + keyFlatList    [notesAreLocked()], xpos, ypos);
        else if (showEnharmonic == 4)   text("Key:\n" + keyFlatterList [notesAreLocked()], xpos, ypos);
        else                            text("Key:\n" + keyList        [notesAreLocked()], xpos, ypos);
        textSize(Size*0.5); fill(255);
        if(majorMinorOther == 5)
            text(modeList[majorMinorOther], xpos/0.62, ypos);
        else
            text("Base pattern:\n" + modeList[majorMinorOther], xpos/0.62, ypos);
        fill(0, 0, 100); textSize(Size*0.65); 
        text("Cheat sheet for scales and modes", 0.8*scaled, -0.47*scaled);
        fill(0); textSize(Size*0.35);
        text("Click/tap the arrows or use the mouse scroll wheel to\nexplore various keys and patterns", 0.85*scaled, -0.39*scaled);
        textSize(Size*0.36);
        textAlign(LEFT, TOP); 
        text("Tap here to hide/show\nthe pattern\noverlay", -0.5*scaled, -0.49*scaled);
        textAlign(LEFT, BOTTOM); 
        text("Tap here\nto cycle through\nenharmonic note names", -0.5*scaled, 0.49*scaled);
        textSize(0.75*Size); 
        if(showEnharmonic != 0) { stroke(255, 150); strokeWeight(3); }
        let _xpos = -0.49*scaled, _ypos = 0.375*scaled;
             if(showEnharmonic == 1) text("\u266F",           _xpos, _ypos);
        else if(showEnharmonic == 2) text("\u266F \u{1D12A}", _xpos, _ypos);
        else if(showEnharmonic == 3) text("\u266D",           _xpos, _ypos);
        else if(showEnharmonic == 4) text("\u266D \u{1D12B}", _xpos, _ypos);
        else                         text("\u266F \u266D",    _xpos, _ypos);
        noStroke();
        textAlign(CENTER, CENTER);
        if(majorMinorOther!=5) {
        textSize(Size*0.35); 
            if(showTips)
                text("Tap different elements to\nread about them in\nthe box to the right.", 0.85*scaled, 0.4*scaled);
            else
                text("To hear the highlighted scale:\n- Tap the notes on the circle\n- Tap the mode name above\n- Use keyboard number keys (press Shift to hear chords)", 0.85*scaled, 0.4*scaled);
            if(showOverlay){
                if(!lockNotes){
                    fill(0, fillalpha);
                    text("Tap here to lock\nthe visible notes\nin the pattern", 0*scaled, 0*scaled);
                }else{
                    fill(255);
                    text("Mode rotation\nlocked together", 0*scaled, 0*scaled);
                }
            }
            textSize(Size*0.35);
        }
        else {
            textSize(Size*0.4); 
            text("To hear these alterative scales,\ntap the highlighted note names.", 0.85*scaled, 0.4*scaled);
        }
        stroke(255); strokeWeight(5*scale);
        line(xpos, ypos-1.2*Size, xpos+0.6*Size, ypos-Size);
        line(xpos, ypos-1.2*Size, xpos-0.6*Size, ypos-Size);
        line(xpos, ypos+1.2*Size, xpos+0.6*Size, ypos+Size);
        line(xpos, ypos+1.2*Size, xpos-0.6*Size, ypos+Size);
        stroke(255, fillalpha);
        line(xpos/0.62, ypos-1.2*Size, xpos/0.62+0.6*Size, ypos-Size);
        line(xpos/0.62, ypos-1.2*Size, xpos/0.62-0.6*Size, ypos-Size);
        line(xpos/0.62, ypos+1.2*Size, xpos/0.62+0.6*Size, ypos+Size);
        line(xpos/0.62, ypos+1.2*Size, xpos/0.62-0.6*Size, ypos+Size);
        line(0.85*scaled, 0.1*scaled-1.7*Size, 0.85*scaled+0.6*Size, 0.1*scaled-1.5*Size);
        line(0.85*scaled, 0.1*scaled-1.7*Size, 0.85*scaled-0.6*Size, 0.1*scaled-1.5*Size);
        line(0.85*scaled, 0.1*scaled+1.7*Size, 0.85*scaled+0.6*Size, 0.1*scaled+1.5*Size);
        line(0.85*scaled, 0.1*scaled+1.7*Size, 0.85*scaled-0.6*Size, 0.1*scaled+1.5*Size);
    pop();
    push();
        rotate(-currentNoteRotation);
        textFont('Times New Roman');
        for(var i = 0; i < noteRotation.length; i++){
        push();
            rotate(noteRotation[i]);
            translate(0, -4.2*Size);
            rotate(-noteRotation[i]+currentNoteRotation+PI/2);
            textSize(Size); fill(255);
            if( i == 1 || i == 4 || i == 6 || i == 9 || i == 11 )
                fill(0); textSize(Size*0.85);
            if(showEnharmonic == 1){
                text(keySharpList[(i+9)%12], 0, 0);
                if     (i==3) { textSize(Size*0.3); text('B\u266F', -Size*0.4, -Size*0.5 ); }
                else if(i==8) { textSize(Size*0.3); text('E\u266F', -Size*0.4, -Size*0.5 ); }
            }
            else if(showEnharmonic == 2)
                text(keySharperList[(i+9)%12], 0, 0);
            else if(showEnharmonic == 3){
                text(keyFlatList[(i+9)%12], 0, 0);
                if     (i==2) { textSize(Size*0.3); text('C\u266D',  Size*0.4,  Size*0.35); } 
                else if(i==7) { textSize(Size*0.3); text('F\u266D',  Size*0.4,  Size*0.35); } 
            }
            else if(showEnharmonic == 4)
                text(keyFlatterList[(i+9)%12], 0, 0);
            else{
                if( i == 1 || i == 4 || i == 6 || i == 9 || i == 11 ){
                    textSize(Size*0.7);
                    let xpos = 0.2*Size; let ypos = 0.3*Size;
                    text(keyList[(i+9)%12].substr(0, 2), -xpos, -ypos); 
                    text(keyList[(i+9)%12].substr(3, 2),  xpos,  ypos); 
                }else{
                    text(keyList[(i+9)%12], 0, 0); 
                    if     (i==2) { textSize(Size*0.3); text('C\u266D',  Size*0.4,  Size*0.35); } 
                    else if(i==3) { textSize(Size*0.3); text('B\u266F', -Size*0.4, -Size*0.5 ); }
                    else if(i==7) { textSize(Size*0.3); text('F\u266D',  Size*0.4,  Size*0.35); } 
                    else if(i==8) { textSize(Size*0.3); text('E\u266F', -Size*0.4, -Size*0.5 ); }
                }
            }

            if(pianoColors){
                rotate(noteRotation[i]-currentNoteRotation-PI/2);
                translate(0, 1.9*Size);
                fill(255); noStroke();
                     if(i==0) { rect(0, 0, 0.5*Size, 1.3*Size); }
                else if(i==2) { rect(0, 0, 0.5*Size, 1.3*Size); }
                else if(i==3) { rect(0, 0, 0.5*Size, 1.3*Size); }
                else if(i==5) { rect(0, 0, 0.5*Size, 1.3*Size); }
                else if(i==7) { rect(0, 0, 0.5*Size, 1.3*Size); }
                else if(i==8) { rect(0, 0, 0.5*Size, 1.3*Size); }
                else if(i==10){ rect(0, 0, 0.5*Size, 1.3*Size); }

                fill(0);
                     if(i==1) { rect(0, 0, 0.3*Size, 1.3*Size); }
                else if(i==4) { rect(0, 0, 0.3*Size, 1.3*Size); }
                else if(i==6) { rect(0, 0, 0.3*Size, 1.3*Size); }
                else if(i==9) { rect(0, 0, 0.3*Size, 1.3*Size); }
                else if(i==11){ rect(0, 0, 0.3*Size, 1.3*Size); }
            }
        pop();
        }
    pop();
    currentNoteRotation     = lerp(currentNoteRotation,    noteRotation[notesAreLocked()       %12], speed);
    majorRotation           = lerp(majorRotation,          noteRotation[majorModeIndex         %12], speed);
    melodicMinorRotation    = lerp(melodicMinorRotation,   noteRotation[melodicMinorModeIndex  %12], speed);
    harmonicMinorRotation   = lerp(harmonicMinorRotation,  noteRotation[harmonicMinorModeIndex %12], speed);
    harmonicMajorRotation   = lerp(harmonicMajorRotation,  noteRotation[harmonicMajorModeIndex %12], speed);
    doubleHarmonicRotation  = lerp(doubleHarmonicRotation, noteRotation[doubleHarmonicModeIndex%12], speed);
}
/*  */

function createMajorModeCircle(){
    textFont('Georgia');
    push();
        rotate(-majorRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==7 || i==8 || i==10){
                highlightRect();
            }
            if(i==1 || i==4 || i==6 || i==9 || i==11){
                hideRect();
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
        push();
            textSize(Size*0.69); stroke(0, fillalpha); strokeWeight(0.5);
            fill(lockNotes ? 0 : 255);
            rotate(PI/2+majorRotation); translate(0.85*scaled, 0.1*scaled);
            if     (majorModeIndex%12==0 ) text(majorModeList[0], 0, 0);
            else if(majorModeIndex%12==2 ) text(majorModeList[1], 0, 0);
            else if(majorModeIndex%12==4 ) text(majorModeList[2], 0, 0);
            else if(majorModeIndex%12==5 ) text(majorModeList[3], 0, 0);
            else if(majorModeIndex%12==7 ) text(majorModeList[4], 0, 0);
            else if(majorModeIndex%12==9 ) text(majorModeList[5], 0, 0);
            else if(majorModeIndex%12==11) text(majorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createMelodicMinorModeCircle(){
    textFont('Georgia');
    push();
        rotate(-melodicMinorRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==6 || i==8 || i==10){
                highlightRect();
            }
            if(i==1 || i==4 || i==7 || i==9 || i==11){
                hideRect();
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
        push();
            textSize(Size*0.69); stroke(0); strokeWeight(0.5);
            fill(lockNotes ? 0 : 255);
            rotate(PI/2+melodicMinorRotation); translate(0.85*scaled, 0.1*scaled);
            if     (melodicMinorModeIndex%12==0 ) text(melodicMinorModeList[0], 0, 0);
            else if(melodicMinorModeIndex%12==2 ) text(melodicMinorModeList[1], 0, 0);
            else if(melodicMinorModeIndex%12==3 ) text(melodicMinorModeList[2], 0, 0);
            else if(melodicMinorModeIndex%12==5 ) text(melodicMinorModeList[3], 0, 0);
            else if(melodicMinorModeIndex%12==7 ) text(melodicMinorModeList[4], 0, 0);
            else if(melodicMinorModeIndex%12==9 ) text(melodicMinorModeList[5], 0, 0);
            else if(melodicMinorModeIndex%12==11) text(melodicMinorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createHarmonicMinorModeCircle(){
    textFont('Georgia');
    push();
        rotate(-harmonicMinorRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==2 || i==3 || i==5 || i==6 || i==8 || i==10 || i==11){
                highlightRect();
            }
            if(i==0 || i==1 || i==4 || i==7 || i==9){
                hideRect();
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
        push();
            textSize(Size*0.69); stroke(0); strokeWeight(0.5);
            fill(lockNotes ? 0 : 255);
            rotate(PI/2+harmonicMinorRotation); translate(0.85*scaled, 0.1*scaled);
            if     (harmonicMinorModeIndex%12==0 ) text(harmonicMinorModeList[0], 0, 0);
            else if(harmonicMinorModeIndex%12==2 ) text(harmonicMinorModeList[1], 0, 0);
            else if(harmonicMinorModeIndex%12==3 ) text(harmonicMinorModeList[2], 0, 0);
            else if(harmonicMinorModeIndex%12==5 ) text(harmonicMinorModeList[3], 0, 0);
            else if(harmonicMinorModeIndex%12==7 ) text(harmonicMinorModeList[4], 0, 0);
            else if(harmonicMinorModeIndex%12==8 ) text(harmonicMinorModeList[5], 0, 0);
            else if(harmonicMinorModeIndex%12==11) text(harmonicMinorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createHarmonicMajorModeCircle(){
    textFont('Georgia');
    push();
        rotate(-harmonicMajorRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==2 || i==3 || i==5 || i==7 || i==8 || i==10 || i==11){
                highlightRect();
            }
            if(i==0 || i==1 || i==4 || i==6 || i==9){
                hideRect();
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
        push();
            textSize(Size*0.69); stroke(0); strokeWeight(0.5);
            fill(lockNotes ? 0 : 255);
            rotate(PI/2+harmonicMajorRotation); translate(0.85*scaled, 0.1*scaled);
            if     (harmonicMajorModeIndex%12==0 ) text(harmonicMajorModeList[0], 0, 0);
            else if(harmonicMajorModeIndex%12==2 ) text(harmonicMajorModeList[1], 0, 0);
            else if(harmonicMajorModeIndex%12==4 ) text(harmonicMajorModeList[2], 0, 0);
            else if(harmonicMajorModeIndex%12==5 ) text(harmonicMajorModeList[3], 0, 0);
            else if(harmonicMajorModeIndex%12==7 ) text(harmonicMajorModeList[4], 0, 0);
            else if(harmonicMajorModeIndex%12==8 ) text(harmonicMajorModeList[5], 0, 0);
            else if(harmonicMajorModeIndex%12==11) text(harmonicMajorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createDoubleHarmonicModeCircle(){
    textFont('Georgia');
    push();
        rotate(-doubleHarmonicRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==2 || i==3 || i==4 || i==7 || i==8 || i==10 || i==11){
                highlightRect();
            }
            if(i==0 || i==1 || i==5 || i==6 || i==9){
                hideRect();
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
        push();
            textSize(Size*0.69); stroke(0); strokeWeight(0.5);
            fill(lockNotes ? 0 : 255);
            rotate(PI/2+doubleHarmonicRotation); translate(0.85*scaled, 0.1*scaled);
            if     (doubleHarmonicModeIndex%12==0 ) text(doubleHarmonicModeList[0], 0, 0);
            else if(doubleHarmonicModeIndex%12==1 ) text(doubleHarmonicModeList[1], 0, 0);
            else if(doubleHarmonicModeIndex%12==4 ) text(doubleHarmonicModeList[2], 0, 0);
            else if(doubleHarmonicModeIndex%12==5 ) text(doubleHarmonicModeList[3], 0, 0);
            else if(doubleHarmonicModeIndex%12==7 ) text(doubleHarmonicModeList[4], 0, 0);
            else if(doubleHarmonicModeIndex%12==8 ) text(doubleHarmonicModeList[5], 0, 0);
            else if(doubleHarmonicModeIndex%12==11) text(doubleHarmonicModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createOtherModeCircle(){
    textFont('Georgia');
    push();
        rotate(PI/2);
        fill(255); textSize(Size*0.75); stroke(0); strokeWeight(0.5);
        text(otherModeList[otherModeIndex], 0.85*scaled, 0.1*scaled);
    pop();
    push();
        rotate(PI/2);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            fill(fillcolor, fillalpha); noStroke();
            if     (i==0){
                highlightRect();
            }
            else if(i==1){
                if(otherModeIndex ==  7 || 
                   otherModeIndex ==  8 ||
                   otherModeIndex == 14 ||
                   otherModeIndex == 15 ||
                   otherModeIndex == 16 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 19 ||
                   otherModeIndex == 23 ||
                   otherModeIndex == 24 ||
                   otherModeIndex == 26 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==2){
                if(otherModeIndex ==  0 || 
                   otherModeIndex ==  1 ||
                   otherModeIndex ==  2 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex ==  9 ||
                   otherModeIndex == 10 ||
                   otherModeIndex == 11 ||
                   otherModeIndex == 12 ||
                   otherModeIndex == 13 ||
                   otherModeIndex == 17 ||
                   otherModeIndex == 20 ||
                   otherModeIndex == 21 ||
                   otherModeIndex == 25 ||
                   otherModeIndex == 27 ||
                   otherModeIndex == 28){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==3){
                if(otherModeIndex ==  3 || 
                   otherModeIndex ==  6 ||
                   otherModeIndex == 22 ||
                   otherModeIndex ==  2 ||
                   otherModeIndex ==  9 ||
                   otherModeIndex == 10 ||
                   otherModeIndex == 12 ||
                   otherModeIndex == 13 ||
                   otherModeIndex == 15 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 19 ||
                   otherModeIndex == 20 ||
                   otherModeIndex == 27){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==4){
                if(otherModeIndex ==  0 || 
                   otherModeIndex ==  1 ||
                   otherModeIndex ==  3 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex ==  7 ||
                   otherModeIndex ==  8 ||
                   otherModeIndex == 11 ||
                   otherModeIndex == 17 ||
                   otherModeIndex == 21 ||
                   otherModeIndex == 23 ||
                   otherModeIndex == 24 ||
                   otherModeIndex == 25 ||
                   otherModeIndex == 26 ||
                   otherModeIndex == 28 ||
                   otherModeIndex == 15 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==5){
                if(otherModeIndex ==  6 || 
                   otherModeIndex == 14 ||
                   otherModeIndex == 16 ||
                   otherModeIndex == 22 ||
                   otherModeIndex ==  1 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex ==  7 ||
                   otherModeIndex == 10 ||
                   otherModeIndex == 11 ||
                   otherModeIndex == 12 ||
                   otherModeIndex == 17 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 19 ||
                   otherModeIndex == 20 ||
                   otherModeIndex == 23 ||
                   otherModeIndex == 24 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==6){
                if(otherModeIndex ==  0 || 
                   otherModeIndex ==  2 ||
                   otherModeIndex ==  6 ||
                   otherModeIndex ==  8 ||
                   otherModeIndex ==  9 ||
                   otherModeIndex == 16 ||
                   otherModeIndex == 25 ||
                   otherModeIndex == 26 ||
                   otherModeIndex == 27 ||
                   otherModeIndex == 28 ||
                   otherModeIndex == 10 ||
                   otherModeIndex == 15 ||
                   otherModeIndex == 17 ||
                   otherModeIndex == 20 ||
                   otherModeIndex == 23 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==7){
                if(otherModeIndex ==  3 || 
                   otherModeIndex == 13 ||
                   otherModeIndex == 14 ||
                   otherModeIndex == 21 ||
                   otherModeIndex == 22 ||
                   otherModeIndex ==  0 ||
                   otherModeIndex ==  1 ||
                   otherModeIndex ==  2 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex ==  6 ||
                   otherModeIndex ==  7 ||
                   otherModeIndex ==  9 ||
                   otherModeIndex == 11 ||
                   otherModeIndex == 12 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 19 ||
                   otherModeIndex == 24 ||
                   otherModeIndex == 26 ||
                   otherModeIndex == 27 ||
                   otherModeIndex == 15 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==8){
                if(otherModeIndex ==  3 || 
                   otherModeIndex ==  8 ||
                   otherModeIndex == 13 ||
                   otherModeIndex == 28 ||
                   otherModeIndex ==  1 ||
                   otherModeIndex ==  2 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex ==  7 ||
                   otherModeIndex ==  9 ||
                   otherModeIndex == 10 ||
                   otherModeIndex == 11 ||
                   otherModeIndex == 12 ||
                   otherModeIndex == 17 ||
                   otherModeIndex == 19 ||
                   otherModeIndex == 20 ||
                   otherModeIndex == 23 ||
                   otherModeIndex == 24 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==9){
                if(otherModeIndex == 21 || 
                   otherModeIndex == 25 ||
                   otherModeIndex ==  0 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 27 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex == 20 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==10){
                if(otherModeIndex == 14 || 
                   otherModeIndex == 16 ||
                   otherModeIndex == 22 ||
                   otherModeIndex ==  6 ||
                   otherModeIndex ==  8 ||
                   otherModeIndex == 25 ||
                   otherModeIndex == 26 ||
                   otherModeIndex == 28 ||
                   otherModeIndex ==  1 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex ==  9 ||
                   otherModeIndex == 10 ||
                   otherModeIndex == 17 ||
                   otherModeIndex == 24 ||
                   otherModeIndex == 27 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            else if(i==11){
                if(otherModeIndex ==  3 || 
                   otherModeIndex ==  2 ||
                   otherModeIndex ==  7 ||
                   otherModeIndex ==  8 ||
                   otherModeIndex == 11 ||
                   otherModeIndex == 12 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 19 ||
                   otherModeIndex == 23 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex == 20 ){
                    highlightRect();
                }
                else
                    hideRect();
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
        }
    pop();
}

function createMenus(){
    let xpos = scaled;
    let ypos = 30; 
    
    keySelect = createSelect();
    keySelect.position(xpos, ypos);
    for(let i = 0; i < keyList.length; i++){
        keySelect.option(keyList[i]);
    }
    keySelect.selected(keyList[0]);
    keySelect.changed(changeKey);
    keySelect.mouseWheel(changeKeyMouse);

    majorModeSelect = createSelect();
    majorModeSelect.position(xpos, 2*ypos);
    for(let i = 0; i < majorModeList.length; i++){
        majorModeSelect.option(majorModeList[i]);
    }
    majorModeSelect.selected(majorModeList[0]);
    majorModeSelect.changed(changeMajorMode);
    majorModeSelect.mouseWheel(changeMajorModeMouse);

    melodicMinorModeSelect = createSelect();
    melodicMinorModeSelect.position(xpos, 2*ypos);
    for(let i = 0; i < melodicMinorModeList.length; i++){
        melodicMinorModeSelect.option(melodicMinorModeList[i]);
    }
    melodicMinorModeSelect.selected(melodicMinorModeList[0]);
    melodicMinorModeSelect.changed(changeMelodicMinorMode);
    melodicMinorModeSelect.mouseWheel(changeMelodicMinorModeMouse);

    harmonicMinorModeSelect = createSelect();
    harmonicMinorModeSelect.position(xpos, 2*ypos);
    for(let i = 0; i < harmonicMinorModeList.length; i++){
        harmonicMinorModeSelect.option(harmonicMinorModeList[i]);
    }
    harmonicMinorModeSelect.selected(harmonicMinorModeList[0]);
    harmonicMinorModeSelect.changed(changeHarmonicMinorMode);
    harmonicMinorModeSelect.mouseWheel(changeHarmonicMinorModeMouse);

    harmonicMajorModeSelect = createSelect();
    harmonicMajorModeSelect.position(xpos, 2*ypos);
    for(let i = 0; i < harmonicMajorModeList.length; i++){
        harmonicMajorModeSelect.option(harmonicMajorModeList[i]);
    }
    harmonicMajorModeSelect.selected(harmonicMajorModeList[0]);
    harmonicMajorModeSelect.changed(changeHarmonicMajorMode);
    harmonicMajorModeSelect.mouseWheel(changeHarmonicMajorModeMouse);

    doubleHarmonicModeSelect = createSelect();
    doubleHarmonicModeSelect.position(xpos, 2*ypos);
    for(let i = 0; i < doubleHarmonicModeList.length; i++){
        doubleHarmonicModeSelect.option(doubleHarmonicModeList[i]);
    }
    doubleHarmonicModeSelect.selected(doubleHarmonicModeList[0]);
    doubleHarmonicModeSelect.changed(changeDoubleHarmonicMode);
    doubleHarmonicModeSelect.mouseWheel(changeDoubleHarmonicModeMouse);

    otherModeSelect = createSelect();
    otherModeSelect.position(xpos, 2*ypos);
    for(let i = 0; i < otherModeList.length; i++){
        otherModeSelect.option(otherModeList[i]);
    }
    otherModeSelect.selected(otherModeList[0]);
    otherModeSelect.changed(changeOtherMode);
    otherModeSelect.mouseWheel(changeOtherModeMouse);
    
    modeSelect = createSelect();
    modeSelect.position(xpos*1.15, ypos);
    for(let i = 0; i < modeList.length; i++){
        modeSelect.option(modeList[i]);
    }
    modeSelect.selected(modeList[0]);
    modeSelect.changed(changeMode);
    modeSelect.mouseWheel(changeModeMouse);
    
    pianoSelect = createSelect();
    pianoSelect.position(xpos*1.5, ypos);
    for(let i = 0; i < pianoMode.length; i++){
        pianoSelect.option(pianoMode[i]);
    }
    pianoSelect.selected(pianoMode[0]);
    pianoSelect.changed(changePiano);
    pianoSelect.mouseWheel(changePianoMouse);
    
    keySelect.hide();
    modeSelect.hide();
    pianoSelect.hide();
    majorModeSelect.hide();
    melodicMinorModeSelect.hide();
    harmonicMinorModeSelect.hide();
    harmonicMajorModeSelect.hide();
    doubleHarmonicModeSelect.hide();
    otherModeSelect.hide();
}

function changeMode(){
    var choice = modeSelect.value();
    if     (choice == modeList[0]) majorMinorOther = 0;
    else if(choice == modeList[1]) majorMinorOther = 1;
    else if(choice == modeList[2]) majorMinorOther = 2;
    else if(choice == modeList[3]) majorMinorOther = 3;
    else if(choice == modeList[4]) majorMinorOther = 4;
    else if(choice == modeList[5]) majorMinorOther = 5;
    // mouseOverText.html(modeText[majorMinorOther]+(majorMinorOther==5?"":mouseOver));
    commonFunction();
    showImg = false;
    // if(choice == modeList[0]) { majorMinorOther = 0; majorModeSelect.show(); }
    // if(choice == modeList[1]) { majorMinorOther = 1; melodicMinorModeSelect.show(); }
    // if(choice == modeList[2]) { majorMinorOther = 2; harmonicMinorModeSelect.show(); }
    // if(choice == modeList[3]) { majorMinorOther = 3; harmonicMajorModeSelect.show(); }
    // if(choice == modeList[4]) { majorMinorOther = 4; doubleHarmonicModeSelect.show(); }
    // if(choice == modeList[5]) { majorMinorOther = 5; otherModeSelect.show(); }
}
function changeModeMouse(event){
    var choice = modeSelect.value();
    let i = 0;
    for(let k = 0; k < modeList.length; k++){
        if (choice === modeList[k])
            i = k;
    }
    if (event.deltaY > 0) modeSelect.selected(modeList[(i+1)%6]);
    if (event.deltaY < 0) modeSelect.selected(modeList[(i+5)%6]);
    changeMode();
}

function changeMajorMode(){
    var choice = majorModeSelect.value();
    if(choice == majorModeList[0] && majorModeIndex == 11)
        majorRotation -= 2*PI;
    if(choice == majorModeList[6] && majorModeIndex == 0)
        majorRotation += 2*PI;
    if     (choice == majorModeList[0]) { majorModeIndex = 0 ; melodicMinorModeIndex = 0 ; harmonicMinorModeIndex = 0 ; harmonicMajorModeIndex = 0 ; doubleHarmonicModeIndex = 0 ; currentlySelectedMode = 0; }
    else if(choice == majorModeList[1]) { majorModeIndex = 2 ; melodicMinorModeIndex = 2 ; harmonicMinorModeIndex = 2 ; harmonicMajorModeIndex = 2 ; doubleHarmonicModeIndex = 1 ; currentlySelectedMode = 1; }
    else if(choice == majorModeList[2]) { majorModeIndex = 4 ; melodicMinorModeIndex = 3 ; harmonicMinorModeIndex = 3 ; harmonicMajorModeIndex = 4 ; doubleHarmonicModeIndex = 4 ; currentlySelectedMode = 2; }
    else if(choice == majorModeList[3]) { majorModeIndex = 5 ; melodicMinorModeIndex = 5 ; harmonicMinorModeIndex = 5 ; harmonicMajorModeIndex = 5 ; doubleHarmonicModeIndex = 5 ; currentlySelectedMode = 3; }
    else if(choice == majorModeList[4]) { majorModeIndex = 7 ; melodicMinorModeIndex = 7 ; harmonicMinorModeIndex = 7 ; harmonicMajorModeIndex = 7 ; doubleHarmonicModeIndex = 7 ; currentlySelectedMode = 4; }
    else if(choice == majorModeList[5]) { majorModeIndex = 9 ; melodicMinorModeIndex = 9 ; harmonicMinorModeIndex = 8 ; harmonicMajorModeIndex = 8 ; doubleHarmonicModeIndex = 8 ; currentlySelectedMode = 5; }
    else if(choice == majorModeList[6]) { majorModeIndex = 11; melodicMinorModeIndex = 11; harmonicMinorModeIndex = 11; harmonicMajorModeIndex = 11; doubleHarmonicModeIndex = 11; currentlySelectedMode = 6; }
    commonFunction();
}
function changeMajorModeMouse(event){
    var choice = majorModeSelect.value();
    let i = 0;
    for(let k = 0; k < majorModeList.length; k++){
        if (choice === majorModeList[k])
            i = k;
    }
    if (event.deltaY > 0) majorModeSelect.selected(majorModeList[(i+1)%7]);
    if (event.deltaY < 0) majorModeSelect.selected(majorModeList[(i+6)%7]);
    changeMajorMode();
}

function changeMelodicMinorMode(){
    var choice = melodicMinorModeSelect.value();
    if(choice == melodicMinorModeList[0 ] && melodicMinorModeIndex == 11)
        melodicMinorRotation -= 2*PI;
    if(choice == melodicMinorModeList[6] && melodicMinorModeIndex == 0)
        melodicMinorRotation += 2*PI;
    if     (choice == melodicMinorModeList[0]) { melodicMinorModeIndex = 0 ; majorModeIndex = 0 ; harmonicMinorModeIndex = 0 ; harmonicMajorModeIndex = 0 ; doubleHarmonicModeIndex = 0 ; currentlySelectedMode = 0; }
    else if(choice == melodicMinorModeList[1]) { melodicMinorModeIndex = 2 ; majorModeIndex = 2 ; harmonicMinorModeIndex = 2 ; harmonicMajorModeIndex = 2 ; doubleHarmonicModeIndex = 1 ; currentlySelectedMode = 1; }
    else if(choice == melodicMinorModeList[2]) { melodicMinorModeIndex = 3 ; majorModeIndex = 4 ; harmonicMinorModeIndex = 3 ; harmonicMajorModeIndex = 4 ; doubleHarmonicModeIndex = 4 ; currentlySelectedMode = 2; }
    else if(choice == melodicMinorModeList[3]) { melodicMinorModeIndex = 5 ; majorModeIndex = 5 ; harmonicMinorModeIndex = 5 ; harmonicMajorModeIndex = 5 ; doubleHarmonicModeIndex = 5 ; currentlySelectedMode = 3; }
    else if(choice == melodicMinorModeList[4]) { melodicMinorModeIndex = 7 ; majorModeIndex = 7 ; harmonicMinorModeIndex = 7 ; harmonicMajorModeIndex = 7 ; doubleHarmonicModeIndex = 7 ; currentlySelectedMode = 4; }
    else if(choice == melodicMinorModeList[5]) { melodicMinorModeIndex = 9 ; majorModeIndex = 9 ; harmonicMinorModeIndex = 8 ; harmonicMajorModeIndex = 8 ; doubleHarmonicModeIndex = 8 ; currentlySelectedMode = 5; }
    else if(choice == melodicMinorModeList[6]) { melodicMinorModeIndex = 11; majorModeIndex = 11; harmonicMinorModeIndex = 11; harmonicMajorModeIndex = 11; doubleHarmonicModeIndex = 11; currentlySelectedMode = 6; }
    commonFunction();
}
function changeMelodicMinorModeMouse(event){
    var choice = melodicMinorModeSelect.value();
    let i = 0;
    for(let k = 0; k < melodicMinorModeList.length; k++){
        if (choice === melodicMinorModeList[k])
            i = k;
    }
    if (event.deltaY > 0) melodicMinorModeSelect.selected(melodicMinorModeList[(i+1)%7]);
    if (event.deltaY < 0) melodicMinorModeSelect.selected(melodicMinorModeList[(i+6)%7]);
    changeMelodicMinorMode();
}

function changeHarmonicMinorMode(){
    var choice = harmonicMinorModeSelect.value();
    if(choice == harmonicMinorModeList[0 ] && harmonicMinorModeIndex == 11)
        harmonicMinorRotation -= 2*PI;
    if(choice == harmonicMinorModeList[6] && harmonicMinorModeIndex == 0)
        harmonicMinorRotation += 2*PI;
    if     (choice == harmonicMinorModeList[0]) { harmonicMinorModeIndex = 0 ; majorModeIndex = 0 ; melodicMinorModeIndex = 0 ; harmonicMajorModeIndex = 0 ; doubleHarmonicModeIndex = 0 ; currentlySelectedMode = 0; }
    else if(choice == harmonicMinorModeList[1]) { harmonicMinorModeIndex = 2 ; majorModeIndex = 2 ; melodicMinorModeIndex = 2 ; harmonicMajorModeIndex = 2 ; doubleHarmonicModeIndex = 1 ; currentlySelectedMode = 1; }
    else if(choice == harmonicMinorModeList[2]) { harmonicMinorModeIndex = 3 ; majorModeIndex = 4 ; melodicMinorModeIndex = 3 ; harmonicMajorModeIndex = 4 ; doubleHarmonicModeIndex = 4 ; currentlySelectedMode = 2; }
    else if(choice == harmonicMinorModeList[3]) { harmonicMinorModeIndex = 5 ; majorModeIndex = 5 ; melodicMinorModeIndex = 5 ; harmonicMajorModeIndex = 5 ; doubleHarmonicModeIndex = 5 ; currentlySelectedMode = 3; }
    else if(choice == harmonicMinorModeList[4]) { harmonicMinorModeIndex = 7 ; majorModeIndex = 7 ; melodicMinorModeIndex = 7 ; harmonicMajorModeIndex = 7 ; doubleHarmonicModeIndex = 7 ; currentlySelectedMode = 4; }
    else if(choice == harmonicMinorModeList[5]) { harmonicMinorModeIndex = 8 ; majorModeIndex = 9 ; melodicMinorModeIndex = 9 ; harmonicMajorModeIndex = 8 ; doubleHarmonicModeIndex = 8 ; currentlySelectedMode = 5; }
    else if(choice == harmonicMinorModeList[6]) { harmonicMinorModeIndex = 11; majorModeIndex = 11; melodicMinorModeIndex = 11; harmonicMajorModeIndex = 11; doubleHarmonicModeIndex = 11; currentlySelectedMode = 6; }
    commonFunction();
}
function changeHarmonicMinorModeMouse(event){
    var choice = harmonicMinorModeSelect.value();
    let i = 0;
    for(let k = 0; k < harmonicMinorModeList.length; k++){
        if (choice === harmonicMinorModeList[k])
            i = k;
    }
    if (event.deltaY > 0) harmonicMinorModeSelect.selected(harmonicMinorModeList[(i+1)%7]);
    if (event.deltaY < 0) harmonicMinorModeSelect.selected(harmonicMinorModeList[(i+6)%7]);
    changeHarmonicMinorMode();
}

function changeHarmonicMajorMode(){
    var choice = harmonicMajorModeSelect.value();
    if(choice == harmonicMajorModeList[0] && harmonicMajorModeIndex == 11)
        harmonicMajorRotation -= 2*PI;
    if(choice == harmonicMajorModeList[6] && harmonicMajorModeIndex == 0)
        harmonicMajorRotation += 2*PI;

    if     (choice == harmonicMajorModeList[0]) { harmonicMajorModeIndex = 0 ; majorModeIndex = 0 ; melodicMinorModeIndex = 0 ; harmonicMinorModeIndex = 0 ; doubleHarmonicModeIndex = 0 ; currentlySelectedMode = 0; }
    else if(choice == harmonicMajorModeList[1]) { harmonicMajorModeIndex = 2 ; majorModeIndex = 2 ; melodicMinorModeIndex = 2 ; harmonicMinorModeIndex = 2 ; doubleHarmonicModeIndex = 1 ; currentlySelectedMode = 1; }
    else if(choice == harmonicMajorModeList[2]) { harmonicMajorModeIndex = 4 ; majorModeIndex = 4 ; melodicMinorModeIndex = 3 ; harmonicMinorModeIndex = 3 ; doubleHarmonicModeIndex = 4 ; currentlySelectedMode = 2; }
    else if(choice == harmonicMajorModeList[3]) { harmonicMajorModeIndex = 5 ; majorModeIndex = 5 ; melodicMinorModeIndex = 5 ; harmonicMinorModeIndex = 5 ; doubleHarmonicModeIndex = 5 ; currentlySelectedMode = 3; }
    else if(choice == harmonicMajorModeList[4]) { harmonicMajorModeIndex = 7 ; majorModeIndex = 7 ; melodicMinorModeIndex = 7 ; harmonicMinorModeIndex = 7 ; doubleHarmonicModeIndex = 7 ; currentlySelectedMode = 4; }
    else if(choice == harmonicMajorModeList[5]) { harmonicMajorModeIndex = 8 ; majorModeIndex = 9 ; melodicMinorModeIndex = 9 ; harmonicMinorModeIndex = 8 ; doubleHarmonicModeIndex = 8 ; currentlySelectedMode = 5; }
    else if(choice == harmonicMajorModeList[6]) { harmonicMajorModeIndex = 11; majorModeIndex = 11; melodicMinorModeIndex = 11; harmonicMinorModeIndex = 11; doubleHarmonicModeIndex = 11; currentlySelectedMode = 6; }
    commonFunction();
}
function changeHarmonicMajorModeMouse(event){
    var choice = harmonicMajorModeSelect.value();
    let i = 0;
    for(let k = 0; k < harmonicMajorModeList.length; k++){
        if (choice == harmonicMajorModeList[k])
            i = k;
    }
    if (event.deltaY > 0) harmonicMajorModeSelect.selected(harmonicMajorModeList[(i+1)%7]);
    if (event.deltaY < 0) harmonicMajorModeSelect.selected(harmonicMajorModeList[(i+6)%7]);
    changeHarmonicMajorMode();
}

function changeDoubleHarmonicMode(){
    var choice = doubleHarmonicModeSelect.value();
    if(choice == doubleHarmonicModeList[0 ] && doubleHarmonicModeIndex == 11)
        doubleHarmonicRotation -= 2*PI;
    if(choice == doubleHarmonicModeList[6] && doubleHarmonicModeIndex == 0)
        doubleHarmonicRotation += 2*PI;
    if     (choice == doubleHarmonicModeList[0]) { doubleHarmonicModeIndex = 0 ; majorModeIndex = 0 ; melodicMinorModeIndex = 0 ; harmonicMinorModeIndex = 0 ; harmonicMajorModeIndex = 0 ; currentlySelectedMode = 0; }
    else if(choice == doubleHarmonicModeList[1]) { doubleHarmonicModeIndex = 1 ; majorModeIndex = 2 ; melodicMinorModeIndex = 2 ; harmonicMinorModeIndex = 2 ; harmonicMajorModeIndex = 2 ; currentlySelectedMode = 1; }
    else if(choice == doubleHarmonicModeList[2]) { doubleHarmonicModeIndex = 4 ; majorModeIndex = 4 ; melodicMinorModeIndex = 3 ; harmonicMinorModeIndex = 3 ; harmonicMajorModeIndex = 4 ; currentlySelectedMode = 2; }
    else if(choice == doubleHarmonicModeList[3]) { doubleHarmonicModeIndex = 5 ; majorModeIndex = 5 ; melodicMinorModeIndex = 5 ; harmonicMinorModeIndex = 5 ; harmonicMajorModeIndex = 5 ; currentlySelectedMode = 3; }
    else if(choice == doubleHarmonicModeList[4]) { doubleHarmonicModeIndex = 7 ; majorModeIndex = 7 ; melodicMinorModeIndex = 7 ; harmonicMinorModeIndex = 7 ; harmonicMajorModeIndex = 7 ; currentlySelectedMode = 4; }
    else if(choice == doubleHarmonicModeList[5]) { doubleHarmonicModeIndex = 8 ; majorModeIndex = 9 ; melodicMinorModeIndex = 9 ; harmonicMinorModeIndex = 8 ; harmonicMajorModeIndex = 8 ; currentlySelectedMode = 5; }
    else if(choice == doubleHarmonicModeList[6]) { doubleHarmonicModeIndex = 11; majorModeIndex = 11; melodicMinorModeIndex = 11; harmonicMinorModeIndex = 11; harmonicMajorModeIndex = 11; currentlySelectedMode = 6; }
    commonFunction();
    // mouseOverText.html(mouseOver);
}
function changeDoubleHarmonicModeMouse(event){
    var choice = doubleHarmonicModeSelect.value();
    let i = 0;
    for(let k = 0; k < doubleHarmonicModeList.length; k++){
        if (choice === doubleHarmonicModeList[k])
            i = k;
    }
    if (event.deltaY > 0) doubleHarmonicModeSelect.selected(doubleHarmonicModeList[(i+1)%7]);
    if (event.deltaY < 0) doubleHarmonicModeSelect.selected(doubleHarmonicModeList[(i+6)%7]);
    changeDoubleHarmonicMode();
}

function changeOtherMode(){
    var choice = otherModeSelect.value();
    for(let i = 0; i < otherModeList.length; i++){
        if(choice == otherModeList[i]) otherModeIndex = i;
    }
}
function changeOtherModeMouse(event){
    var choice = otherModeSelect.value();
    let i = 0;
    for(let k = 0; k < otherModeList.length; k++){
        if (choice === otherModeList[k])
            i = k;
    }
    if (event.deltaY > 0) otherModeSelect.selected(otherModeList[(i+1)%29]);
    if (event.deltaY < 0) otherModeSelect.selected(otherModeList[(i+28)%29]);
    changeOtherMode();
}

function changeKey(){
    showImg = false;
    var choice = keySelect.value();
    if(choice == keyList[0 ] && keyIndex == 11)
        currentNoteRotation -= 2*PI;
    if(choice == keyList[11] && keyIndex == 0)
        currentNoteRotation += 2*PI;
    if     (choice == keyList[0 ]) keyIndex = 0 ;
    else if(choice == keyList[1 ]) keyIndex = 1 ;
    else if(choice == keyList[2 ]) keyIndex = 2 ;
    else if(choice == keyList[3 ]) keyIndex = 3 ;
    else if(choice == keyList[4 ]) keyIndex = 4 ;
    else if(choice == keyList[5 ]) keyIndex = 5 ;
    else if(choice == keyList[6 ]) keyIndex = 6 ;
    else if(choice == keyList[7 ]) keyIndex = 7 ;
    else if(choice == keyList[8 ]) keyIndex = 8 ;
    else if(choice == keyList[9 ]) keyIndex = 9 ;
    else if(choice == keyList[10]) keyIndex = 10;
    else if(choice == keyList[11]) keyIndex = 11;
    // mouseOverText.html(
        // "<b><i>Key</i></b>, <b><i>root</i></b>, or <b><i>tonic</i></b> are all commonly used to refer to the 'central' note of any scale - the note (or chord) which feels most like 'home' in any given arrangement of notes.<br /><br />\
        // Most common Western-based music today is based on 12 equal divisions of the scale, known as <i>12-tone equal temperament</i>, and that is the system that I am using in this app.\
        // Each step on the 12 notes is called a <i>semitone</i> or <i>half-step</i>. Moving two steps at a time is called a <i>whole tone</i> or <i>full step</i>. Scales and modes are just different arrangements of tones and semitones."
    // );
}
function changeKeyMouse(event){
    if (event.deltaY > 0) keySelect.selected(keyList[(keyIndex+1 )%12]);
    if (event.deltaY < 0) keySelect.selected(keyList[(keyIndex+11)%12]);
    changeKey();
}

function changePiano(){
    var choice = pianoSelect.value();
    if(choice == pianoMode[0]) pianoColors = 1;
    if(choice == pianoMode[1]) pianoColors = 0;
}
function changePianoMouse(event){
    if (event.deltaY > 0) pianoSelect.selected(pianoMode[1]);
    if (event.deltaY < 0) pianoSelect.selected(pianoMode[0]);
    changePiano();
}

function hideRect(){
    fill(fillcolor, fillalpha); noStroke();
    rect(0, Size*1.6, 0.7*Size, 1.5*Size);
}

function highlightRect(){
    fill(255, fillalpha*0.1); stroke(0, fillalpha); strokeWeight(1.5);
}

function notesAreLocked(){
    if(lockNotes){
        if     (majorMinorOther == 0) lockedIndex = keyIndex + majorModeIndex         ;
        else if(majorMinorOther == 1) lockedIndex = keyIndex + melodicMinorModeIndex  ;
        else if(majorMinorOther == 2) lockedIndex = keyIndex + harmonicMinorModeIndex ;
        else if(majorMinorOther == 3) lockedIndex = keyIndex + harmonicMajorModeIndex ;
        else if(majorMinorOther == 4) lockedIndex = keyIndex + doubleHarmonicModeIndex;
        else if(majorMinorOther == 5) lockedIndex = keyIndex;
    }else
        lockedIndex = keyIndex;
    lockedIndex = lockedIndex%12;
    keySelect.selected(lockedIndex);
    return lockedIndex;
}

function commonFunction(){
    majorModeSelect.selected(majorModeList[currentlySelectedMode]);
    melodicMinorModeSelect.selected(melodicMinorModeList[currentlySelectedMode]);
    harmonicMinorModeSelect.selected(harmonicMinorModeList[currentlySelectedMode]);
    harmonicMajorModeSelect.selected(harmonicMajorModeList[currentlySelectedMode]);
    doubleHarmonicModeSelect.selected(doubleHarmonicModeList[currentlySelectedMode]);
    
    if(majorMinorOther != 5){
        mouseOverText.html(allModesText[majorMinorOther][currentlySelectedMode]);
        if(majorMinorOther == 0){
            if(currentlySelectedMode == 0){
                mouseOverText.html(
                "<br /><br /><small>In the key of <b>" + keyList[lockedIndex] + " major</b>,\
                the <i>relative minor</i> key is <b>" + keyList[(lockedIndex+9)%12] + " minor</b> because it uses the same notes.", true);
            }else if(currentlySelectedMode == 5){
                mouseOverText.html(
                "<br /><br /><small>In the key of <b>" + keyList[lockedIndex] + " minor</b>,\
                the <i>relative major</i> key is <b>" + keyList[(lockedIndex+3)%12] + " major</b> because it uses the same notes.", true);
            }
        }
    }else{
        mouseOverText.html('');
    }
    
    showImg = false;
    notesAreLocked();
}
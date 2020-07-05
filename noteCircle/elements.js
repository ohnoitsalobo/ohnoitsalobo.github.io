let fillcolor = 100;
function createNoteCircle(){
    fill(fillcolor); noStroke();
    Size = 0.97*shortAxis;
    ellipse(0, 0, Size, Size);
    Size = 0.093*shortAxis;
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textFont('Georgia');
    let xpos = 0.65*shortAxis, ypos = -0.2*shortAxis;
    push();
        rotate(PI/2);
        textSize(Size*0.5); fill(0); text('ROOT', 0, -3.05*Size);
        textSize(Size); fill(255); stroke(0); strokeWeight(1);
        text(keyList[noteIndex%12], xpos, ypos);
        textSize(Size*0.5); fill(255, 175);
        text(modeList[majorMinorOther], xpos/0.62, ypos);
        textSize(Size*0.4); 
        if(majorMinorOther!=5)  text("Use number keys 1 2 3 4 5 6 7 8 to\nplay the highlighted notes, or\ntap/click the highlighted notes\nin sequence to hear the scale.", 0.85*shortAxis, 0.4*shortAxis);
        else  text("Tap/click the highlighted notes\nin sequence to hear the scale.", 0.85*shortAxis, 0.4*shortAxis);
        stroke(255, 255); strokeWeight(5);
        line(xpos, ypos-1.2*Size, xpos+30, ypos-Size);
        line(xpos, ypos-1.2*Size, xpos-30, ypos-Size);
        line(xpos, ypos+1.2*Size, xpos+30, ypos+Size);
        line(xpos, ypos+1.2*Size, xpos-30, ypos+Size);
        line(xpos/0.62, ypos-1.2*Size, xpos/0.62+30, ypos-Size);
        line(xpos/0.62, ypos-1.2*Size, xpos/0.62-30, ypos-Size);
        line(xpos/0.62, ypos+1.2*Size, xpos/0.62+30, ypos+Size);
        line(xpos/0.62, ypos+1.2*Size, xpos/0.62-30, ypos+Size);
        line(0.85*shortAxis, 0.1*shortAxis-1.7*Size, 0.85*shortAxis+30, 0.1*shortAxis-1.5*Size);
        line(0.85*shortAxis, 0.1*shortAxis-1.7*Size, 0.85*shortAxis-30, 0.1*shortAxis-1.5*Size);
        line(0.85*shortAxis, 0.1*shortAxis+1.7*Size, 0.85*shortAxis+30, 0.1*shortAxis+1.5*Size);
        line(0.85*shortAxis, 0.1*shortAxis+1.7*Size, 0.85*shortAxis-30, 0.1*shortAxis+1.5*Size);
    pop();
    push();
        currentNoteRotation = lerp(currentNoteRotation, noteRotation[noteIndex%12], speed);
        rotate(-currentNoteRotation);
        textFont('Times New Roman');
        for(var i = 0; i < noteRotation.length; i++){
        push();
            rotate(noteRotation[i]);
            translate(0, -4.1*Size);
            rotate(-noteRotation[i]+currentNoteRotation+PI/2);
            // textSize(0.5*Size); fill(0);
            // text((i+9)%12, -30, 0)
            textSize(Size); fill(255);
            if(i==0) { text('A', 0, 0); } 
            if(i==2) { text('B', 0, 0); textSize(Size*0.3); text('Cb',  Size*0.4, -Size*0.5 ); } 
            if(i==3) { text('C', 0, 0); textSize(Size*0.3); text('B#', -Size*0.4,  Size*0.35); }
            if(i==5) { text('D', 0, 0); }
            if(i==7) { text('E', 0, 0); textSize(Size*0.3); text('Fb',  Size*0.4, -Size*0.5 ); } 
            if(i==8) { text('F', 0, 0); textSize(Size*0.3); text('E#', -Size*0.4,  Size*0.35); }
            if(i==10){ text('G', 0, 0); }

            textSize(Size*0.6); fill (0); //fill((pianoColors) ? 0 : 255); if(majorMinorOther == 2) fill(0);
            let xpos = 0.2*Size; let ypos = 0.25*Size;
            if(i==1) { text('A#', -xpos, -ypos); text('Bb', xpos, ypos); }
            if(i==4) { text('C#', -xpos, -ypos); text('Db', xpos, ypos); }
            if(i==6) { text('D#', -xpos, -ypos); text('Eb', xpos, ypos); }
            if(i==9) { text('F#', -xpos, -ypos); text('Gb', xpos, ypos); }
            if(i==11){ text('G#', -xpos, -ypos); text('Ab', xpos, ypos); }

            if(pianoColors){
            rotate(noteRotation[i]-currentNoteRotation-PI/2);
            translate(0, 1.9*Size);
            fill(255); noStroke();
                if(i==0) { rect(0, 0, 0.5*Size, 1.3*Size); }
                if(i==2) { rect(0, 0, 0.5*Size, 1.3*Size); }
                if(i==3) { rect(0, 0, 0.5*Size, 1.3*Size); }
                if(i==5) { rect(0, 0, 0.5*Size, 1.3*Size); }
                if(i==7) { rect(0, 0, 0.5*Size, 1.3*Size); }
                if(i==8) { rect(0, 0, 0.5*Size, 1.3*Size); }
                if(i==10){ rect(0, 0, 0.5*Size, 1.3*Size); }

                fill(0);
                if(i==1) { rect(0, 0, 0.3*Size, 1.3*Size); }
                if(i==4) { rect(0, 0, 0.3*Size, 1.3*Size); }
                if(i==6) { rect(0, 0, 0.3*Size, 1.3*Size); }
                if(i==9) { rect(0, 0, 0.3*Size, 1.3*Size); }
                if(i==11){ rect(0, 0, 0.3*Size, 1.3*Size); }
            }
        pop();
        }
    pop();
}

function createMajorModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        majorScaleRotation = lerp(majorScaleRotation, noteRotation[majorModeIndex%12], speed*0.75);
        rotate(-majorScaleRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==7 || i==8 || i==10){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==1 || i==4 || i==6 || i==9 || i==11){
                fill(fillcolor); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.75); stroke(0); strokeWeight(1);
        push();
            rotate(PI/2+majorScaleRotation); translate(0.85*shortAxis, 0.1*shortAxis);
            if(majorModeIndex%12==0 ) text(majorModeList[0], 0, 0);
            if(majorModeIndex%12==2 ) text(majorModeList[1], 0, 0);
            if(majorModeIndex%12==4 ) text(majorModeList[2], 0, 0);
            if(majorModeIndex%12==5 ) text(majorModeList[3], 0, 0);
            if(majorModeIndex%12==7 ) text(majorModeList[4], 0, 0);
            if(majorModeIndex%12==9 ) text(majorModeList[5], 0, 0);
            if(majorModeIndex%12==11) text(majorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createMelodicMinorModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        melodicMinorScaleRotation = lerp(melodicMinorScaleRotation, noteRotation[melodicMinorModeIndex%12], speed*0.75);
        rotate(-melodicMinorScaleRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==6 || i==8 || i==10){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==1 || i==4 || i==7 || i==9 || i==11){
                fill(fillcolor); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.75); stroke(0); strokeWeight(1);
        push();
            rotate(PI/2+melodicMinorScaleRotation); translate(0.85*shortAxis, 0.1*shortAxis);
            if(melodicMinorModeIndex%12==0 ) text(melodicMinorModeList[0], 0, 0);
            if(melodicMinorModeIndex%12==2 ) text(melodicMinorModeList[1], 0, 0);
            if(melodicMinorModeIndex%12==3 ) text(melodicMinorModeList[2], 0, 0);
            if(melodicMinorModeIndex%12==5 ) text(melodicMinorModeList[3], 0, 0);
            if(melodicMinorModeIndex%12==7 ) text(melodicMinorModeList[4], 0, 0);
            if(melodicMinorModeIndex%12==9 ) text(melodicMinorModeList[5], 0, 0);
            if(melodicMinorModeIndex%12==11) text(melodicMinorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createHarmonicMinorModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        harmonicMinorRotation = lerp(harmonicMinorRotation, noteRotation[harmonicMinorModeIndex%12], speed*0.75);
        rotate(-harmonicMinorRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==2 || i==3 || i==5 || i==6 || i==8 || i==10 || i==11){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==0 || i==1 || i==4 || i==7 || i==9){
                fill(fillcolor); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.75); stroke(0); strokeWeight(1);
        push();
            rotate(PI/2+harmonicMinorRotation); translate(0.85*shortAxis, 0.1*shortAxis);
            if(harmonicMinorModeIndex%12==0 ) text(harmonicMinorModeList[0], 0, 0);
            if(harmonicMinorModeIndex%12==2 ) text(harmonicMinorModeList[1], 0, 0);
            if(harmonicMinorModeIndex%12==3 ) text(harmonicMinorModeList[2], 0, 0);
            if(harmonicMinorModeIndex%12==5 ) text(harmonicMinorModeList[3], 0, 0);
            if(harmonicMinorModeIndex%12==7 ) text(harmonicMinorModeList[4], 0, 0);
            if(harmonicMinorModeIndex%12==8 ) text(harmonicMinorModeList[5], 0, 0);
            if(harmonicMinorModeIndex%12==11) text(harmonicMinorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createHarmonicMajorModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        harmonicMajorRotation = lerp(harmonicMajorRotation, noteRotation[harmonicMajorModeIndex%12], speed*0.75);
        rotate(-harmonicMajorRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==2 || i==3 || i==5 || i==7 || i==8 || i==10 || i==11){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==0 || i==1 || i==4 || i==6 || i==9){
                fill(fillcolor); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.75); stroke(0); strokeWeight(1);
        push();
            rotate(PI/2+harmonicMajorRotation); translate(0.85*shortAxis, 0.1*shortAxis);
            if(harmonicMajorModeIndex%12==0 ) text(harmonicMajorModeList[0], 0, 0);
            if(harmonicMajorModeIndex%12==2 ) text(harmonicMajorModeList[1], 0, 0);
            if(harmonicMajorModeIndex%12==4 ) text(harmonicMajorModeList[2], 0, 0);
            if(harmonicMajorModeIndex%12==5 ) text(harmonicMajorModeList[3], 0, 0);
            if(harmonicMajorModeIndex%12==7 ) text(harmonicMajorModeList[4], 0, 0);
            if(harmonicMajorModeIndex%12==8 ) text(harmonicMajorModeList[5], 0, 0);
            if(harmonicMajorModeIndex%12==11) text(harmonicMajorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createDoubleHarmonicModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        doubleHarmonicScaleRotation = lerp(doubleHarmonicScaleRotation, noteRotation[doubleHarmonicModeIndex%12], speed*0.75);
        rotate(-doubleHarmonicScaleRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==2 || i==3 || i==4 || i==7 || i==8 || i==10 || i==11){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==0 || i==1 || i==5 || i==6 || i==9){
                fill(fillcolor); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.75); stroke(0); strokeWeight(1);
        push();
            rotate(PI/2+doubleHarmonicScaleRotation); translate(0.85*shortAxis, 0.1*shortAxis);
            if(doubleHarmonicModeIndex%12==0 ) text(doubleHarmonicModeList[0], 0, 0);
            if(doubleHarmonicModeIndex%12==1 ) text(doubleHarmonicModeList[1], 0, 0);
            if(doubleHarmonicModeIndex%12==4 ) text(doubleHarmonicModeList[2], 0, 0);
            if(doubleHarmonicModeIndex%12==5 ) text(doubleHarmonicModeList[3], 0, 0);
            if(doubleHarmonicModeIndex%12==7 ) text(doubleHarmonicModeList[4], 0, 0);
            if(doubleHarmonicModeIndex%12==8 ) text(doubleHarmonicModeList[5], 0, 0);
            if(doubleHarmonicModeIndex%12==11) text(doubleHarmonicModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createOtherModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        rotate(PI/2);
        fill(255); textSize(Size*0.75); stroke(0); strokeWeight(1);
        text(otherModeList[otherModeIndex], 0.85*shortAxis, 0.1*shortAxis);
    pop();
    push();
        rotate(PI/2);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            fill(fillcolor); noStroke();
            if(i==0){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==1){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==2){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==3){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==4){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==5){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==6){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==7){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==8){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==9){
                if(otherModeIndex == 21 || 
                   otherModeIndex == 25 ||
                   otherModeIndex ==  0 ||
                   otherModeIndex ==  4 ||
                   otherModeIndex == 18 ||
                   otherModeIndex == 27 ||
                   otherModeIndex ==  5 ||
                   otherModeIndex == 20 ){
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==10){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            if(i==11){
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
                    fill(255, 40); stroke(0); strokeWeight(1.5);
                }
                else{
                    fill(125); noStroke();
                    rect(0, Size*1.7, 0.6*Size, 1.5*Size);
                }
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.9);
        push();
            rotate(PI/2+majorScaleRotation); translate(0.85*shortAxis, 0);
        pop();
        }
    pop();
}

function createMenus(){
    let xpos = shortAxis;
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
    
}

function changeMode(){
    keySelect.hide();
    modeSelect.hide();
    pianoSelect.hide();
    majorModeSelect.hide();
    melodicMinorModeSelect.hide();
    harmonicMinorModeSelect.hide();
    harmonicMajorModeSelect.hide();
    doubleHarmonicModeSelect.hide();
    otherModeSelect.hide();
    // var choice = modeSelect.value();
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
    if(choice == majorModeList[0]) majorModeIndex = 0 ;
    if(choice == majorModeList[1]) majorModeIndex = 2 ;
    if(choice == majorModeList[2]) majorModeIndex = 4 ;
    if(choice == majorModeList[3]) majorModeIndex = 5 ;
    if(choice == majorModeList[4]) majorModeIndex = 7 ;
    if(choice == majorModeList[5]) majorModeIndex = 9 ;
    if(choice == majorModeList[6]) majorModeIndex = 11;
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
    if(choice == melodicMinorModeList[0]) melodicMinorModeIndex = 0 ;
    if(choice == melodicMinorModeList[1]) melodicMinorModeIndex = 2 ;
    if(choice == melodicMinorModeList[2]) melodicMinorModeIndex = 3 ;
    if(choice == melodicMinorModeList[3]) melodicMinorModeIndex = 5 ;
    if(choice == melodicMinorModeList[4]) melodicMinorModeIndex = 7 ;
    if(choice == melodicMinorModeList[5]) melodicMinorModeIndex = 9 ;
    if(choice == melodicMinorModeList[6]) melodicMinorModeIndex = 11;
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
    if(choice == harmonicMinorModeList[0]) harmonicMinorModeIndex = 0 ;
    if(choice == harmonicMinorModeList[1]) harmonicMinorModeIndex = 2 ;
    if(choice == harmonicMinorModeList[2]) harmonicMinorModeIndex = 3 ;
    if(choice == harmonicMinorModeList[3]) harmonicMinorModeIndex = 5 ;
    if(choice == harmonicMinorModeList[4]) harmonicMinorModeIndex = 7 ;
    if(choice == harmonicMinorModeList[5]) harmonicMinorModeIndex = 8 ;
    if(choice == harmonicMinorModeList[6]) harmonicMinorModeIndex = 11;
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
    if(choice == harmonicMajorModeList[0]) harmonicMajorModeIndex = 0 ;
    if(choice == harmonicMajorModeList[1]) harmonicMajorModeIndex = 2 ;
    if(choice == harmonicMajorModeList[2]) harmonicMajorModeIndex = 4 ;
    if(choice == harmonicMajorModeList[3]) harmonicMajorModeIndex = 5 ;
    if(choice == harmonicMajorModeList[4]) harmonicMajorModeIndex = 7 ;
    if(choice == harmonicMajorModeList[5]) harmonicMajorModeIndex = 8 ;
    if(choice == harmonicMajorModeList[6]) harmonicMajorModeIndex = 11;
}
function changeHarmonicMajorModeMouse(event){
    var choice = harmonicMajorModeSelect.value();
    let i = 0;
    for(let k = 0; k < harmonicMajorModeList.length; k++){
        if (choice === harmonicMajorModeList[k])
            i = k;
    }
    if (event.deltaY > 0) harmonicMajorModeSelect.selected(harmonicMajorModeList[(i+1)%7]);
    if (event.deltaY < 0) harmonicMajorModeSelect.selected(harmonicMajorModeList[(i+6)%7]);
    changeHarmonicMajorMode();
}

function changeDoubleHarmonicMode(){
    var choice = doubleHarmonicModeSelect.value();
    if(choice == doubleHarmonicModeList[0]) doubleHarmonicModeIndex = 0 ;
    if(choice == doubleHarmonicModeList[1]) doubleHarmonicModeIndex = 1 ;
    if(choice == doubleHarmonicModeList[2]) doubleHarmonicModeIndex = 4 ;
    if(choice == doubleHarmonicModeList[3]) doubleHarmonicModeIndex = 5 ;
    if(choice == doubleHarmonicModeList[4]) doubleHarmonicModeIndex = 7 ;
    if(choice == doubleHarmonicModeList[5]) doubleHarmonicModeIndex = 8 ;
    if(choice == doubleHarmonicModeList[6]) doubleHarmonicModeIndex = 11;
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
    var choice = keySelect.value();
    if(choice == keyList[0 ]) noteIndex = 0 ;
    if(choice == keyList[1 ]) noteIndex = 1 ;
    if(choice == keyList[2 ]) noteIndex = 2 ;
    if(choice == keyList[3 ]) noteIndex = 3 ;
    if(choice == keyList[4 ]) noteIndex = 4 ;
    if(choice == keyList[5 ]) noteIndex = 5 ;
    if(choice == keyList[6 ]) noteIndex = 6 ;
    if(choice == keyList[7 ]) noteIndex = 7 ;
    if(choice == keyList[8 ]) noteIndex = 8 ;
    if(choice == keyList[9 ]) noteIndex = 9 ;
    if(choice == keyList[10]) noteIndex = 10;
    if(choice == keyList[11]) noteIndex = 11;
}
function changeKeyMouse(event){
    if (event.deltaY > 0) keySelect.selected(keyList[(noteIndex+1 )%12]);
    if (event.deltaY < 0) keySelect.selected(keyList[(noteIndex+11)%12]);
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

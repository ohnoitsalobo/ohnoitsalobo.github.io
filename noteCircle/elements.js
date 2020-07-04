 function createNoteCircle(){
    fill(125); noStroke();
    Size = 0.97*shortAxis;
    ellipse(0, 0, Size, Size);
    Size = 0.093*shortAxis;
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textFont('Georgia');
    push();
        rotate(PI/2);
        textSize(Size*0.5); fill(0); text('ROOT', 0, -3.05*Size);
        fill(255); textSize(Size*0.9);
        text(keyList[noteIndex%12], 0.85*shortAxis, -0.2*shortAxis);
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
        scaleRotation = lerp(scaleRotation, noteRotation[majorModeIndex%12], speed*0.75);
        rotate(-scaleRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==7 || i==8 || i==10){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==1 || i==4 || i==6 || i==9 || i==11){
                fill(125); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.9);
        push();
            rotate(PI/2+scaleRotation); translate(0.85*shortAxis, 0);
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

function createMinorModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        scaleRotation = lerp(scaleRotation, noteRotation[minorModeIndex%12], speed*0.75);
        rotate(-scaleRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==6 || i==8 || i==10){
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==1 || i==4 || i==7 || i==9 || i==11){
                fill(125); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(255); textSize(Size*0.9);
        push();
            rotate(PI/2+scaleRotation); translate(0.85*shortAxis, 0);
            if(minorModeIndex%12==0 ) text(minorModeList[0], 0, 0);
            if(minorModeIndex%12==2 ) text(minorModeList[1], 0, 0);
            if(minorModeIndex%12==3 ) text(minorModeList[2], 0, 0);
            if(minorModeIndex%12==5 ) text(minorModeList[3], 0, 0);
            if(minorModeIndex%12==7 ) text(minorModeList[4], 0, 0);
            if(minorModeIndex%12==9 ) text(minorModeList[5], 0, 0);
            if(minorModeIndex%12==11) text(minorModeList[6], 0, 0);
        pop();
        }
    pop();
}

function createOtherModeCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        rotate(PI/2);
        fill(255); textSize(Size*0.9);
        text(otherModeList[otherModeIndex], 0.85*shortAxis, 0);
    pop();
    push();
        // scaleRotation = lerp(scaleRotation, noteRotation[minorModeIndex%12], speed*0.75);
        // rotate(-scaleRotation);
        rotate(PI/2);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            fill(125); noStroke();
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
            rotate(PI/2+scaleRotation); translate(0.85*shortAxis, 0);
        pop();
        }
    pop();
}


function createMenus(){
    removeElements();
    let xpos = shortAxis;
    let ypos = 30; 
    
    keySelect = createSelect();
    keySelect.position(xpos, ypos);
    for(let i = 0; i < keyList.length; i++){
        keySelect.option(keyList[i]);
    }
    keySelect.selected(keyList[noteIndex%12]);
    keySelect.changed(changeKey);
    keySelect.mouseWheel(changeKeyMouse);
    
    if(majorMinorOther == 0){
        majorModeSelect = createSelect();
        majorModeSelect.position(xpos, 2*ypos);
        for(let i = 0; i < majorModeList.length; i++){
            majorModeSelect.option(majorModeList[i]);
        }
        if(majorModeIndex%12==0 ) majorModeSelect.selected(majorModeList[0]);
        if(majorModeIndex%12==2 ) majorModeSelect.selected(majorModeList[1]);
        if(majorModeIndex%12==4 ) majorModeSelect.selected(majorModeList[2]);
        if(majorModeIndex%12==5 ) majorModeSelect.selected(majorModeList[3]);
        if(majorModeIndex%12==7 ) majorModeSelect.selected(majorModeList[4]);
        if(majorModeIndex%12==9 ) majorModeSelect.selected(majorModeList[5]);
        if(majorModeIndex%12==11) majorModeSelect.selected(majorModeList[6]);
        majorModeSelect.changed(changeMajorMode);
        majorModeSelect.mouseWheel(changeMajorModeMouse);
    }
    
    if(majorMinorOther == 1){
        minorModeSelect = createSelect();
        minorModeSelect.position(xpos, 2*ypos);
        for(let i = 0; i < minorModeList.length; i++){
            minorModeSelect.option(minorModeList[i]);
        }
        if(minorModeIndex%12==0 ) minorModeSelect.selected(minorModeList[0]);
        if(minorModeIndex%12==2 ) minorModeSelect.selected(minorModeList[1]);
        if(minorModeIndex%12==3 ) minorModeSelect.selected(minorModeList[2]);
        if(minorModeIndex%12==5 ) minorModeSelect.selected(minorModeList[3]);
        if(minorModeIndex%12==7 ) minorModeSelect.selected(minorModeList[4]);
        if(minorModeIndex%12==9 ) minorModeSelect.selected(minorModeList[5]);
        if(minorModeIndex%12==11) minorModeSelect.selected(minorModeList[6]);
        minorModeSelect.changed(changeMinorMode);
        minorModeSelect.mouseWheel(changeMinorModeMouse);
    }
    
    if(majorMinorOther == 2){
        otherModeSelect = createSelect();
        otherModeSelect.position(xpos, 2*ypos);
        for(let i = 0; i < otherModeList.length; i++){
            otherModeSelect.option(otherModeList[i]);
        }
        otherModeSelect.selected(otherModeList[otherModeIndex]);
        otherModeSelect.changed(changeOtherMode);
        otherModeSelect.mouseWheel(changeOtherModeMouse);
    }
    
    modeSelect = createSelect();
    modeSelect.position(xpos*1.15, ypos);
    for(let i = 0; i < modeList.length; i++){
        modeSelect.option(modeList[i]);
    }
    modeSelect.selected(modeList[majorMinorOther]);
    modeSelect.changed(changeMode);
    modeSelect.mouseWheel(changeModeMouse);
    
    pianoSelect = createSelect();
    pianoSelect.position(xpos*1.5, ypos);
    for(let i = 0; i < pianoMode.length; i++){
        pianoSelect.option(pianoMode[i]);
    }
    pianoSelect.selected(pianoMode[(pianoColors+1)%2]);
    pianoSelect.changed(changePiano);
    pianoSelect.mouseWheel(changePianoMouse);
    
}

function changeMode(){
    var choice = modeSelect.value();
    if(choice == modeList[0]) majorMinorOther = 0;
    if(choice == modeList[1]) majorMinorOther = 1;
    if(choice == modeList[2]) majorMinorOther = 2;
    createMenus();
}
function changeModeMouse(){
    var choice = modeSelect.value();
    let i = 0;
    for(let k = 0; k < modeList.length; k++){
        if (choice === modeList[k])
            i = k;
    }
    if (event.deltaY > 0) modeSelect.selected(modeList[(i+1)%3]);
    if (event.deltaY < 0) modeSelect.selected(modeList[(i+2)%3]);
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
    minorModeIndex = (majorModeIndex == 4 ? 3 : majorModeIndex);
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


function changeMinorMode(){
    var choice = minorModeSelect.value();
    if(choice == minorModeList[0]) minorModeIndex = 0 ;
    if(choice == minorModeList[1]) minorModeIndex = 2 ;
    if(choice == minorModeList[2]) minorModeIndex = 3 ;
    if(choice == minorModeList[3]) minorModeIndex = 5 ;
    if(choice == minorModeList[4]) minorModeIndex = 7 ;
    if(choice == minorModeList[5]) minorModeIndex = 9 ;
    if(choice == minorModeList[6]) minorModeIndex = 11;
    majorModeIndex = (minorModeIndex == 3 ? 4 : minorModeIndex);
}
function changeMinorModeMouse(event){
    var choice = minorModeSelect.value();
    let i = 0;
    for(let k = 0; k < minorModeList.length; k++){
        if (choice === minorModeList[k])
            i = k;
    }
    if (event.deltaY > 0) minorModeSelect.selected(minorModeList[(i+1)%7]);
    if (event.deltaY < 0) minorModeSelect.selected(minorModeList[(i+6)%7]);
    changeMinorMode();
}

function changeOtherMode(){
    var choice = otherModeSelect.value();
        for(let i = 0; i < otherModeList.length; i++){
            if(choice == otherModeList[i]) otherModeIndex = i;
        }
}
function changeOtherModeMouse(event){
    var choice = otherModeSelect.value();
    var l = otherModeList.length;
    let i = 0;
    for(let k = 0; k < l; k++){
        if (choice === otherModeList[k])
            i = k;
    }
    if (event.deltaY > 0) otherModeSelect.selected(otherModeList[(i+1)%l]);
    if (event.deltaY < 0) otherModeSelect.selected(otherModeList[(i+l-1)%l]);
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


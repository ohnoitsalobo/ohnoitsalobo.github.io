let PI_ = 3.141592653589793;
let noteRotation  = [ 0*PI_/6, 1*PI_/6, 2*PI_/6, 3*PI_/6, 4*PI_/6, 5*PI_/6, 6*PI_/6, 7*PI_/6, 8*PI_/6, 9*PI_/6, 10*PI_/6, 11*PI_/6 ];
// let noteRotation  = [ 0*PI_/6, 1*PI_/6, 2*PI_/6, 3*PI_/6, 4*PI_/6, 5*PI_/6, 6*PI_/6, 7*PI_/6, 8*PI_/6, 9*PI_/6, 10*PI_/6, 11*PI_/6 ];
let noteIndex = 0, modeIndex = 0, currentNoteRotation = 0, currentScaleRotation = 0;
let doEvery = 30;
let shortAxis, Size;
let pianoColors = true;


function setup(){
    // shortAxis = (width > height) ? height : width;
    shortAxis = (windowWidth > windowHeight) ? windowHeight : windowWidth;
    createCanvas(shortAxis, shortAxis);
    frameRate(30);
    createMenus();
}

function draw(){
    if(noteIndex < 0) noteIndex += 12;
    if(modeIndex < 0) modeIndex += 12;
    background(255, 200);
    translate(width/2, height/2);
    rotate(-PI/2);
    createNoteCircle();
    createScaleCircle();
    // if (frameCount%doEvery == 0) noteIndex++;
    // if (frameCount%doEvery == 0) modeIndex++;
    // if(modeIndex%12 == 1 || modeIndex%12 == 3 || modeIndex%12 == 6 || modeIndex%12 == 8 || modeIndex%12 == 10)
        // modeIndex++;
    // noLoop();
}

function createNoteCircle(){
    fill(125); noStroke();
    Size = 0.97*shortAxis;
    ellipse(0, 0, Size, Size);
    Size = 0.093*shortAxis;
    textAlign(CENTER, CENTER); textFont('Times New Roman');
    rectMode(CENTER);
    push();
        rotate(PI/2);
        textSize(Size*0.5); fill(0); text('ROOT', 0, -3.05*Size);
    pop();
    push();
        currentNoteRotation = lerp(currentNoteRotation, noteRotation[noteIndex%12], 0.2);
        rotate(-currentNoteRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            rotate(noteRotation[i]);
            translate(0, -4.1*Size);
            rotate(-noteRotation[i]+currentNoteRotation+PI/2);
            // rect(0, -Size*0.3, Size*1.3, Size*1.3);
            textSize(Size); fill(pianoColors ? 255 : 255);
            if(i==0) { text('A', 0, 0); } 
            if(i==2) { text('B', 0, 0); textSize(Size*0.3); text('Cb',  Size*0.4, -Size*0.5 ); } 
            if(i==3) { text('C', 0, 0); textSize(Size*0.3); text('B#', -Size*0.4,  Size*0.35); }
            if(i==5) { text('D', 0, 0); }
            if(i==7) { text('E', 0, 0); textSize(Size*0.3); text('Fb',  Size*0.4, -Size*0.5 ); } 
            if(i==8) { text('F', 0, 0); textSize(Size*0.3); text('E#', -Size*0.4,  Size*0.35); }
            if(i==10){ text('G', 0, 0); }

            textSize(Size*0.6); fill(pianoColors ? 0 : 255);
            if(i==1) { text('A#', -0.2*Size, -0.4*Size); text('Bb', 0.2*Size, 0.2*Size); }
            if(i==4) { text('C#', -0.2*Size, -0.4*Size); text('Db', 0.2*Size, 0.2*Size); }
            if(i==6) { text('D#', -0.2*Size, -0.4*Size); text('Eb', 0.2*Size, 0.2*Size); }
            if(i==9) { text('F#', -0.2*Size, -0.4*Size); text('Gb', 0.2*Size, 0.2*Size); }
            if(i==11){ text('G#', -0.2*Size, -0.4*Size); text('Ab', 0.2*Size, 0.2*Size); }

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

function createScaleCircle(){
    Size = 0.093*shortAxis;
    textFont('Georgia');
    push();
        currentScaleRotation = lerp(currentScaleRotation, noteRotation[modeIndex%12], 0.2);
        rotate(-currentScaleRotation);
        for(var i = 0; i < noteRotation.length; i++){
        push();
            noFill();
            rotate(noteRotation[i]);
            translate(0, -3.9*Size); 
            if(i==0 || i==2 || i==3 || i==5 || i==7 || i==8 || i==10){
                // noFill; stroke(0); strokeWeight(1.5);
                fill(255, 40); stroke(0); strokeWeight(1.5);
            }
            if(i==1 || i==4 || i==6 || i==9 || i==11){
                fill(125); noStroke();
                rect(0, Size*1.7, 0.6*Size, 1.5*Size);
            }
            rect(0, -Size*0.3, Size*1.75, Size*1.75);
        pop();
            fill(0); textSize(pianoColors ? Size*0.6 : Size*0.9);
        push();
            rotate(PI/2+currentScaleRotation);
            if(modeIndex%12==0 ) text(modeList[0], 0, 0);
            if(modeIndex%12==2 ) text(modeList[1], 0, 0);
            if(modeIndex%12==4 ) text(modeList[2], 0, 0);
            if(modeIndex%12==5 ) text(modeList[3], 0, 0);
            if(modeIndex%12==7 ) text(modeList[4], 0, 0);
            if(modeIndex%12==9 ) text(modeList[5], 0, 0);
            if(modeIndex%12==11) text(modeList[6], 0, 0);
        pop();
        }
    pop();
}

let modeSelect, keySelect, pianoSelect;
let modeList = ["Ionian\n(Major)", "Dorian", "Lydian", "Phrygian", "Mixolydian", "Aeolian\n(Minor)", "Locrian"];
let melodicMinorModeList = ["Ionian\n(Major)", "Dorian b2\n(Phrygian #6)", "Lydian augmented", "Lydian dominant (overtone scale)", "Mixolydian b6", "Aeolian b5\n(Locrian #2)", "Altered scale\n(Super Locrian)"];
let harmonicMinorModeList = ["Ionian\n(Major)", "Dorian", "Lydian", "Phrygian", "Mixolydian", "Aeolian\n(Minor)", "Locrian"];
let keyList = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
let pianoMode = ["Piano keys on", " Piano keys off"];

function createMenus(){
    keySelect = createSelect();
    keySelect.position(10, 10);
    for(let i = 0; i < keyList.length; i++){
        keySelect.option(keyList[i]);
    }
    keySelect.selected(keyList[0]);
    keySelect.changed(changeKey);
    
    modeSelect = createSelect();
    modeSelect.position(10, 30);
    for(let i = 0; i < modeList.length; i++){
        modeSelect.option(modeList[i]);
    }
    modeSelect.selected(modeList[0]);
    modeSelect.changed(changeMode);
    
    pianoSelect = createSelect();
    pianoSelect.position(10, 50);
    for(let i = 0; i < pianoMode.length; i++){
        pianoSelect.option(pianoMode[i]);
    }
    pianoSelect.selected(pianoMode[0]);
    pianoSelect.changed(changePiano);
    
}

function changeMode(){
    var choice = modeSelect.value();
    if(choice == modeList[0]) modeIndex = 0 ;
    if(choice == modeList[1]) modeIndex = 2 ;
    if(choice == modeList[2]) modeIndex = 4 ;
    if(choice == modeList[3]) modeIndex = 5 ;
    if(choice == modeList[4]) modeIndex = 7 ;
    if(choice == modeList[5]) modeIndex = 9 ;
    if(choice == modeList[6]) modeIndex = 11;
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

function changePiano(){
    var choice = pianoSelect.value();
    if(choice == pianoMode[0]) pianoColors = true;
    if(choice == pianoMode[1]) pianoColors = false;
}
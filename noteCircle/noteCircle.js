let scaled;
let autoplay = 0, played = 0;

let cnv, img1, img2;
function setup(){
    shortAxis = ((windowWidth > windowHeight) ? windowHeight : windowWidth);
    scaled = shortAxis*scale;
    // var cnv = createCanvas(3.5*scaled, scaled);
    cnv = createCanvas(1.75*scaled, scaled);
    cnv.parent('noteCircle');
    // frameRate(30);
    createMenus();
    changeMode();
    
    // let path = "modes/doubleharmonic/doubleharmonic (8).png";
    // img1 = createImg(path, "Notation image 1");
    // img1.parent('img1');
    // path = "modes/doubleharmonic/doubleharmonic (15).png";
    // img2 = createImg(path, "Notation image 2");
    // img2.parent('img2');
    
///////// LOAD IMAGES
    loadMajorScale();
    loadMelodicMinorScale();
    loadHarmonicMinorScale();
    loadHarmonicMajorScale();
    loadDoubleHarmonicScale();
    let path = "modes/all/major-001.png";
    img1 = createImg(path, "Notation image 1");
    img2 = createImg(path, "Notation image 2");
    img1.parent('img1');
    img2.parent('img2');
}

function draw(){

    if(keyIndex < 0) keyIndex += 12;
    if(majorModeIndex < 0) majorModeIndex += 12;
    if(melodicMinorModeIndex < 0) melodicMinorModeIndex += 12;
    
    if(frameCount > 50){
        if(fillalpha < 255 &&  showOverlay) fillalpha = lerp(fillalpha, 255, 0.1);
        if(fillalpha > 0   && !showOverlay) fillalpha = lerp(fillalpha, 0  , 0.1);
    }
    
    background(fillcolor*0.9, 200);
    translate(scaled/2, scaled/2);
    rotate(-PI/2);
    createNoteCircle();
///////// CREATE PATTERNS
    if(majorMinorOther == 0)
        createMajorModeCircle();
    else if(majorMinorOther == 1)
        createMelodicMinorModeCircle();
    else if(majorMinorOther == 2)
        createHarmonicMinorModeCircle();
    else if(majorMinorOther == 3)
        createHarmonicMajorModeCircle();
    else if(majorMinorOther == 4)
        createDoubleHarmonicModeCircle();
    else if(majorMinorOther == 5)
        createOtherModeCircle();

    playedHighlight();
    if(majorMinorOther == 5){
        img1.hide();
        img2.hide();
    }
    if(majorMinorOther != 5 && !imgLoaded){
        img1.show();
        img2.show();
        drawNotes();
    }
    
    if(interact){
        if(frameCount - interactCount > 30){
            // frameRate(5);
            interact = !interact;
        }
    }
    
    if(majorMinorOther != 5 && autoplay > 0){
        let _t = (floor((millis()-autoplay)/250)%8)+1;
        if (played != _t){
            // console.log(_t)
            playTone(modeCheck(_t));
            played = _t;
        }
        if(_t == 8)
            autoplay = 0;
    }
}

function playedHighlight(){
///////// HIGHLIGHT NOTES PLAYED
    for(var i = 0; i < 13; i++){
        if(playedAlpha[i] > 1){
        push();
            rotate(i*PI/6);
            fill(0, playedAlpha[i]); stroke(0, playedAlpha[i]); strokeWeight(2);
            var x = 0.37*scaled, y = 0, w = Size*1.74, l = Size*1.74;
            if(i == 0)
                rect(x, y+l/4, w, l/2);
            else if(i == 12)
                rect(x, y-l/4, w, l/2);
            else
                rect(x, y, w, l);
            playedAlpha[i] = lerp(playedAlpha[i], 0, 0.1);
        pop();
        }
    }
///////// SHOW SCALE NUMBERS
    fill(0, fillalpha); stroke(200, fillalpha*0.8); strokeWeight(3);
    textSize(0.4*Size);
    if(majorMinorOther != 5){
        for(var i = 1; i < 8; i++){
            push();
                let t = modeCheck(i);
                rotate(t*PI/6);
                translate(0.315*scaled, -0.62*Size);
                rotate(-t*PI/6+PI/2);
                text(i, 0, 0);
            pop()
        }
    }
}
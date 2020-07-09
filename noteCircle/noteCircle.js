
function setup(){
    shortAxis = ((windowWidth > windowHeight) ? windowHeight : windowWidth);
    var cnv = createCanvas(1.75*(shortAxis*scale), (shortAxis*scale));
    cnv.parent('noteCircle');
    frameRate(30);
    createMenus();
    changeMode();
}

function draw(){

    if(keyIndex < 0) keyIndex += 12;
    if(majorModeIndex < 0) majorModeIndex += 12;
    if(melodicMinorModeIndex < 0) melodicMinorModeIndex += 12;
    
    background(fillcolor*0.9, 200);
    translate((shortAxis*scale)/2, (shortAxis*scale)/2);
    rotate(-PI/2);
    createNoteCircle();
    if(majorMinorOther == 0)
        createMajorModeCircle();
    if(majorMinorOther == 1)
        createMelodicMinorModeCircle();
    if(majorMinorOther == 2)
        createHarmonicMinorModeCircle();
    if(majorMinorOther == 3)
        createHarmonicMajorModeCircle();
    if(majorMinorOther == 4)
        createDoubleHarmonicModeCircle();
    if(majorMinorOther == 5)
        createOtherModeCircle();

    playedHighlight();
}

function playedHighlight(){
    for(var i = 0; i < 13; i++){
        if(playedAlpha[i] > 1){
        push();
            rotate(i*PI/6);
            fill(0, playedAlpha[i]); stroke(0, playedAlpha[i]); strokeWeight(2);
            var x = 0.37*(shortAxis*scale), y = 0, w = Size*1.74, l = Size*1.74;
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
    fill(0, fillalpha); textSize(0.4*Size);
    if(majorMinorOther != 5){
        for(var i = 1; i < 8; i++){
            push();
                let t = modeCheck(i);
                rotate(t*PI/6);
                translate(0.31*(shortAxis*scale), -0.6*Size);
                rotate(-t*PI/6+PI/2);
                text(i, 0, 0);
            pop()
        }
    }
}
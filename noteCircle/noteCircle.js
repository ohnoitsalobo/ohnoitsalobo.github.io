const Y_AXIS = 1;
const X_AXIS = 2;

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    }
    else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}
/*  */
let scaled;

function setup(){
    shortAxis = ((windowWidth > windowHeight) ? windowHeight : windowWidth);
    scaled = shortAxis*scale;
    var cnv = createCanvas(1.75*scaled, 2*scaled);
    // var cnv = createCanvas(1.75*scaled, scaled);
    cnv.parent('noteCircle');
    frameRate(30);
    createMenus();
    changeMode();
    
    loadMajorScale();
    loadMelodicMinorScale();
    loadHarmonicMinorScale();
}

function draw(){

    if(keyIndex < 0) keyIndex += 12;
    if(majorModeIndex < 0) majorModeIndex += 12;
    if(melodicMinorModeIndex < 0) melodicMinorModeIndex += 12;
    
    if(frameCount > 50){
        if(fillalpha < 255 &&  showOverlay) fillalpha = lerp(fillalpha, 255, 0.1);
        if(fillalpha > 0   && !showOverlay) fillalpha = lerp(fillalpha, 0  , 0.1);
    }
    
    // setGradient(0, 0, width, height, color(75), color(200), Y_AXIS);
    background(fillcolor*0.9, 200);
    translate(scaled/2, scaled/2);
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
    
    if(majorMinorOther < 3)
        drawNotes();
    else if (majorMinorOther != 5){
        rotate(PI/2);
        translate(scaled/4, scaled);
        fill(0); noStroke();
        textSize(Size);
        text("Under construction", 0, 0);
    }
}

function playedHighlight(){
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
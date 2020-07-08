
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

    fill(255); noStroke();
    rectMode(CENTER);
}


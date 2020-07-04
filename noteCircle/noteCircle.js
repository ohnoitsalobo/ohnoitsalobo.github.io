
function setup(){
    shortAxis = 0.95*((windowWidth > windowHeight) ? windowHeight : windowWidth);
    createCanvas(1.75*shortAxis, shortAxis);
    frameRate(30);
    createMenus();
}

function draw(){

    if(noteIndex < 0) noteIndex += 12;
    if(majorModeIndex < 0) majorModeIndex += 12;
    if(melodicMinorModeIndex < 0) melodicMinorModeIndex += 12;
    
    background(50, 200);
    translate(shortAxis/2, shortAxis/2);
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

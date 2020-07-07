
function setup(){
    shortAxis = ((windowWidth > windowHeight) ? windowHeight : windowWidth);
    var cnv = createCanvas(1.75*(shortAxis*scale), (shortAxis*scale));
    cnv.parent('sketch');
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
    // createMarkers();
}

function createMarkers(){
    let t = 0.5, a = 200; 
    let fade = a-a*(frameCount/(t*frameRate()));
    fade = (frameCount < t*frameRate()) ? fade : 0;
    fill (255, fade);
    stroke(0, fade); strokeWeight(2);
            rect(0, 0, 1.75*Size, 1.75*Size);
    // for(let i = 0; i < played.length; i++){
        // if(played[i] > 0){
            // fill(255, played[i]);
        // }
    // }
    
}



















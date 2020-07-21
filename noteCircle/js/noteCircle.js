let scaled; // scaled size
let autoplay = 0, played = 0; // control auto scale player

let cnv, img1, img2, mouseOverText; // html elements
var showImg = true, showTips = true;

function setup(){
///////// SET UP CANVAS
    shortAxis = ((windowWidth > windowHeight) ? windowHeight : windowWidth);
    scaled = shortAxis*scale;
    cnv = createCanvas(1.75*scaled, scaled);
    cnv.parent('noteCircle');
///////// SET UP TOOLTIPS
    mouseOverText = createDiv('');
    mouseOverText.parent('mouseOverText');
    mouseOverText.size(width*0.45);
    mouseOverText.style('font-family', 'Georgia');
    mouseOverText.style('font-size', (scale*1.5)+'em');
///////// INITIALIZE
    createMenus();
    changeMode();
    
    mouseOverText.html(
        "Click on things to learn about them in this box.<br /><br />\
        There are many types of scale patterns in Western (and other) music. The most common set of modes is based around the <b><i>major</i></b> or <b><i>'Ionian'</i></b> scale. Also shown here are <b><i>melodic minor</i></b>, <b><i>harmonic minor</i></b>, <b><i>harmonic major</i></b>, and <b><i>double harmonic</i></b> scales. If you know the pattern of a given scale, you can construct modes out of it by simply applying the pattern in different ways, as shown in this app."
    );

///////// LOAD IMAGES
    loadScales();
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
    
    background(fillcolor*0.9, 200);
    translate(scaled/2, scaled/2);
    rotate(-PI/2);
    createNoteCircle();
///////// CREATE MODE PATTERNS
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
///////// HANDLE PLAYED NOTE HIGHLIGHT
    playedHighlight();

///////// LOAD IMAGES
    if(majorMinorOther != 5){
        document.getElementById("img").style.display = "block";
        if(!showImg)
            drawNotes();
    }
    else 
        document.getElementById("img").style.display = "none";

///////// AUTO-PLAY SCALE
    if(autoplay > 0){
        if(majorMinorOther == 5){
            autoplay = 0;
        }else{
            let _t = (floor((millis()-autoplay)/225)%16)+1;
            if (played != _t){
                let x = _t < 8 ? _t : 16-_t;
        ///// correct tones for melodic minor descending
                if((majorMinorOther == 1 && currentlySelectedMode == 0) && ( _t == 9 || _t == 10 ))
                    playTone(modeCheck(x)-1);
                else
                    playTone(modeCheck(x));
                played = _t;
                interacted = frameCount;
            }
            if(_t == 15)
                autoplay = 0;
            
        }
    }
    
///////// HIDE/SHOW TIPS
    fill(0, 150); noStroke();
    ellipse(0, 1.25*scaled, Size*2, Size*2);
    fill(255, 150);
    textSize(0.4*Size);
    text(showTips ? ("Hide tips") : ("Show tips"), 0, 1.23*scaled)

///////// CONTROL FADE IN / OUT
    if(frameCount > 50){
        if(fillalpha < 255 &&  showOverlay) fillalpha = lerp(fillalpha, 255, 0.1);
        if(fillalpha > 0   && !showOverlay) fillalpha = lerp(fillalpha, 0  , 0.1);
    }
    
///////// STOP RENDERING IF NO INTERACTION
    if(frameCount > 100 && interacted > 0){
        if(frameCount - interacted > 40){
            interacted = 0;
            noLoop();
        }
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
    textSize(0.5*Size);
    if(majorMinorOther != 5){
        for(var i = 1; i < 8; i++){
            let t = modeCheck(i);
            if(showEnharmonic == 0){
                push();
                    rotate(t*PI/6);
                    // translate(0.315*scaled, -0.62*Size);
                    translate(0.26*scaled, 0);
                    noStroke(); fill(fillcolor, fillalpha);
                    rect(0, 0, 0.7*Size, 0.7*Size);
                    rotate(-t*PI/6+PI/2);
                    fill(0, fillalpha); 
                    text(intervalName(0, t), 0, 0);
                pop()
            }else{
                if(t == 0 || t == 2 || t == 7 || t == 9 || t == 11){
                    push();
                        rotate(t*PI/6);
                        // translate(0.315*scaled, -0.62*Size);
                        translate(0.26*scaled, 0);
                        noStroke(); fill(fillcolor, fillalpha);
                        rect(0, 0, 0.7*Size, 0.7*Size);
                        rotate(-t*PI/6+PI/2);
                        fill(0, fillalpha); noStroke();
                        text(i, 0, 0);
                    pop()
                }else{
                    push();
                        rotate(t*PI/6);
                        translate(0.26*scaled, 0);
                        noStroke(); fill(fillcolor, fillalpha);
                        rect(0, 0, 0.7*Size, 0.7*Size);
                        rotate(-t*PI/6+PI/2);
                        fill(0, fillalpha); noStroke();
                        if(showEnharmonic == 1 || showEnharmonic == 2)
                            text(intervalName(1, t), 0, 0);
                        else
                            text(intervalName(2, t), 0, 0);
                    pop()
                    // push();
                        // rotate(t*PI/6);
                        // translate(0.26*scaled, 0.3*Size);
                        // noStroke(); fill(fillcolor, fillalpha);
                        // rect(0, 0, 0.7*Size, 0.7*Size);
                        // rotate(-t*PI/6+PI/2);
                        // fill(0, fillalpha); noStroke();
                        // text(intervalName(2, t), 0, 0);
                    // pop()
                    // push();
                        // rotate(t*PI/6);
                        // translate(0.26*scaled, -0.3*Size);
                        // noStroke(); fill(fillcolor, fillalpha);
                        // rect(0, 0, 0.7*Size, 0.7*Size);
                        // rotate(-t*PI/6+PI/2);
                        // fill(0, fillalpha); noStroke();
                        // text(intervalName(1, t), 0, 0);
                    // pop()
                }
            }
        }
    }
}

function hideTips(){
    if(showTips){
        mouseOverText.hide();
        showTips = !showTips;
    }
    else{
        mouseOverText.show();
        showTips = !showTips;
    }
}

function intervalName(x, i){
    if(x == 0){
             if(i == 0){ return "1";       }
        else if(i == 1){ return "\u266D2"; }
        else if(i == 2){ return "2";       }
        else if(i == 3){ return "\u266D3"; }
        else if(i == 4){ return "3";       }
        else if(i == 5){ return "4";       }
        else if(i == 6){ return "\u266D5"; }
        else if(i == 7){ return "5";       }
        else if(i == 8){ return "\u266D6"; }
        else if(i == 9){ return "6";       }
        else if(i ==10){ return "\u266D7"; }
        else if(i ==11){ return "7";       }
    }
    else if (x == 1){
             if(i == 0){ return "1";       }
        else if(i == 1){ return "\u266F1"; }
        else if(i == 2){ return "2";       }
        else if(i == 3){ return "\u266F2"; }
        else if(i == 4){ return "3";       }
        else if(i == 5){ return "\u266F3"; }
        else if(i == 6){ return "\u266F4"; }
        else if(i == 7){ return "5";       }
        else if(i == 8){ return "\u266F5"; }
        else if(i == 9){ return "6";       }
        else if(i ==10){ return "\u266F6"; }
        else if(i ==11){ return "7";       }
    }
    else if(x == 2){
             if(i == 0){ return "1";       }
        else if(i == 1){ return "\u266D2"; }
        else if(i == 2){ return "2";       }
        else if(i == 3){ return "\u266D3"; }
        else if(i == 4){ return "\u266D4"; }
        else if(i == 5){ return "4";       }
        else if(i == 6){ return "\u266D5"; }
        else if(i == 7){ return "5";       }
        else if(i == 8){ return "\u266D6"; }
        else if(i == 9){ return "6";       }
        else if(i ==10){ return "\u266D7"; }
        else if(i ==11){ return "7";       }
    }
}
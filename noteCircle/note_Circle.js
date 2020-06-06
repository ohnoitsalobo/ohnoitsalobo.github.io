// var synth = new Tone.Synth().toMaster(); // sound var for Tone.js
var synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
    // modulationType: 'sawtooth',
    // modulationIndex: 3,
    // harmonicity: 3.4
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster()

/*            C     C#/Db     D     D#/Eb     E       F     F#/Gb     G     G#/Ab    A   A#/Bb     B       C'    */
var tone = [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.32, 987.76, 1046.5];
var notes = []; // var lastplayed0=0; var lastplayed1=0; var lastplayed2=0;
var lines = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];

var offset = 0, offset1 = 0, off1 = 0;
var visible = 0, vis = 0;
var sargam = 0;
var solfege = 0;
var constellation = 0;
var currPos = 0, nextPos = 0;

function setup() {
    createCanvas(1000, 620);
    frameRate(5);
    // synth = new Tone.Synth().toMaster();
    for(var i = 0; i < 12; i++){
        notes[i] = p5.Vector.fromAngle(-PI/2+i*PI/6);
        notes[i].x *= 0.75*300;
        notes[i].y *= 0.75*300;
    }
}

function draw() {
    if(!visible) { if (millis() > 3000 && !vis) { visible = 1; vis = 1; } }
    background(255);
    translate(310, 310);
    
    fill(visible ? 150 : 125);
    strokeWeight(1);
    ellipse(0, 0, 0.9*600, 0.9*600);              // draw main circle

    textAlign(CENTER);
    textFont('Times New Roman'); fill(0);
    push();    
        rotate(-PI/2+offset); //fill('rgba(255,   0,   0, 1)'); 
        arc(0, -0.9*300, 30, 30, -PI, 0);                  // marker circle on the edge
        for(var i = 0; i < 12; i++){
            var d = -0.69*300;
            textSize(55); fill(constellation ? 0 : 255);
            if(i==0) { text('A', 0, d); }                                      // DRAW NOTE LETTERS
            if(i==2) { text('B', 0, d); textSize(18); text('Cb',  20, d-37); } //
            if(i==3) { text('C', 0, d); textSize(18); text('B#', -20, d+12); } //
            if(i==5) { text('D', 0, d); }                                      // 'natural' notes
            if(i==7) { text('E', 0, d); textSize(18); text('Fb',  20, d-37); } // are larger
            if(i==8) { text('F', 0, d); textSize(18); text('E#', -20, d+12); } //
            if(i==10){ text('G', 0, d); }                                      //

            textSize(35); fill(0);                                             //
            if(i==1) { text('A#', -10, d-22); text('Bb', 10, d+10); }          //
            if(i==4) { text('C#', -10, d-22); text('Db', 10, d+10); }          // 'sharps / flats'
            if(i==6) { text('D#', -10, d-22); text('Eb', 10, d+10); }          // 
            if(i==9) { text('F#', -10, d-22); text('Gb', 10, d+10); }          //
            if(i==11){ text('G#', -10, d-22); text('Ab', 10, d+10); }          //
            
            rotate(PI/6);
        }

        rectMode(CENTER);
        rotate(-offset);
        rotate(offset1+0.0005*off1);
        fill(100);
        arc(0.9*300, 0, 20, 20, -PI/2, PI/2); // marker circle
        if(!constellation){
            if(visible){
                for(var i = 0; i < 12; i++){
                    var d = -0.5*300;
                    var step = -PI/2-PI/30;
                    textSize(30); fill(0); stroke(0);
                    if(solfege){
                        if(i==3) { rect  (0, d*1.075-10, 35, 30); fill(255); 
                                   text('Do', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==5) { text('Re', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==7) { text('Mi', 0, d*1.075); fill('rgba(0, 255, 0, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/6-PI/60); }
                        if(i==8) { text('Fa', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==10){ text('So', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==0) { text('La', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==2) { text('Ti', 0, d*1.075); fill('rgba(0, 255, 0, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/6-PI/60); }
                    } else if(sargam){
                        if(i==3) { rect   (0, d*1.075-10, 30, 30); fill(255); 
                                   text('Sa', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==5) { text('Re', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==7) { text('Ga', 0, d*1.075); fill('rgba(0, 255, 0, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/6-PI/60); }
                        if(i==8) { text('Ma', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==10){ text('Pa', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==0) { text('Dha',0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==2) { text('Ni', 0, d*1.075); fill('rgba(0, 255, 0, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/6-PI/60); }
                    } else {
                        if(i==3) { ellipse  (0, d*1.075-10, 30, 30); fill(255); 
                                   text('1', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==5) { text('2', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==8) { text('4', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==10){ text('5', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==0) { text('6', 0, d*1.075); fill('rgba(0, 0, 255, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/3-PI/60); }
                        if(i==7) { text('3', 0, d*1.075); fill('rgba(0, 255, 0, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/6-PI/60); }
                        if(i==2) { text('7', 0, d*1.075); fill('rgba(0, 255, 0, 1)'); noStroke(); arc(0, 0, d*2.05, d*2.05, step, step+PI/6-PI/60); }
                    }
                    noStroke(); fill(150); ellipse(0, 0, d*1.95, d*1.95);
                    
                    if(i==0 || i==2 || i==3 || i==5 || i==7 || i==8 || i==10){
                        fill('#ffffff22'); stroke(0); strokeWeight(1.5);
                    }
                    if(i==1 || i==4 || i==6 || i==9 || i==11){
                        fill(150); noStroke();
                    }
                    rect(0, d-75, 70, 70);
                    rotate(PI/6);
                }
            }
            fill(0); 
            if (visible){ var xx = 590, yy = 250;
                rotate(PI/2);
                text("Ionian (Major)", xx, yy);
                rotate(PI/3);
                text("Dorian",         xx, yy);
                rotate(PI/3);
                text("Phrygian",       xx, yy);
                rotate(PI/6);
                text("Lydian",         xx, yy);
                rotate(PI/3);
                text("Mixolydian",     xx, yy);
                rotate(PI/3);
                text("Aeolian (Minor)",xx, yy);
                rotate(PI/3);
                text("Locrian",        xx, yy);
                rotate(-7*PI/3);
            }
            rotate(-offset1);
            rotate(offset);
            for(var i = 0; i < 12; i++){
                var d = -0.36*300;
                fill(255); noStroke();
                if(i==0) { rect(0, d, 30, 73); }
                if(i==2) { rect(0, d, 30, 73); }
                if(i==3) { rect(0, d, 30, 73); }
                if(i==5) { rect(0, d, 30, 73); }
                if(i==7) { rect(0, d, 30, 73); }
                if(i==8) { rect(0, d, 30, 73); }
                if(i==10){ rect(0, d, 30, 73); }

                fill(0);
                if(i==1) { rect(0, d, 15, 73); }
                if(i==4) { rect(0, d, 15, 73); }
                if(i==6) { rect(0, d, 15, 73); }
                if(i==9) { rect(0, d, 15, 73); }
                if(i==11){ rect(0, d, 15, 73); }
                    
                rotate(PI/6);
            }
            rotate(-offset);

            rotate(offset1);
            if(visible){
                for(var i = 0; i < 12; i++){
                    var d = -0.36*300;

                    if(i==3){
                        rotate(-offset1-0.0005*off1);
                        fill('#ff000022'); noStroke();
                        rect(0, d-118, 70, 70);
                        rotate(offset1+0.0005*off1);
                    }
                    fill(150); noStroke();
                    if(i==1) { rect(0, d, 33, 76); }
                    if(i==4) { rect(0, d, 33, 76); }
                    if(i==6) { rect(0, d, 33, 76); }
                    if(i==9) { rect(0, d, 33, 76); }
                    if(i==11){ rect(0, d, 33, 76); }
                        
                    rotate(PI/6);
                }
            }
            rotate(-offset1);
        }
    pop();
    if(constellation){
        noFill(); stroke(175);
        ellipse(0, 0, 300, 300);
        rotate(offset1);
        for(var i = 0; i < 12; i++){
            if(lines[i]){
                push();
                rotate(-9*PI/12+i * PI/6);
                strokeWeight(3);
                if (i == 0)    { strokeWeight(4); stroke('rgba(255,   0,   0, 1)'); }
                // else if (i == 2)  stroke('rgba(255,   0,   0, 1)'); 
                // else if (i == 4)  stroke('rgba(255, 255,   0, 1)'); 
                // else if (i == 5)  stroke('rgba(  0, 255,   0, 1)'); 
                // else if (i == 7)  stroke('rgba(  0, 255, 255, 1)'); 
                // else if (i == 9)  stroke('rgba(  0,   0, 255, 1)'); 
                // else if (i == 11) stroke('rgba(255,   0, 255, 1)'); 
                else             stroke(0);
                line(0, 0, 125, 125);
                rotate(9*PI/12-i * PI/6);
                pop();
            }
        }
        rotate(-offset1);
    }
    fill(0);
    textSize(28); if(visible) {
        text("ROOT", 0, -height/2+22);
    }
    textFont("Courier New");
    textSize(40);  if(visible) text("MODE: ", width/2-60, height/2-60);
    textSize(14); textAlign(LEFT); strokeWeight(0.5); stroke(0);
    noStroke(); fill(255); rect(400, -320, 300, 540); rect(400, 265, 300, 50);
    if (visible) { stroke(0); fill('rgba(0,   0,   0, 0)'); rect(490, 220, 198, 45); fill(255);}
    fill(0); var t = 1;
    textFont("Times New Roman"); textSize(20); textAlign(CENTER);
    for(var i = 0; i < 12; i++){
        fill('#00000033');
        if (i != 0) rect(-10, -305, 20, 20);
        else{
            rect(-63, -295, 20, 20);
            rect( 43, -295, 20, 20);
        }
        fill(0);
        var d = -0.69*300 - 82;
        if(i==0) { text('I', -53, d+10); text('Q', 53, d+10); }
        if(i==1) { text('2', 0, d); }
        if(i==2) { text('W', 0, d); }
        if(i==3) { text('3', 0, d); }
        if(i==4) { text('E', 0, d); }
        if(i==5) { text('R', 0, d); }
        if(i==6) { text('5', 0, d); }
        if(i==7) { text('T', 0, d); }
        if(i==8) { text('6', 0, d); }
        if(i==9) { text('Y', 0, d); }
        if(i==10){ text('7', 0, d); }
        if(i==11){ text('U', 0, d); }
        rotate(PI/6);
    }
    textAlign(LEFT); textSize(20); text("Click center to\ntoggle overlay", -300, -height/2+15);
    // if(visible){
        textAlign(CENTER);
        fill('#00000055'); 
        rect(350, 55, 70, 70); rect(450, 55, 70, 70);
        rect(350, -120, 70, 70); rect(450, -120, 70, 70);
        fill (0); textSize(100);
        text("+", 385, 122); text("-", 485, 115);
        text("<", 385, -53); text(">", 485, -53);
        textSize(30); textFont("Georgia");
        text("Click to change key",  440, 35);
        text("Click to change mode", 440, -140);
        // text("Drag the circle to change mode", 560, -height/2+40);
        text("DIATONIC MODE CHEAT SHEET", 400, -height/2+30);
        textSize(20);
        text("Tap/click the highlighted\n  notes to hear tones\n  or use the keyboard", 400, -height/2+60);
    // }
}

function keyPressed(){
    stroke(0); strokeWeight(5);
    if(keyCode === RIGHT_ARROW) { keyUp(); }
    if(keyCode === LEFT_ARROW) { keyDown(); }
    if(visible){
        if(keyCode === UP_ARROW){
            offset1+= PI/6; 
            line(50, -290, 150, -250);
            line(150, -250, 130, -270);
        }
        if(keyCode === DOWN_ARROW) {
            offset1-= PI/6;
            line(-50, -290, -150, -250);
            line(-150, -250, -130, -270);
        }
    }
}

function keyTyped(){
    // if(key == '='){ offset +=   PI/6; for(var j = 0; j < 13; j++) tone[j] /= 1.059463; }
    // if(key == '-'){ offset -=   PI/6; for(var j = 0; j < 13; j++) tone[j] *= 1.059463; }
    // if(key == '_'){ offset += 7*PI/6; for(var j = 0; j < 13; j++) tone[j] /= 1.498307; }
    // if(key == '+'){ offset -= 7*PI/6; for(var j = 0; j < 13; j++) tone[j] *= 1.498307; }
    // if(key == ','){ offset -= TWO_PI; for(var j = 0; j < 13; j++) tone[j] /= 2; }
    // if(key == '.'){ offset += TWO_PI; for(var j = 0; j < 13; j++) tone[j] *= 2; }
    if(key == ','){ offset1 -= PI/6; }
    if(key == '.'){ offset1 += PI/6; }
    if(key == 'v' || key == 'V'){ visible = !visible; }
    // if(key == 's') { solfege = !solfege; sargam  = false;  }
    // if(key == 'S') { sargam  = !sargam;  solfege = false; }
    // if(key == 'c') { constellation  = !constellation; }
    if(key == 'q') { playTone(0);  }
    if(key == '2') { playTone(1);  }
    if(key == 'w') { playTone(2);  }
    if(key == '3') { playTone(3);  }
    if(key == 'e') { playTone(4);  }
    if(key == 'r') { playTone(5);  }
    if(key == '5') { playTone(6);  }
    if(key == 't') { playTone(7);  }
    if(key == '6') { playTone(8);  }
    if(key == 'y') { playTone(9);  }
    if(key == '7') { playTone(10); }
    if(key == 'u') { playTone(11); }
    if(key == 'i') { playTone(12); }
    return false;
}

function playedHighlight(x){
    strokeWeight(1); fill('#00000077');
    if(x==0)
        rect(0, -260, 35, 70);
    else if(x==12)
        rect(-35, -260, 35, 70);
    else{
        rotate(x*PI/6);
        rect(-35, -260, 70, 70);
        rotate(-x*PI/6);
    }
}

function playTone(t){
    synth.triggerAttackRelease(tone[t], "8n");
    playedHighlight(t);
}

function mousePressed(){
    var d = 80;
    for(var i = 0; i < 12; i++){
        if(!constellation){
            var dx = notes[i].x+300;
            var dy = notes[i].y+300;
            if(i == 0){
                if(mouseY > dy-d/2 && mouseY < dy+d/2){
                    if(mouseX > dx && mouseX < dx+d/2){
                        playTone(0);
                    }
                    else if(mouseX > dx-d/2 && mouseX < dx){
                        playTone(12);
                    }
                }
            }
            else if(mouseX > dx-d/2 && mouseX < dx+d/2 && mouseY > dy-d/2 && mouseY < dy+d/2){
                playTone(i);
                // rect(dx-300, dy-340, -40, 80);
            }
        }else{
            var dx = notes[i].x/1.5+300;
            var dy = notes[i].y/1.5+300;
            if(mouseX > dx-d/3 && mouseX < dx+d/3 && mouseY > dy-d/3 && mouseY < dy+d/3){
                lines[i] = !lines[i];
                playTone(i);
            }
        }
    }
    if(mouseX>300-25 && mouseX<300+25 && mouseY>300-25 && mouseY<300+25)
        visible = !visible;
    if(mouseX>650 && mouseX<720 && mouseY>355 && mouseY<425)
        keyDown();
    if(mouseX>750 && mouseX<820 && mouseY>355 && mouseY<425)
        keyUp();
    stroke(0); strokeWeight(5);
    if(visible){
        if(mouseX>750 && mouseX<820 && mouseY>180 && mouseY<250){
            offset1+= PI/6; 
            line(50, -290, 150, -250);
            line(150, -250, 130, -270);
        }
        if(mouseX>650 && mouseX<720 && mouseY>180 && mouseY<250){
            offset1-= PI/6; 
            line(-50, -290, -150, -250);
            line(-150, -250, -130, -270);
        }
    }
    return false;
}

function keyUp(){
    offset += PI/6; 
    for(var j = 0; j < 13; j++) 
        tone[j] /= 1.059463;
    stroke(0); strokeWeight(5);
    line(50, -290, 150, -250);
    line(150, -250, 130, -270);
}

function keyDown(){
    offset -= PI/6;
    for(var j = 0; j < 13; j++)
        tone[j] *= 1.059463;
    stroke(0); strokeWeight(5);
    line(-50, -290, -150, -250);
    line(-150, -250, -130, -270);
}
// function mouseReleased(){
    // var d = 80;
    // for(var i = 0; i < 12; i++){
        // if(!constellation){
            // var dx = notes[i].x+300;
            // var dy = notes[i].y+300;
            // if(mouseX > dx-d/2 && mouseX < dx+d/2 && mouseY > dy-d/2 && mouseY < dy+d/2){
                // if (i == 0) playTone(12);
            // }
        // }
    // }
    // return false;
// }

// function mouseDragged(){
    // frameRate(20);
    // var dy = mouseY-pmouseY;
    // if(mouseX < width/2-150) dy = -dy;
    // var dx = mouseX-pmouseX;
    // if(mouseY > height/2) dx = -dx;
    // off1 += abs(dx)>abs(dy) ? dx : dy;
    // frameRate(5);
// }

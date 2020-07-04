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

function playTone(t){
    synth.triggerAttackRelease(tone[t], "8n");
    // playedHighlight(t);
}

function mousePressed(){
    // console.log(shortAxis-mouseX + ", " + shortAxis-mouseY)
    fill(255); stroke(255);
    // var xpos=-mouseY+shortAxis/2;
    // var ypos= mouseX-shortAxis/2;
    // ellipse(xpos, ypos, 200, 200);
    rotate(PI/2);
    translate(-shortAxis/2, -shortAxis/2);
    ellipse(mouseX, mouseY, 200, 200);
    playTone(0);
    /* * /
    var d = 80;
    for(var i = 0; i < 12; i++){
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
    /* */
}

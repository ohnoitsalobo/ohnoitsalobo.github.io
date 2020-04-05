var offset0=0;
var offset1=0;
var offset2=0;
var offset3=0;
var visible = 1;

var synth;
var tones = [440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880];
var notes = [];
var angle = 0;

function setup() {
    createCanvas(600, 600);
    synth = new Tone.Synth().toMaster();
    for(var i = 0; i < 12; i++){
        notes[i] = p5.Vector.fromAngle(-PI/2+i*PI/6);
    }
}

function draw() {
    background(255);
    
    push();
        translate(width/2, height/2);
        for(var i = 0; i < 12; i++){
            // line(0, 0, notes[i].x*width/2, notes[i].y*height/2);
        }
        fill(visible ? 150 : 100);
        ellipse(0, 0, 0.9*width, 0.9*height);
        
        rectMode(CENTER);
        textAlign(CENTER);
        textFont('Times New Roman'); fill(0);
        rotate(-PI/2);
        push();
            rotate(offset0*0.001+offset1);
            for(var i = 0; i < 12; i++){
                var d = -0.7*height/2;
                
                if(i==0){ fill(0); arc(0, d-60, 30, 30, -PI, 0); }
                fill(255); textSize(50); stroke(0);
                if(i==0) { text('A', 0, d); }
                if(i==2) { text('B', 0, d); }
                if(i==3) { text('C', 0, d); }
                if(i==5) { text('D', 0, d); }
                if(i==7) { text('E', 0, d); }
                if(i==8) { text('F', 0, d); }
                if(i==10){ text('G', 0, d); }

                fill(0); textSize(25); stroke(0);
                if(i==1) { text('A#', -10, d-20); text('Bb', 10, d+5);}
                if(i==4) { text('C#', -10, d-20); text('Db', 10, d+5);}
                if(i==6) { text('D#', -10, d-20); text('Eb', 10, d+5);}
                if(i==9) { text('F#', -10, d-20); text('Gb', 10, d+5);}
                if(i==11){ text('G#', -10, d-20); text('Ab', 10, d+5);}
                
                rotate(PI/6);
            }
        pop();
        if(visible){
            push();
            rotate(offset3);
            for(var i = 0; i < 12; i++){
                var d = -0.7*height/2;
                var step = -PI/2-PI/30;
                fill('rgba(0, 221, 170, 0.6)'); textSize(30); noStroke();
                if(i==3) { arc(0, 0, d*1.84, d*1.84, step, step+PI/3-PI/60); fill(0); ellipse(0, d*0.84, 32, 32); fill(255); text('1', 0, d*0.8); }
                if(i==5) { arc(0, 0, d*1.84, d*1.84, step, step+PI/3-PI/60); fill(0); text('2', 0, d*0.8); }
                if(i==8) { arc(0, 0, d*1.84, d*1.84, step, step+PI/3-PI/60); fill(0); text('4', 0, d*0.8); }
                if(i==10){ arc(0, 0, d*1.84, d*1.84, step, step+PI/3-PI/60); fill(0); text('5', 0, d*0.8); }
                if(i==0) { arc(0, 0, d*1.84, d*1.84, step, step+PI/3-PI/60); fill(0); text('6', 0, d*0.8); }
                fill('rgba(0, 102, 102, 0.6)');
                if(i==7) { arc(0, 0, d*1.84, d*1.84, step, step+PI/6-PI/60); fill(0); text('3', 0, d*0.8); }
                if(i==2) { arc(0, 0, d*1.84, d*1.84, step, step+PI/6-PI/60); fill(0); text('7', 0, d*0.8); }
                fill(150); ellipse(0, 0, d*1.51, d*1.51);
                rotate(PI/6);
            }
            pop();
            push();
            rotate(offset0*0.001+offset1);
            for(var i = 0; i < 12; i++){
                var d = -0.7*height/2;
                fill(255); textSize(50); stroke(0);
                if(i==0) { rect(0, -120, 35, 73); }
                if(i==2) { rect(0, -120, 35, 73); }
                if(i==3) { rect(0, -120, 35, 73); }
                if(i==5) { rect(0, -120, 35, 73); }
                if(i==7) { rect(0, -120, 35, 73); }
                if(i==8) { rect(0, -120, 35, 73); }
                if(i==10){ rect(0, -120, 35, 73); }

                fill(0); textSize(25); stroke(0);
                if(i==1) { rect(0, -120, 20, 73); }
                if(i==4) { rect(0, -120, 20, 73); }
                if(i==6) { rect(0, -120, 20, 73); }
                if(i==9) { rect(0, -120, 20, 73); }
                if(i==11){ rect(0, -120, 20, 73); }
                
                rotate(PI/6);
            }
            pop();
            push();
            rotate(offset3);
            for(var i = 0; i < 12; i++){
                var d = -0.75*height/2;

                noFill(); stroke(0); strokeWeight(1.5);
                if(i==0)  rect(0, d, 60, 60);
                if(i==2)  rect(0, d, 60, 60);
                if(i==3)  rect(0, d, 60, 60);
                if(i==5)  rect(0, d, 60, 60);
                if(i==7)  rect(0, d, 60, 60);
                if(i==8)  rect(0, d, 60, 60);
                if(i==10) rect(0, d, 60, 60);

                fill(150); noStroke();
                if(i==1) { rect(0, d, 60, 60); rect(0, -117, 45, 80); }
                if(i==4) { rect(0, d, 60, 60); rect(0, -117, 45, 80); }
                if(i==6) { rect(0, d, 60, 60); rect(0, -117, 45, 80); }
                if(i==9) { rect(0, d, 60, 60); rect(0, -117, 45, 80); }
                if(i==11){ rect(0, d, 60, 60); rect(0, -117, 45, 80); }
                rotate(PI/6);
            }
            pop();
        }
    pop();
    fill(mouseIsPressed ? 0 : 100);
    ellipse(mouseX, mouseY, 10, 10);
}

function mouseDragged(){
    var dy = mouseY-pmouseY;
    if(mouseX < width/2) dy = -dy;
    var dx = mouseX-pmouseX;
    if(mouseY > height/2) dx = -dx;
    // if(keyPressed && keyCode == SHIFT)
        // offset2 += abs(dx)>abs(dy) ? dx : dy;
    // else
    offset0 += abs(dx)>abs(dy) ? dx : dy;
}

function keyTyped(){
    if(key === '-'){
        offset1 -= PI/6;
    }
    if(key === '='){
        offset1 += PI/6;
    }
    if(key === '+'){
        offset1 -= 7*PI/6;
    }
    if(key === '_'){
        offset1 += 7*PI/6;
    }
    if(key === 'v' || key === 'V'){
        visible = !visible;
    }
    if(key === ','){
        offset3 -= PI/6;
    }
    if(key === '.'){
        offset3 += PI/6;
    }
}

function mouseClicked(){
    synth.triggerAttackRelease(tones[1], "8n");
}

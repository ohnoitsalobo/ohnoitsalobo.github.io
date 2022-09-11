// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

var fireworks = [];
var gravity;

function setup() {
    // var canvas = createCanvas(400, 300);
    var canvas = createCanvas(window.innerWidth*0.9, window.innerHeight*0.4);
    canvas.parent('sketch-holder');
    colorMode(HSB);
    gravity = createVector(0, 0.3);
    stroke(255);
    fill(0);
    strokeWeight(4);
    background(0);
}

function draw() {
    // textAlign(LEFT); var textsize = 17; textSize(textsize);
    // text("Fireworks programmed using p5.js", 0, textsize);
    colorMode(RGB);
    background(0, 0, 0, 25);

    if (random(1) < 0.03) {
        fireworks.push(new Firework());
    }

    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }
}

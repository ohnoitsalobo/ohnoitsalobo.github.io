// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

var inc = 0.1;
var scl = 12;
var cols, rows;

var zoff = 0;

// var fr;

var particles = [];

var flowfield;

var loopCount = 0, loops = 15;

function setup() {
    // canvas = createCanvas(400, 400);
    // var canvas = createCanvas(window.innerWidth, floor(window.innerHeight/3));
    var sizeX = document.getElementById("top").clientWidth;
    var sizeY = floor(window.innerHeight/3);
    var canvas = createCanvas(sizeX, sizeY);
    canvas.parent('perlinflow');
    frameRate(15);
    colorMode(HSB, 255);
    cols = floor(width / scl);
    rows = floor(height / scl);
    // fr = createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 1000; i++) {
        particles[i] = new Particle();
    }
    // background(0);
}

function draw() {
    strokeWeight(1);
    loopCount++;
    if(loopCount > loops){
        background(0, 10);
        loopCount = 0;
    }else{
        background(0, 1);
    }

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // strokeWeight(1);
            // line(0, 0, scl, 0);
            // pop();
        }
        yoff += inc;

        zoff += 0.0004;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }

    // fr.html(floor(frameRate()));
    var scale = 0.2;
    textFont("Bellota");
    textSize(height*scale); textAlign(LEFT);
    fill(10, 10); 
    stroke(255, 10); strokeWeight(1);
    text("@ohnoitsalobo", 0.01*scale*width, height*scale);
    textSize(0.25*scale*height); textAlign(LEFT);
    // stroke(0,10);  strokeWeight(0.1);
    noStroke();
    fill(255, 2); 
    text("Perlin noise flow\nGenerated using p5.js", 5, height-2*textSize());
}

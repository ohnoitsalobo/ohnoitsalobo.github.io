// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

// var fr;

var particles = [];

var flowfield;

var loopCount = 0, loops = 10;

function setup() {
  // canvas = createCanvas(400, 400);
    var canvas = createCanvas(window.innerWidth, window.innerHeight*0.3);
    canvas.parent('sketch-holder');
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  // fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }
  background(15);
}

function draw() {
    loopCount++;
    if(loopCount > loops){
        background(0, 8);
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

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
}

// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
based on a 
PoseNet example using p5.js
=== */
let dnose = [];
let pg;
let video;
let poseNet;
let poses = [];
let le;
let ang = 0;

//let re

function setup() {
  pixelDensity(1);

  if (windowWidth > windowHeight) {
    createCanvas(640, 480);
  } else {
    createCanvas(480, 640);
  }
  
  //createCanvas(windowWidth,windowHeight);
  video = createCapture(VIDEO);
  video.size(width / 4, height / 4);
  pg = createGraphics(width, height);
  //video.filter(THRESHOLD)

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  textAlign(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function modelReady() {
  select("#status").html("Model Loaded, Dance and draw");
}

function mousePressed() {
  console.log(JSON.stringify(poses));
}

function draw() {
  const flippedVideo = ml5.flipImage(video);
  translate(width / 2, height / 2);

  //flippedVideo
  //image(flippedVideo, 0, 0, width, height);
  //image(video, 0, 0, width, height);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Cre

    let rw = pose["nose"];
    //ellipse(width - rw.x, rw.y, 20, 20);
    //text("It's time",width - rw.x, rw.y,)
    let rwx = (width / 4 - rw.x) * 4;  // changed from 4 top 10
    let rwy = rw.y * 4;
    //let rwx = (width / 10 - rw.x) * 10;  // changed from 4 top 10
    //let rwy = rw.y * 10;

    dnose.unshift(createVector(rwx, rwy));
    pg.stroke(255, 0, 0);
    pg.strokeWeight(3);
    pg.clear();
    //pg.ellipse(width-rw.x,rw.y,10,10)
    if (dnose.length > 0) {
      pg.noFill();
      pg.beginShape();
      for (let i = 0; i < dnose.length; i++) {
        pg.vertex(dnose[i].x, dnose[i].y);
      }
      pg.endShape();
    }
    if (dnose.length > 200) dnose.pop();
    //print(dnose.length)
    image(flippedVideo, 0, 0, width, height);
    //rotate(frameCount/4)
    // dont rotate the canvas rotate the points

    image(pg, 0, 0, width, height);
  }
}

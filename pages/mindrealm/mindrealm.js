// The base of this sketch was sourced from https://teddavis.org/p5live
// Code refinement and customisation was made with the help of ChatGPT

let images = [];
let hoverImages = [];
let numPlanes = 7;
let v = 0.25;
let urls = [
  "../envy/envy.html",
  "../gluttony/gluttony.html",
  "../greed/greed.html",
  "../wrath/wrath.html",
  "../pride/pride.html",
  "../lust/lust.html",
  "../sloth/sloth.html",
];
let texts = [
  "Emmeline",
  "Gillian",
  "Gwendolyn",
  "Winona",
  "Piper",
  "Lorelei",
  "Sorrel",
];
let hoveredText = "";
let font;
let textSizeFactor = 0;
let initialTextSize = 25;
let maxTextSize = 50;
let heartbeatTimer = 0;
let heartbeatDuration = 110;
let paused = false;
let customFrameCount = 0;

function preload() {
  images[0] = loadImage("images/Face-Emmeline-B.png");
  images[1] = loadImage("images/Face-Gillian-B.png");
  images[2] = loadImage("images/Face-Gwendolyn-B.png");
  images[3] = loadImage("images/Face-Winona-B.png");
  images[4] = loadImage("images/Face-Piper-B.png");
  images[5] = loadImage("images/Face-Lorelei-B.png");
  images[6] = loadImage("images/Face-Sorrel-B.png");

  hoverImages[0] = loadImage("images/Face-Emmeline-B_V02.png");
  hoverImages[1] = loadImage("images/Face-Gillian-B_V02.png");
  hoverImages[2] = loadImage("images/Face-Gwendolyn-B_V02.png");
  hoverImages[3] = loadImage("images/Face-Winona-B_V02.png");
  hoverImages[4] = loadImage("images/Face-Piper-B_V02.png");
  hoverImages[5] = loadImage("images/Face-Lorelei-B_V02.png");
  hoverImages[6] = loadImage("images/Face-Sorrel-B_V02.png");

  font = loadFont("Roboto-Thin.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(initialTextSize);
  textFont(font);
  noCursor();
  console.log(
    "Setup completed. Canvas created with size:",
    windowWidth,
    windowHeight
  );
}

function draw() {
  background(0);

  ortho();

  hoveredText = "";
  let isHovering = false;

  for (let i = 0; i < numPlanes; i++) {
    push();
    let pos = rPos(i * 50);
    translate(pos.x, pos.y);
    noStroke();

    if (isMouseOver(pos.x, pos.y, 150, 150)) {
      texture(hoverImages[i % 7]);
      hoveredText = texts[i];
      isHovering = true;
    } else {
      texture(images[i % 7]);
    }

    plane(150, 150);
    pop();
  }

  if (!isHovering) {
    customFrameCount++;
  }

  if (hoveredText !== "") {
    resetMatrix();
    fill(255);

    heartbeatTimer++;
    let pulseProgress = heartbeatTimer % heartbeatDuration;
    if (pulseProgress < heartbeatDuration * 0.2) {
      textSizeFactor =
        (pulseProgress / (heartbeatDuration * 0.2)) *
        (maxTextSize - initialTextSize);
    } else if (pulseProgress < heartbeatDuration * 0.5) {
      textSizeFactor =
        ((heartbeatDuration * 0.5 - pulseProgress) /
          (heartbeatDuration * 0.3)) *
        (maxTextSize - initialTextSize);
    } else if (pulseProgress < heartbeatDuration * 0.7) {
      textSizeFactor =
        ((pulseProgress - heartbeatDuration * 0.5) /
          (heartbeatDuration * 0.2)) *
        (maxTextSize - initialTextSize);
    } else {
      textSizeFactor =
        ((heartbeatDuration - pulseProgress) / (heartbeatDuration * 0.3)) *
        (maxTextSize - initialTextSize);
    }

    textSize(initialTextSize + textSizeFactor);
    text(hoveredText, 0, 0);
  }

  drawCustomCursor();
}

function rPos(off) {
  let x = (sin(off + customFrameCount * v) * width) / 3;
  let y = (cos(off + customFrameCount * v) * height) / 3;
  return createVector(x, y);
}

function isMouseOver(x, y, w, h) {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  return mx > x - w / 2 && mx < x + w / 2 && my > y - h / 2 && my < y + h / 2;
}

function mouseClicked() {
  for (let i = 0; i < numPlanes; i++) {
    let pos = rPos(i * 50);
    let x = (sin(i * 50 + customFrameCount * v) * width) / 3;
    let y = (cos(i * 50 + customFrameCount * v) * height) / 3;

    let d = dist(mouseX - width / 2, mouseY - height / 2, x, y);
    if (d < 75) {
      window.open(urls[i], "_blank");
    }
  }
}

let trailX = 0;
let trailY = 0;
let prevX = 0;
let prevY = 0;
let circleSize = 40;
const maxSize = 400;
const minSize = 10;

function drawCustomCursor() {
  let speed = dist(mouseX, mouseY, prevX, prevY);

  trailX = lerp(trailX, mouseX, 0.07);
  trailY = lerp(trailY, mouseY, 0.07);

  let targetSize = map(speed, 0, 50, minSize, maxSize);
  targetSize = constrain(targetSize, minSize, maxSize);

  circleSize = lerp(circleSize, targetSize, 0.1);

  push();
  resetMatrix();
  stroke(255);
  strokeWeight(2);
  noFill();
  line(
    mouseX - width / 2,
    mouseY - height / 2,
    trailX - width / 2,
    trailY - height / 2
  );
  ellipse(trailX - width / 2, trailY - height / 2, circleSize, circleSize);
  pop();

  prevX = mouseX;
  prevY = mouseY;
}

document.getElementById("toggleButton").addEventListener("click", function () {
  var overlay = document.getElementById("overlay");
  var button = this;
  if (overlay.classList.contains("show")) {
    overlay.classList.remove("show");
    button.classList.remove("cross");
    setTimeout(function () {
      overlay.style.display = "none";
    }, 500);
  } else {
    overlay.style.display = "flex";
    setTimeout(function () {
      overlay.classList.add("show");
      button.classList.add("cross");
    }, 10);
  }
});

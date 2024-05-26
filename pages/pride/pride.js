let capture;
let videoSize = 10;
let centerX, centerY;

let customWords = [
  "If I were to slip and fall", 
  "Relinquishing the saddle", 
  "Create", 
  "Once and for all", 
  "A clear sign of a lost battle",
  "Would they lie just a little",
  "Pretending it's a riddle?",
  "Would I be me still",
  "Or just the latest ashes on a relatives mantle",
  "Avoiding the ferry man becomes a new struggle",
  "Will I hear a verdict from a god or a devil?",
  "Thanks too the highway install",
  "And despite all the people",
  "It's far quicker to stroll into hell",
  "And the toll is only one soul"
];

let currentWordIndex = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();
  textAlign(CENTER, CENTER);
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  clear(); 

  push();
  translate(centerX, centerY);
  scale(-1, 1);
  image(capture, -videoSize / 2, -videoSize / 2, videoSize, videoSize);
  pop();

  videoSize += 1;
}

function mousePressed() {
  generateWord();
}

function generateWord() {
  let currentWord = customWords[currentWordIndex];

  let wordElement = createDiv(currentWord);

  wordElement.position(random(width), random(height));
  wordElement.addClass('word');

  wordElement.mousePressed(() => {
    wordElement.remove();
  });

  currentWordIndex = (currentWordIndex + 1) % customWords.length;
}

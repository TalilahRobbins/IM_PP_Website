let capture;
let videoSize = 10; // Initial size of the video
let centerX, centerY; // Center coordinates for the video

// Custom list of words
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

// Index to keep track of the current word
let currentWordIndex = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();
  textAlign(CENTER, CENTER);
  // Calculate the center of the canvas
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  clear(); // Clear the canvas to make the background transparent

  // Draw the inverted video feed, starting small and growing bigger
  push();
  translate(centerX, centerY);
  scale(-1, 1); // Flip the video feed horizontally
  image(capture, -videoSize / 2, -videoSize / 2, videoSize, videoSize);
  pop();

  // Increase the video size for the next frame
  videoSize += 1; // You can adjust the speed of growth by changing this value
}

function mousePressed() {
  // Generate a new word element
  generateWord();
}

// Function to generate a new word element
function generateWord() {
  // Get the current word from the list
  let currentWord = customWords[currentWordIndex];

  // Create a new word element
  let wordElement = createDiv(currentWord);

  // Set CSS styles for the word element
  wordElement.position(random(width), random(height));
  wordElement.addClass('word');

  // Add click event listener to close the word element when clicked
  wordElement.mousePressed(() => {
    wordElement.remove();
  });

  // Increment the index to move to the next word
  currentWordIndex = (currentWordIndex + 1) % customWords.length;
}

let images = []; // Array to store images
let displayDuration = 3; // Duration in milliseconds for which images stay displayed
let glitchiness = 10; // Degree of glitchiness

function preload() {
  // Load your images here
  images.push(loadImage("image1.jpg"));
  images.push(loadImage("image2.jpg"));
  // Add more images as needed
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(glitchImages, 500); // Introduce glitches every 500 milliseconds
}

function draw() {
  background(0); // Dark background for glitch effect

  // Display images
  for (let i = 0; i < images.length; i++) {
    let x = random(width); // Randomize x position
    let y = random(height); // Randomize y position
    image(images[i], x, y);
  }
}

function glitchImages() {
  // Apply random transformations to images
  for (let i = 0; i < images.length; i++) {
    let img = images[i];
    let dx = random(-glitchiness, glitchiness); // Random horizontal displacement
    let dy = random(-glitchiness, glitchiness); // Random vertical displacement
    let dw = random(-glitchiness, glitchiness); // Random width distortion
    let dh = random(-glitchiness, glitchiness); // Random height distortion
    image(img, 0 + dx, 0 + dy, width + dw, height + dh); // Draw image with glitches
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

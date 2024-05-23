const sentences = [
  "I hope every laugh they share with them is followed by a fleeting sense of emptiness.",
  "May they occasionally glimpse my face in their thoughts, tainting their joy.",
  "I hope their moments of bliss are interrupted by sudden waves of sorrow.",
  "May their new love always feel a subtle undercurrent of unease.",
  "I wish their perfect days with them are haunted by whispers of what could have been.",
  "May their moments of bliss be interrupted by thoughts of the past.",
  "I hope their perfect life is always haunted by a quiet, persistent void.",
  "May their bright future always carry the shadow of what we had.",
  "May their dreams of them be disturbed by memories of us.",
  "May they sometimes hear my voice in their head.",
  "May they feel a persistent, unexplainable melancholy in their brightest, happiest moments.",
];

let currentChar = 0;
let currentSentenceIndex = 0;
let sentenceLength = 0;
let isBackgroundBlack = true;

function getNextSentence() {
  randomStartSentence = sentences[currentSentenceIndex];
  sentenceLength = randomStartSentence.length;
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
}

function type() {
  const typingElement = document.getElementById("typing");
  if (currentChar < sentenceLength) {
    typingElement.textContent += randomStartSentence.charAt(currentChar);
    currentChar++;
  } else {
    typingElement.textContent = "";
    currentChar = 0;
    getNextSentence();
    toggleBackground();
  }
  setTimeout(type, 70);
}

function toggleBackground() {
  const body = document.body;
  if (isBackgroundBlack) {
    body.style.backgroundColor = "#89fc00";
    body.style.color = "black";
  } else {
    body.style.backgroundColor = "black";
    body.style.color = "#89fc00";
  }
  isBackgroundBlack = !isBackgroundBlack;
}

window.onload = () => {
  // Select a random starting sentence index
  currentSentenceIndex = Math.floor(Math.random() * sentences.length);
  getNextSentence();

  // Initialize the background color
  document.body.style.backgroundColor = "#89fc00";
  document.body.style.color = "black";
  document.body.style.fontFamily = "'Courier New', Courier, monospace";
  isBackgroundBlack = false;

  type();
};

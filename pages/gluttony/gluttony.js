// Paste your JavaScript code here
let x = (y = 0);
const fontSize = 16;
const noiseScale = 0.0004;
const noiseStrength = 30; // Strength of noise effect
const foodEmojis = [
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍈",
  "🍒",
  "🍑",
  "🍍",
  "🥭",
  "🍅",
  "🍆",
  "🥑",
  "🥦",
  "🥒",
  "🥬",
  "🌶️",
  "🌽",
  "🥕",
  "🥔",
  "🍠",
  "🥐",
  "🍞",
  "🥖",
  "🥨",
  "🧀",
  "🥚",
  "🍳",
  "🥓",
  "🥩",
  "🍗",
  "🍖",
  "🦴",
  "🌭",
  "🍔",
  "🍟",
  "🍕",
  "🥪",
  "🥙",
  "🌮",
  "🌯",
  "🥗",
  "🥘",
  "🍲",
  "🥣",
  "🥫",
  "🍱",
  "🍛",
  "🍣",
  "🍤",
  "🍙",
  "🍚",
  "🍘",
  "🍥",
  "🥮",
  "🍢",
  "🍡",
  "🍧",
  "🍨",
  "🍦",
  "🥧",
  "🍰",
  "🎂",
  "🧁",
  "🍮",
  "🍭",
  "🍬",
  "🍫",
  "🍿",
  "🧂",
  "🍩",
  "🍪",
  "🌰",
  "🥜",
  "🍯",
  "🥛",
  "🍼",
  "☕",
  "🍵",
  "🍶",
  "🍾",
  "🍷",
  "🍸",
  "🍹",
  "🍺",
  "🍻",
  "🥂",
  "🥃",
  "🥤",
  "🧃",
  "🧉",
  "🧊",
];

// Play the chewing sound
function playChewingSound() {
  const audio = document.getElementById("chewing-audio");
  audio.play();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(fontSize);

  // Trigger audio playback when canvas is clicked
  canvas.addEventListener("click", playChewingSound);
}

function draw() {
  background(255);
  let t = frameCount * noiseScale;
  for (let i = 0; i < width; i += fontSize) {
    for (let j = 0; j < height; j += fontSize) {
      const n = noise((i + x) * noiseScale, (j + y) * noiseScale, t);
      const index = int(map(n, 0, 1, 0, foodEmojis.length));
      let chr = foodEmojis[index];
      // Introduce glitch effect
      if (random(1) < 0.05) {
        // Adjust probability for glitchiness
        chr = random(foodEmojis); // Replace with random emoji
      }
      push();
      // Apply random offset for glitchy movement
      translate(
        random(-noiseStrength, noiseStrength),
        random(-noiseStrength, noiseStrength)
      );
      text(chr, i, j);
      pop();
    }
  }
}

function mouseDragged() {
  x += pmouseX - mouseX;
  y += pmouseY - mouseY;
}
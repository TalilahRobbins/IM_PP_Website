// This code is based on a sketch by UnoLab that we discovered on Open Processing, available at https://openprocessing.org/sketch/2154535
// Assistance from ChatGPT enabled the refinement, customisation, and learning of this code

let x = (y = 0);
const fontSize = 16;
const noiseScale = 0.0004;
const noiseStrength = 30;
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

let cursorSize = 150;
let clearingRadius = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  textSize(fontSize);
}

function draw() {
  clear();

  let t = frameCount * noiseScale;
  for (let i = 0; i < width; i += fontSize) {
    for (let j = 0; j < height; j += fontSize) {
      let distanceToCursor = dist(i, j, mouseX, mouseY);
      if (distanceToCursor < clearingRadius) {
        continue;
      }
      const n = noise((i + x) * noiseScale, (j + y) * noiseScale, t);
      const index = int(map(n, 0, 1, 0, foodEmojis.length));
      let chr = foodEmojis[index];
      if (random(1) < 0.05) {
        chr = random(foodEmojis);
      }
      push();
      translate(
        random(-noiseStrength, noiseStrength),
        random(-noiseStrength, noiseStrength)
      );
      text(chr, i, j);
      pop();
    }
  }

  blendMode(REMOVE);
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, cursorSize, cursorSize);

  blendMode(BLEND);
}

function mouseMoved() {
  x += pmouseX - mouseX;
  y += pmouseY - mouseY;
}

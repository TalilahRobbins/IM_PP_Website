let x = (y = 0);
const fontSize = 16;
const noiseScale = 0.0004;
const foodEmojis = [
  "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🍅", "🍆", "🥑", "🥦", "🥒", "🥬",
  "🌶️", "🌽", "🥕", "🥔", "🍠", "🥐", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟",
  "🍕", "🥪", "🥙", "🌮", "🌯", "🥗", "🥘", "🍲", "🥣", "🥫", "🍱", "🍛", "🍣", "🍤", "🍙", "🍚", "🍘", "🍥", "🥮", "🍢",
  "🍡", "🍧", "🍨", "🍦", "🥧", "🍰", "🎂", "🧁", "🍮", "🍭", "🍬", "🍫", "🍿", "🧂", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛",
  "🍼", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧃", "🧉", "🧊"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(fontSize);
}

function draw() {
  background(255);
  let t = frameCount * noiseScale;
  for (let i = 0; i < width; i += fontSize) {
    for (let j = 0; j < height; j += fontSize) {
      const n = noise((i + x) * noiseScale, (j + y) * noiseScale, t);
      const index = int(map(n, 0, 1, 0, foodEmojis.length));
      const chr = foodEmojis[index];
      text(chr, i, j);
    }
  }
}

function mouseDragged() {
  x += pmouseX - mouseX;
  y += pmouseY - mouseY;
}

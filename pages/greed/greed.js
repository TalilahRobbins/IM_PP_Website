// This code was made possible by the efforts of Lauren McCarthy in creating the p5 library
// Assistance from ChatGPT enabled the creation and learning of this code

let glitchOffsetX = 0;
let glitchOffsetY = 0;
let angle = 0;

let scatteredTexts = [
  "more sex",
  "more bars",
  "more clubs",
  "new clothes",
  "new shoes",
  "new personality",
  "more money",
  "more power",
  "new friends",
  "more travel",
  "new car",
  "new house",
  "more holidays",
  "more parties",
  "more freedom",
  "more excitement",
  "more visibility",
  "new tech",
  "new hobbies",
  "new career",
  "new socials",
  "more experiences",
  "more adventures",
  "more love",
  "more beauty",
  "new lifestyle",
  "new goals",
  "more luxury",
  "new dreams",
  "new challenges",
];
let textObjects = [];
let padding = 5;
let speed = 0.0005;
let maxDelay = 5000;

let sound;
let clickCount = 0;

function preload() {
  sound = loadSound("drone.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("'Courier New', Courier, monospace");
  textAlign(CENTER, CENTER);
  textSize(12);
  initializeTextObjects();

  document.getElementById("popup").addEventListener("click", handlePopupClick);

  window.addEventListener("mousemove", handleMouseMove);
}

function draw() {
  background(0);

  glitchOffsetX = random(-2, 2);
  glitchOffsetY = random(-2, 2);

  fill(255, 127);
  noStroke();
  text(
    "The void persists,",
    width / 2 + glitchOffsetX,
    height / 2 - 10 + glitchOffsetY
  );
  text(
    "but I'll keep seeking to fill it",
    width / 2 + glitchOffsetX,
    height / 2 + 10 + glitchOffsetY
  );

  stroke(255, 255, 0);
  strokeWeight(0.6);
  noFill();
  let circleDiameter =
    textWidth("The void persists, but I'll keep seeking to fill it") + 50;
  let wave = sin(angle) * 15; // Increased wave amplitude
  ellipse(width / 2, height / 2, circleDiameter + wave, circleDiameter + wave);

  angle += 0.05;

  // Move scattered texts towards the center based on their individual start times
  textObjects.forEach((obj) => {
    if (millis() > obj.startTime) {
      let progress = (millis() - obj.startTime) * speed;
      obj.x = lerp(obj.initialX, obj.targetX, progress);
      obj.y = lerp(obj.initialY, obj.targetY, progress);

      if (progress >= 1) {
        resetTextObject(obj);
      }
    }
    fill(255, 255, 0);
    text(scatteredTexts[obj.index], obj.x, obj.y);
  });
}

function initializeTextObjects() {
  let circleDiameter =
    textWidth("The void persists, but I'll keep seeking to fill it") + 50;
  let radius = (circleDiameter + 15) / 2;

  for (let i = 0; i < scatteredTexts.length; i++) {
    let pos;
    let textW = textWidth(scatteredTexts[i]);
    let textH = textAscent() + textDescent();
    let distance;
    do {
      pos = {
        x: random(padding + textW / 2, width - padding - textW / 2),
        y: random(padding + textH / 2, height - padding - textH / 2),
      };
      distance = dist(pos.x, pos.y, width / 2, height / 2);
    } while (distance < radius + textW / 2 + padding);

    let startTime = millis() + random(0, maxDelay);
    textObjects.push({
      index: i,
      initialX: pos.x,
      initialY: pos.y,
      x: pos.x,
      y: pos.y,
      targetX: width / 2,
      targetY: height / 2,
      startTime: startTime,
    });
  }
}

function resetTextObject(obj) {
  let circleDiameter =
    textWidth("The void persists, but I'll keep seeking to fill it") + 50;
  let radius = (circleDiameter + 15) / 2;
  let textW = textWidth(scatteredTexts[obj.index]);
  let textH = textAscent() + textDescent();
  let pos;
  let distance;
  do {
    pos = {
      x: random(padding + textW / 2, width - padding - textW / 2),
      y: random(padding + textH / 2, height - padding - textH / 2),
    };
    distance = dist(pos.x, pos.y, width / 2, height / 2);
  } while (distance < radius + textW / 2 + padding);

  obj.initialX = pos.x;
  obj.initialY = pos.y;
  obj.x = pos.x;
  obj.y = pos.y;
  obj.startTime = millis() + random(0, maxDelay);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textObjects = [];
  initializeTextObjects();
}

function handlePopupClick() {
  clickCount++;

  if (clickCount === 1) {
    sound.loop(); // Start the sound on the first click
  }

  const customCursor = document.getElementById("custom-cursor");

  if (clickCount === 8) {
    customCursor.innerText = "keep clicking";
  } else if (clickCount === 18) {
    customCursor.innerText = "more clicking please";
  } else if (clickCount === 30) {
    customCursor.innerText = "how bad do you want it";
  } else if (clickCount === 45) {
    customCursor.innerText = "no seriously, how bad?";
  } else if (clickCount === 50) {
    customCursor.innerText = "keep clicking";
  } else if (clickCount === 65) {
    customCursor.innerText = "you're almost there";
  } else if (clickCount === 85) {
    document.getElementById("popup").style.display = "none";
    customCursor.innerText = ""; // Clear the custom cursor text
    document.body.style.cursor = "default"; // Reset cursor to default
  }
}

function handleMouseMove(event) {
  const cursor = document.getElementById("custom-cursor");
  cursor.style.left = `${event.pageX}px`;
  cursor.style.top = `${event.pageY}px`;
}

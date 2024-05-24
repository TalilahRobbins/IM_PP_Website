// This code is based on the sketch 'Pacman' by user ThingOnItsOwn, available at https://openprocessing.org/sketch/663582/
// Assistance from ChatGPT enabled the refinement, customisation, and learning of this code

let canvas;
let pacSpeed = 0.25;
let chompSpeed = 0.1;
let powerPelletEmojis = ["💅", "🍏", "🛀🏻", "🧘🏻"];
let messages = [
  "go for it",
  "you're amazing",
  "get out of the house",
  "have a shower",
  "embrace the day",
  "you are strong",
  "you are resilient",
  "you are valued",
  "you deserve happiness",
  "you deserve peace",
  "stay active",
  "stay hydrated",
  "don't disappear",
  "nourish your body",
  "eat something delicious",
  "watch something uplifting",
  "create something",
  "experience the world",
  "focus on yourself",
  "rest well",
  "hold on to what matters",
];

let audio;
let isPlaying = false;

function setup() {
  Z = 40;
  T = 15;
  pacx = 11 * Z;
  pacy = 16 * Z;
  pacmx = 0;
  pacmy = 0;
  pacd = 0;
  wacn = 0;
  score = 0;
  GT = [14, 16, 18, 20];
  ghostx = [9 * Z, 10 * Z, 11 * Z, 12 * Z];
  ghosty = [10 * Z, 10 * Z, 10 * Z, 10 * Z];
  ghostmx = [1, -1, 0, 0];
  ghostmy = [0, 0, 0, 0];
  ghoststate = [0, 0, 0, 0];
  powerpellet = 0;
  pacstate = 0;
  life = 0;

  levelstring = [
    "11111111111111111111111",
    "1          1          1",
    "1+111 1111 1 1111 111+1",
    "1 111 1111 1 1111 111 1",
    "1                     1",
    "1 111 1 1111111 1 111 1",
    "1     1    1    1     1",
    "11111 1111 1 1111 11111",
    "----1 1         1 1----",
    "11111 1 111-111 1 11111",
    "        1-----1        ",
    "11111 1 1111111 1 11111",
    "----1 1         1 1----",
    "11111 1 1111111 1 11111",
    "1         -1-         1",
    "1 111 1111-1-1111 111 1",
    "1+  1   -------   1  +1",
    "111 1 1 1111111 1 1 111",
    "1     1    1    1     1",
    "1 11111111 1 11111111 1",
    "1                     1",
    "11111111111111111111111",
  ];
  w = 23;
  h = 22;
  lvlw = w * Z;
  lvlh = h * Z;

  canvas = createCanvas(lvlw, lvlh);
  canvas.parent("canvas-container");

  aap = [];
  for (i = 0; i < w * h; i++)
    aap.push(getlevel((i % w) * Z, Z * floor(i / w)) == "1" ? -1 : 0);

  audio = document.getElementById("audio");
  let playButton = document.getElementById("play-button");
  playButton.addEventListener("click", togglePlayPause);
}

function togglePlayPause() {
  let playButton = document.getElementById("play-button");
  if (isPlaying) {
    audio.pause();
    playButton.style.backgroundColor = "#000";
    playButton.style.color = "#fff";
    playButton.textContent = "let it pour";
  } else {
    audio.play();
    playButton.style.backgroundColor = "#fff";
    playButton.style.color = "#000";
    playButton.textContent = "make it stop";
  }
  isPlaying = !isPlaying;
}

function getlevel(x, y) {
  var nstr = levelstring[floor(y / Z)];
  return nstr.charAt(floor(x / Z));
}

function setlevel(x, y, v) {
  var nstr = levelstring[floor(y / Z)];
  levelstring[floor(y / Z)] =
    nstr.substr(0, floor(x / Z)) + v + nstr.substr(floor(x / Z) + 1, 99);
}

function astar(x2, y2, x1, y1) {
  var aa = aap.slice(0);
  var q = [x1, y1];
  while (true) {
    var x = q.shift();
    var y = q.shift();
    if (aa[x + y * w] == 0) {
      if (abs(x - x2) + abs(y - y2) < 2) {
        return atan2(y - y2, x - x2);
      }
      aa[x + y * w] = 1;
      q.push(x - 1, y, x + 1, y, x, y - 1, x, y + 1);
    }
  }
}

function draw() {
  background(color("#000411"));
  for (y = 0; y < 22; y++) {
    nstr = levelstring[y];
    for (x = 0; x < 23; x++) {
      if (aap[x + y * w] == -1) {
        fill(color("#495057"));
        rect(x * Z, y * Z, Z, Z);
      } else if (nstr.charAt(x) == " ") {
        fill(color("#F7F7F7"));
        ellipse(x * Z + Z / 2, y * Z + Z / 2, Z / 4);
      } else if (nstr.charAt(x) == "+") {
        let emojiIndex = -1;
        if (x === 1 && y === 2) emojiIndex = 0;
        else if (x === 21 && y === 2) emojiIndex = 1;
        else if (x === 1 && y === 16) emojiIndex = 2;
        else if (x === 21 && y === 16) emojiIndex = 3;
        if (emojiIndex !== -1) {
          textSize(Z);
          textAlign(CENTER, CENTER);
          text(powerPelletEmojis[emojiIndex], x * Z + Z / 2, y * Z + Z / 2);
        }
      }
    }
  }

  if (pacstate == 0) {
    if ((pacx % Z < Z / T && pacy % Z < Z / T) || (pacmx == 0 && pacmy == 0)) {
      if (getlevel(pacx, pacy) == " ") score++;
      if (getlevel(pacx, pacy) == "+") powerpellet = 500;
      if (pacx >= 0) setlevel(pacx, pacy, "-");
      pacx = (pacx + lvlw) % lvlw;
      if (getlevel(pacx, pacy) == " ") score++;
      if (pacx >= 0) setlevel(pacx, pacy, "-");

      if (keyIsDown(LEFT_ARROW)) {
        pacmy = 0;
        pacmx = -Z / T;
        pacd = PI;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        pacmy = 0;
        pacmx = Z / T;
        pacd = 0;
      }
      if (keyIsDown(UP_ARROW)) {
        pacmy = -Z / T;
        pacmx = 0;
        pacd = PI / 2;
      }
      if (keyIsDown(DOWN_ARROW)) {
        pacmy = Z / T;
        pacmx = 0;
        pacd = (PI * 3) / 2;
      }

      x = pacx + pacmx * T;
      y = pacy + pacmy * T;
      if (getlevel(x, y) == "1") {
        pacmx = 0;
        pacmy = 0;
      }
    }

    pacx += pacmx * pacSpeed;
    pacy += pacmy * pacSpeed;
  }

  powerpellet--;

  for (i = 0; i < 4; i++) {
    if (ghoststate[i] == 1) {
      if (pacstate == 0) {
        it = 0;
        pmx = ghostmx[i];
        pmy = ghostmy[i];
        if (
          (ghostx[i] % Z < Z / GT[i] && ghosty[i] % Z < Z / GT[i]) ||
          (ghostmx[i] == 0 && ghostmy[i] == 0)
        ) {
          d = astar(floor(ghostx[i] / Z), floor(ghosty[i] / Z), 11, 10);
          ghostmx[i] = cos(d);
          ghostmy[i] = sin(d);
          if (dist(ghostx[i], ghosty[i], 11 * Z, 10 * Z) < 10) ghoststate[i]++;
        }
        ghostx[i] += (ghostmx[i] * Z) / GT[i];
        ghosty[i] += (ghostmy[i] * Z) / GT[i];
      }
    } else {
      noStroke();
      textSize(Z);
      text("🧟‍♀️", ghostx[i] + Z / 2, ghosty[i] + Z / 2);

      if (ghoststate[i] > 0) {
        ghoststate[i]++;
        if (ghoststate[i] > 200) ghoststate[i] = 0;
        while (
          (ghostx[i] % Z < Z / GT[i] &&
            ghosty[i] % Z < Z / GT[i] &&
            (it++ == 0 || random() < 0.25)) ||
          (ghostmx[i] == 0 && ghostmy[i] == 0)
        ) {
          ghostmx[i] = random() < 0.5 ? 1 : -1;
          ghostmy[i] = 0;
          x = ghostx[i] + ghostmx[i] * Z;
          y = ghosty[i] + ghostmy[i] * Z;
          if (getlevel(x, y) == "1") {
            ghostmx[i] = 0;
          }
        }
      } else if (pacstate == 0) {
        it = 0;
        pmx = ghostmx[i];
        pmy = ghostmy[i];
        while (
          (ghostx[i] % Z < Z / GT[i] &&
            ghosty[i] % Z < Z / GT[i] &&
            (it++ == 0 || random() < 0.25)) ||
          (ghostmx[i] == 0 && ghostmy[i] == 0)
        ) {
          ghostmx[i] = 0;
          ghostmy[i] = 0;
          ghostx[i] = (ghostx[i] + lvlw) % lvlw;
          if (random() < 0.4) {
            d = astar(
              floor(ghostx[i] / Z),
              floor(ghosty[i] / Z),
              min(w - 1, round(pacx / Z)),
              round(pacy / Z)
            );
            if (powerpellet > 0) d += PI;
            ghostmx[i] = cos(d);
            ghostmy[i] = sin(d);
          } else if (random() < 0.5) {
            ghostmx[i] = pmx;
            ghostmy[i] = pmy;
          } else if (random() < 0.5) {
            ghostmx[i] = random() < 0.5 ? 1 : -1;
          } else {
            ghostmy[i] = random() < 0.5 ? 1 : -1;
          }
          x = ghostx[i] + ghostmx[i] * Z;
          y = ghosty[i] + ghostmy[i] * Z;
          if (getlevel(x, y) == "1") {
            ghostmx[i] = 0;
            ghostmy[i] = 0;
          }
        }
        ghostx[i] += (ghostmx[i] * Z) / GT[i];
        ghosty[i] += (ghostmy[i] * Z) / GT[i];

        if (dist(ghostx[i], ghosty[i], pacx, pacy) < Z) {
          if (powerpellet > -10) {
            ghoststate[i] = 1;
          } else {
            pacstate = 1;
            pacmx = 0;
            pacmy = 0;
          }
        }
      }
    }
  }

  if (pacstate != 0) {
    fill(color("#495057"));
    noStroke();
    beginShape(TRIANGLE_FAN);
    vertex(pacx + Z / 2, pacy + Z / 2);
    for (
      d = PI / 2 + (pacstate * PI) / 100;
      d < (PI * 5) / 2 - (pacstate * PI) / 100;
      d += PI / 20
    ) {
      vertex(pacx + Z / 2 + (Z / 2) * cos(d), pacy + Z / 2 - (Z / 2) * sin(d));
    }
    endShape();

    if (pacstate++ > 100) {
      pacx = 11 * Z;
      pacy = 16 * Z;
      pacmx = 0;
      pacmy = 0;
      pacd = 0;
      wacn = 0;
      pacstate = 0;
      life--;
      ghostx = [9 * Z, 10 * Z, 11 * Z, 12 * Z];
      ghosty = [10 * Z, 10 * Z, 10 * Z, 10 * Z];
    }
  } else {
    if (pacmx != 0 || pacmy != 0) wacn += chompSpeed;
    else wacn = 3;
    wac = (abs((wacn % 10) - 5) * PI) / 12;

    fill(color("#ced4da"));
    noStroke();
    beginShape(TRIANGLE_FAN);
    vertex(pacx + Z / 2, pacy + Z / 2);
    for (d = pacd + wac; d < pacd - wac + PI * 2; d += PI / 12) {
      vertex(pacx + Z / 2 + (Z / 2) * cos(d), pacy + Z / 2 - (Z / 2) * sin(d));
    }
    endShape();
  }

  fill(color("white"));
  textSize(50);
  textAlign(CENTER, CENTER);
  let messageIndex = (score - 1) % messages.length;
  text(messages[messageIndex], width / 2, height / 2);
}

// This code is based on the sketch ____ by user ____, available at ________
// Assistance from ChatGPT enabled the refinement, customisation, and learning of this code

  var sketch1 = function (p) {
  var font;
  var music;
  var analyzer;
  var volume = 0;
  var isPlaying = false;

  var texts = [];

  p.preload = function () {
    font = p.loadFont("HelveticaNowDisplay.otf");
    music = p.loadSound("Adele.mp3", loaded);
  };

  function loaded() {
    console.log("Music loaded successfully");
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    var sentences = [
      "Fuck You",
      "You're the worst",
      "I hope you rot",
      "Hex on you",
      "Hell is a place on earth",
      "May you suffer",
      "Curse you forever",
      "No peace for you",
      "Eternal misery",
      "Endless pain",
    ];

    var size = 150;

    // Initialize the sound analyzer
    analyzer = new p5.Amplitude();

    sentences.forEach((sentence) => {
      var bounds = font.textBounds(sentence, 0, 0, size);
      var posX = p.random(bounds.w / 2, p.width - bounds.w / 2);
      var posY = p.random(bounds.h / 2, p.height - bounds.h / 2);
      var velX = p.random(2, 4) * (p.random() > 0.5 ? 1 : -1);
      var velY = p.random(2, 4) * (p.random() > 0.5 ? 1 : -1);

      var points = font.textToPoints(sentence, 0, 0, size, {
        sampleFactor: 0.25, // Increase sample factor for more points
        simplifyThreshold: 0,
      });

      texts.push({
        sentence: sentence,
        bounds: bounds,
        posX: posX,
        posY: posY,
        velX: velX,
        velY: velY,
        points: points,
      });
    });

    p.noStroke();

    p.mousePressed = function () {
      if (!isPlaying) {
        music.play();
        analyzer.setInput(music);
        isPlaying = true;
        console.log("Music playing");
      }
    };
  };

  p.draw = function () {
    p.background(0);
    p.fill("#ff0000");

    volume = analyzer.getLevel();
    console.log("Volume level: ", volume);

    var size = p.map(volume, 0, 0.2, 150, 200);

    texts.forEach((textObj) => {
      var { sentence, bounds, posX, posY, velX, velY, points } = textObj;

      bounds = font.textBounds(sentence, 0, 0, size);

      var jiggle = p.map(volume, 0, 0.2, 1, 20);

      var scaleFactor =
        p.min(p.width / bounds.w, p.height / bounds.h) * (2 / 3);

      posX += velX;
      posY += velY;

      if (posX - (bounds.w * scaleFactor) / 2 < 0) {
        posX = (bounds.w * scaleFactor) / 2;
        velX *= -1;
      } else if (posX + (bounds.w * scaleFactor) / 2 > p.width) {
        posX = p.width - (bounds.w * scaleFactor) / 2;
        velX *= -1;
      }
      if (posY - (bounds.h * scaleFactor) / 2 < 0) {
        posY = (bounds.h * scaleFactor) / 2;
        velY *= -1;
      } else if (posY + (bounds.h * scaleFactor) / 2 > p.height) {
        posY = p.height - (bounds.h * scaleFactor) / 2;
        velY *= -1;
      }

      p.push();
      p.translate(posX, posY);
      p.scale(scaleFactor);
      p.translate(-bounds.w / 2, bounds.h / 2);

      p.strokeWeight(0.4);

      for (var i = 0; i < points.length; i++) {
        var pnt = points[i];
        p.stroke("#ff0000");
        p.line(
          pnt.x + jiggle * p.randomGaussian(),
          pnt.y + jiggle * p.randomGaussian(),
          pnt.x,
          pnt.y
        );
      }
      p.pop();

      textObj.bounds = bounds;
      textObj.posX = posX;
      textObj.posY = posY;
      textObj.velX = velX;
      textObj.velY = velY;
    });
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch1);

document.addEventListener("DOMContentLoaded", function () {
  var closeBtn = document.getElementById("close-btn");
  var popupBox = document.getElementById("popup-box");

  popupBox.style.display = "block";

  closeBtn.addEventListener("click", function () {
    popupBox.style.display = "none";
  });
});

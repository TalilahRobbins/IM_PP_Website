var sketch1 = function (p) {
  var font;
  var mic;
  var volume = 0;

  var texts = [];

  p.preload = function () {
    font = p.loadFont("HelveticaNowDisplay.otf");
  };

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

    var size = 150; // Initial text size

    // Initialize microphone input
    mic = new p5.AudioIn();
    mic.start();
    console.log("Microphone started");

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
  };

  p.draw = function () {
    p.background(0); // Black background
    p.fill("#ff0000"); // Red text color

    // Get the volume from the microphone
    volume = mic.getLevel();
    console.log("Volume level: ", volume);

    // Map volume to text size and make it more sensitive to low sound
    var size = p.map(volume, 0, 0.2, 100, 300); // Adjust the upper limit as needed

    texts.forEach((textObj) => {
      var { sentence, bounds, posX, posY, velX, velY, points } = textObj;

      // Update bounds based on new size
      bounds = font.textBounds(sentence, 0, 0, size);

      // Map volume to jiggle and make it more sensitive to low sound
      var jiggle = p.map(volume, 0, 0.2, 1, 100); // Reduce the upper limit for less jiggle

      var scaleFactor =
        p.min(p.width / bounds.w, p.height / bounds.h) * (2 / 3); // Reduce the size by 1/3

      // Update position
      posX += velX;
      posY += velY;

      // Check for bouncing off edges
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

      p.strokeWeight(.4); // Increase stroke weight

      for (var i = 0; i < points.length; i++) {
        var pnt = points[i];
        p.stroke("#ff0000"); // Change stroke color to red
        p.line(
          pnt.x + jiggle * p.randomGaussian(),
          pnt.y + jiggle * p.randomGaussian(),
          pnt.x,
          pnt.y
        );
      }
      p.pop();

      // Update the text object
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

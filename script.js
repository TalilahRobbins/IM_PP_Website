function playHornSound() {
  var hornSound = document.getElementById("hornSound");
  hornSound.play(); // Play the horn sound
}

document.addEventListener("DOMContentLoaded", function () {
  var popups = document.querySelectorAll(".popup");

  // Function to close the popup and generate a new one
  function closePopup(popup) {
    popup.style.display = "none";
    generateNewPopup();
  }

  // Function to generate a new popup
  function generateNewPopup() {
    var newPopup = document.createElement("div");
    newPopup.classList.add("popup");
    newPopup.innerHTML = `
               <span class="close">&times;</span>
               <p>Seriously, girl.</p>
           `;

    // Close the new popup when the close button is clicked
    var newCloseButton = newPopup.querySelector(".close");
    newCloseButton.addEventListener("click", function () {
      newPopup.style.display = "none";
    });

    // Set a random position for the new popup
    newPopup.style.left = getRandomPosition();
    newPopup.style.top = getRandomPosition();

    // Append the new popup to the document body and display it
    document.body.appendChild(newPopup);
    newPopup.style.display = "block";
  }

  // Close the popup when the close button is clicked
  popups.forEach(function (popup) {
    var closeButton = popup.querySelector(".close");

    closeButton.addEventListener("click", function () {
      closePopup(popup);
    });
  });

  // Show the initial popup
  popups[0].style.display = "block";

  // Randomly choose the initial direction for the first popup
  var initialDirection = Math.random() < 0.5 ? -1 : 1;
  var posX = 50 + initialDirection * 10; // Initial position
  var direction = initialDirection; // Initial direction

  // Bounce effect - Move the first popup back and forth horizontally
  var interval = setInterval(function () {
    popups[0].style.left = posX + "%";
    posX += direction;
    if (posX >= 60 || posX <= 40) {
      // Change direction at these thresholds
      direction *= -1;
    }
  }, 50);

  // Function to get a random position
  function getRandomPosition() {
    var min = 10; // Minimum position (10% from the top/left)
    var max = 70; // Maximum position (70% from the top/left)
    return Math.floor(Math.random() * (max - min + 1) + min) + "%";
  }
});
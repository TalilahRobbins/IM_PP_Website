var jumbleInterval;

function startJumble(element) {
  jumbleInterval = setInterval(function() {
    const text = element.textContent;
    const jumbledText = shuffleString(text);
    element.textContent = jumbledText;
  }, 100);
}

function stopJumble(element) {
  clearInterval(jumbleInterval);
}

document.querySelectorAll('.link').forEach(function(link) {
  link.addEventListener('mouseover', function() {
    startJumble(this);
    jumbleText(this);
  });
  
  link.addEventListener('mouseout', function() {
    stopJumble(this);
    revertText(this);
  });
});

function playHornSound() {
    var hornSound = document.getElementById("hornSound");
    hornSound.play();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var popups = document.querySelectorAll(".popup");
  
    function closePopup(popup) {
      popup.style.display = "none";
      generateNewPopupFlag = true;
    }
  
    function generateNewPopup() {
      var newPopup = document.createElement("div");
      newPopup.classList.add("popup");
      newPopup.innerHTML = `
        <span class="close">&times;</span>
        <p>Seriously, girl.</p>
      `;
  
      var newCloseButton = newPopup.querySelector(".close");
      newCloseButton.addEventListener("click", function () {
        closePopup(newPopup);
      });
  
      newPopup.style.left = getRandomPosition();
      newPopup.style.top = getRandomPosition();
  
      document.body.appendChild(newPopup);
      newPopup.style.display = "block";
    }
  
    popups.forEach(function (popup) {
      var closeButton = popup.querySelector(".close");
  
      closeButton.addEventListener("click", function () {
        closePopup(popup);
        generateNewPopup();
      });
    });
  
    popups[0].style.display = "block";
  
    var initialDirection = Math.random() < 0.5 ? -1 : 1;
    var posX = 50 + initialDirection * 10;
    var direction = initialDirection;
  
    var interval = setInterval(function () {
      popups[0].style.left = posX + "%";
      posX += direction;
      if (posX >= 60 || posX <= 40) {
        direction *= -1;
      }
    }, 50);
  
    function getRandomPosition() {
      var min = 10;
      var max = 70;
      return Math.floor(Math.random() * (max - min + 1) + min) + "%";
    }
  });

function jumbleText(element) {
  const text = element.textContent;
  const jumbledText = shuffleString(text);
  element.textContent = jumbledText;
  element.dataset.originalText = text;
}

function revertText(element) {
  const originalText = element.dataset.originalText;
  if (originalText) {
    element.textContent = originalText;
  }
}

function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

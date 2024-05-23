const sentences = [
    "We had a break after that last one, which was good for us. We were still working though. We went away and did the music for a play at the National Theatre. The piece was Medea, which is a Greek tragedy and very traditional, but was updated for this production. Carrie Cracknell was the director. We spent about a year doing that—working with a chorus of 13 women vocalists—which was great. It was wonderful to be doing something completely different and helps shake up the way you think about things when you go back to doing your own work.",
  ];
  
  let currentSentence = 0;
  let currentChar = 0;
  
  function type() {
    if (currentChar < sentences[currentSentence].length) {
      document.getElementById("typing").innerText +=
        sentences[currentSentence].charAt(currentChar);
      currentChar++;
      setTimeout(type, 70); // Adjust the speed here
    } else {
      currentChar = 0;
      currentSentence++;
      if (currentSentence < sentences.length) {
        document.getElementById("typing").innerText += " "; // No pause between sentences
        type();
      } else {
        // Reset for loop
        setTimeout(() => {
          document.getElementById("typing").innerText = "";
          currentSentence = 0;
          type();
        }, 0); // No pause before restarting the loop
      }
    }
  }
  
  window.onload = type;
  
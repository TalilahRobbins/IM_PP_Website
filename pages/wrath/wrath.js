  const paragraphs = document.querySelectorAll('.text');

  // Initialize microphone access
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      // Create audio context
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      // Connect microphone to analyser
      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      // Threshold to apply the scaling and shaking effects
      const threshold = 50;

      // Get audio input data and determine intensity of sound
      javascriptNode.onaudioprocess = function() {
        const array = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(array);
        let maxAmplitude = Math.max(...array);

        // Adjust CSS styles based on sound intensity
        paragraphs.forEach(function(paragraph) {
          if (maxAmplitude > threshold) {
            const shakeIntensity = (maxAmplitude - threshold) / (128 - threshold) * 100; // Adjust multiplier as needed
            const scalingFactor = 1 + (shakeIntensity / 200); // Scale factor based on sound intensity
            const rotation = Math.random() * shakeIntensity - (shakeIntensity / 2);
            paragraph.style.transform = `rotate(${rotation}deg) scale(${scalingFactor})`;
          } else {
            // Reset to original size and position when sound intensity is below the threshold
            paragraph.style.transform = 'scale(1) rotate(0deg)';
          }
        });
      };
    })
    .catch(function(err) {
      console.error('Error accessing microphone:', err);
    });

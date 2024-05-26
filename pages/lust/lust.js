    const words = document.querySelectorAll('.word');

    async function monitorVolume() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const audioContext = new AudioContext();

            const analyser = audioContext.createAnalyser();

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;

            const microphone = audioContext.createMediaStreamSource(stream);

            microphone.connect(analyser);

            function checkVolume() {
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);

                const maxVolume = Math.max(...dataArray);

                const volume = maxVolume / 255;

                const tremblingIntensity = volume * 50;
                words.forEach(word => {
                    const randomX = tremblingIntensity * (Math.random() * 2 - 1);
                    const randomY = tremblingIntensity * (Math.random() * 2 - 1);
                    word.style.transform = `translate(${randomX}px, ${randomY}px)`;
                });
            }

            setInterval(checkVolume, 100);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    }
    monitorVolume();

import * as main from './main';

interface AudioFile {
  fileName: string;
  trackName: string;
  src?: string;
}

interface SpriteData {
  x: number;
  y: number;
  innerColorR: number;
  innerColorG: number;
  innerColorB: number;
  outerColorR: number;
  outerColorG: number;
  outerColorB: number;
}

interface AppData {
  audioFiles: AudioFile[];
  spriteData1: SpriteData;
  spriteData2: SpriteData;
}

// Wait for DOM to load before starting
window.onload = () => {
  console.log("window.onload called");

  // Fetch JSON config data
  fetch('data/av-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load JSON data');
      }
      return response.json();
    })
    .then((appData: AppData) => {
      console.log("JSON data loaded:", appData);

      // Preload audio files
      const audioFiles: AudioFile[] = appData.audioFiles.map(audio => {
        const audioElement = new Audio(`media/${audio.fileName}`);
        audioElement.preload = 'auto';
        return {
          ...audio,
          src: audioElement.src
        };
      });

      const spriteData1 = appData.spriteData1;
      const spriteData2 = appData.spriteData2;

      console.log("Preloading completed:", audioFiles);
      console.log("Sprite data loaded:", spriteData1, spriteData2);

      // Populate track dropdown
      const trackSelect = document.querySelector("#trackSelect") as HTMLSelectElement;
      appData.audioFiles.forEach(audio => {
        const option = document.createElement('option');
        option.value = `media/${audio.fileName}`;
        option.textContent = audio.trackName;
        if (audio.fileName === "perfect-fart.mp3") {
          option.selected = true;
        }
        trackSelect.appendChild(option);
      });

      // Start main app
      main.init(audioFiles, spriteData1, spriteData2);
    })
    .catch(error => {
      console.error("Error loading JSON data:", error);
    });
};
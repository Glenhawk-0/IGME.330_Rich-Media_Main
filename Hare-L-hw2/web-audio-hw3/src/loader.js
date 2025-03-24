import * as main from "./main.js";
window.onload = () => {
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	fetch('data/av-data.json')  
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to load JSON data');
			}
			return response.json();
		})
		.then(appData => {
			console.log("JSON data loaded:", appData);

			// Preload audio files
			const audioFiles = appData.audioFiles.map(audio => {
				const audioElement = new Audio(`media/${audio.fileName}`);
				audioElement.preload = 'auto'; // Preload the audio file
				//console.log(audioElement.srca)
				return {
					...audio,
					src: audioElement.src
				  };
			});

			//debugger

			const spriteData1 = appData.spriteData1;
			const spriteData2 = appData.spriteData2;

			console.log("Preloading completed:", audioFiles);
			console.log("Sprite data loaded:", spriteData1, spriteData2);


			// Populate track selection dropdown
			const trackSelect = document.querySelector("#trackSelect");;
			appData.audioFiles.forEach((audio, index) => {
			  const option = document.createElement('option');
			  option.value = "media/" + (audio.fileName);
			  option.textContent = audio.trackName;
			  if (audio.fileName === "perfect-fart.mp3" ) option.selected = true;  
			  trackSelect.appendChild(option);
			});


			// 2 - Start up the app after preloading
			main.init(audioFiles, spriteData1, spriteData2);
		})
		.catch(error => {
			console.error("Error loading JSON data:", error);
		});/**/
}
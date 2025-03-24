import * as audio from './audio.js';
import * as canvas from './canvas.js';

/*
const getDog = () => {
    return fetch = ('https://dog.ceo/api/breeds/image/random') 
        .then(response => {
            return response.text();
        })
        
        .then(result => {
            const data = JSON.parse(result);
    
            document.querySelector('img').src = data.message;
    
        })
    
    };*/

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false,
    showFrequency: true,
    showWave: false

}

let spriteParams1;
let spriteParams2;

/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';

// 1 - here we are faking an enumeration

/*const DEFAULTS = Object.freeze({
    sound1  :  "media/New Adventure Theme.mp3"
});/**/

const DEFAULTS = Object.freeze({
    sound1: "media/Neon Cheese irritation.mp3"
});/**/

function init(audioFiles ,spriteData1 , spriteData2) {

    spriteParams1 = spriteData1;
    spriteParams2 = spriteData2;


    //debugger
    audio.setupWebaudio(DEFAULTS.sound1);

    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);

    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#btn-fs");


    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    }
 
    //B - hookup play/pause button
    const playButton = document.querySelector("#btn-play")
    // add .onclick event to button
    playButton.onclick = e => {
        //console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }

        //console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (e.target.dataset.playing == "no") {
            //if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; //our CSS will set the text to "Pause"
            // if tracki IS playing, pause it
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; //our CSS will set the text to "Play"
        }

    };


        //C - hookup volume slider & label 
        let volumeSlider = document.querySelector("#slider-volume");
        let volumeLabel = document.querySelector("#volumeLabel");

        // add .oninput event to slider 
        volumeSlider.oninput = e => {
            // set the gain
            audio.setVolume(e.target.value);
            // update value of label to match value of slider
            volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
        };

        // set value of label to match initial value of slider
        volumeSlider.dispatchEvent(new Event("input"));


        //HW2 - hookup treble slider & label 
        let trebleSlider = document.querySelector("#slider-treble");
        let trebleLabel = document.querySelector("#trebleLabel");

        // add .oninput event to slider 
        trebleSlider.oninput = e => {
            // set the gain
            audio.setTrebleVolume(e.target.value);
            // update value of label to match value of slider
            trebleLabel.innerHTML = Math.round((e.target.value / 2 * 100));
        };

        // set value of label to match initial value of slider
        trebleSlider.dispatchEvent(new Event("input"));

        //HW2 - Bass treble slider & label 
        let bassSlider = document.querySelector("#slider-bass");
        let bassLabel = document.querySelector("#bassLabel");

        // add .oninput event to slider 
        bassSlider.oninput = e => {
            // set the gain
            audio.setBassVolume(e.target.value);
            // update value of label to match value of slider
            bassLabel.innerHTML = Math.round((e.target.value / 2 * 100));
        };

        // set value of label to match initial value of slider
        bassSlider.dispatchEvent(new Event("input"));



        //D - hookup track <select>
        let trackSelect = document.querySelector("#trackSelect");

        // no need to make initail choice work, their is a place holder that inentivises the user to c

        // add .onchange event to <select> 
        trackSelect.onchange = e => {
            
            audio.loadSoundFile(e.target.value);
            console.log(e.target.value)
            // pause the current track if it is playing 
            if (playButton.dataset.playing == "yes") {
                playButton.dispatchEvent(new MouseEvent("click"));
            }
        };


        //HW2 - hookup Type <select>
        let typeSelect = document.querySelector("#typeSelect");
        // add .onchange event to <select> 
        typeSelect.onclick = e => {
            if (typeSelect.selectedIndex == 0) {
                drawParams.showFrequency = true;
                drawParams.showWave = false;
            } else if (typeSelect.selectedIndex == 1) {
                drawParams.showFrequency = false;
                drawParams.showWave = true;
            }
        };

    //}; ///this

    // B.B ? hook up checkBoxes


    const gradientButton = document.querySelector("#cb-gradient") //B.B.1
    gradientButton.checked = true;
    const barsButton = document.querySelector("#cb-bars") //B.B.2
    barsButton.checked = true;
    const circlesButton = document.querySelector("#cb-circles") //B.B.3
    circlesButton.checked = true;
    const noiseButton = document.querySelector("#cb-noise") //B.B.4
    noiseButton.checked = false;
    const invertButton = document.querySelector("#cb-invert") //B.C.5
    invertButton.checked = false;

    const embossButton = document.querySelector("#cb-emboss") //B.C.6
    invertButton.checked = false;

    gradientButton.addEventListener('change', function () {
        if (this.checked == true) {
            // Code to run when checkbox is checked
            drawParams.showGradient = true;
            console.log('Gradient is On');
        } else {
            // Code to run when checkbox is unchecked
            drawParams.showGradient = false;
            console.log('Gradient is Off');
        }
    });

    barsButton.addEventListener('change', function () {
        if (this.checked == true) {
            // Code to run when checkbox is checked
            drawParams.showBars = true;
            console.log('bars is On');
        } else {
            // Code to run when checkbox is unchecked
            drawParams.showBars = false;
            console.log('bars is Off');
        }
    });

    circlesButton.addEventListener('change', function () {
        if (this.checked == true) {
            // Code to run when checkbox is checked
            drawParams.showCircles = true;
            console.log('circles is On');
        } else {
            // Code to run when checkbox is unchecked
            drawParams.showCircles = false;
            console.log('circles is Off');
        }
    });

    noiseButton.addEventListener('change', function () {
        if (this.checked == true) {
            // Code to run when checkbox is checked
            drawParams.showNoise = true;
            console.log('Noise is On');
        } else {
            // Code to run when checkbox is unchecked
            drawParams.showNoise = false;
            console.log('Noise is Off');
        }
    });

    invertButton.addEventListener('change', function () {
        if (this.checked == true) {
            // Code to run when checkbox is checked
            drawParams.showInvert = true;
            console.log('Invert is On');
        } else {
            // Code to run when checkbox is unchecked
            drawParams.showInvert = false;
            console.log('Invert is Off');
        }
    });

    embossButton.addEventListener('change', function () {
        if (this.checked == true) {
            // Code to run when checkbox is checked
            drawParams.showEmboss = true;
            console.log('Emboss is On');
        } else {
            // Code to run when checkbox is unchecked
            drawParams.showEmboss = false;
            console.log('Emboss is Off');
        }
    });







    //add Event handlers to checkboxes

} // end setupUI


function loop() {

    // Set the wanted frame rate (60 fps)
    const frameRate = 60;
    const interval = 1000 / frameRate; 
   
    
    setTimeout(() => {
        canvas.draw(drawParams,spriteParams1 ,spriteParams2);
        loop(); 
    }, interval);

}


export { init };
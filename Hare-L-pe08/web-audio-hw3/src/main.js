import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
    showGradient : true,
    showBars : true,
    showCircles : true,
    showNoise : true
}


/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

function init(){
   //debugger
    audio.setupWebaudio(DEFAULTS.sound1);
    
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
    
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
  
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  }

  //B - hookup play/pause button
  const playButton = document.querySelector("#playButton")
    // add .onclick event to button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended"){
            audio.audioCtx.resume();
        }

        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if(e.target.dataset.playing == "no"){
            //if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; //our CSS will set the text to "Pause"
            // if tracki IS playing, pause it
        }else{
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; //our CSS will set the text to "Play"
        }


        //C - hookup volume slider & label 
        let voulumeSlider = document.querySelector("#volumeSlider");
        let volumeLabel = document.querySelector("#volumeLabel");

        // add .oninput event to slider 
        volumeSlider.oninput = e => {
            // set the gain
            audio.setVolume(e.target.value);
            // update value of label to match value of slider
            volumeLabel.innerHTML = Math.round((e.target.value/2 * 100)); 
        };

        // set value of label to match initial value of slider
        volumeSlider.dispatchEvent(new Event("input"));


        //D - hookup track <select>
        let trackSelect = document.querySelector("#trackSelect");
        // add .onchange event to <select> 
        trackSelect.onchange = e => {
            audio.loadSoundFile(e.target.value);
            // pause the current track if it is playing 
            if(playButton.dataset.playing == "yes"){
                playButton.dispatchEvent(new MouseEvent("click"));
            }
        };
    
  };

  // B.B ? hook up checkBoxes

  
  const gradientButton = document.querySelector("#gradientCB") //B.B.1
  gradientButton.checked = true;
  const barsButton = document.querySelector("#barsCB") //B.B.2
  barsButton.checked = true;
  const circlesButton = document.querySelector("#circlesCB") //B.B.3
  circlesButton.checked = true;
  const noiseButton = document.querySelector("#noiseCB") //B.B.4
  noiseButton.checked = true;

  gradientButton.addEventListener ('change', function() {
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

  barsButton.addEventListener ('change', function() {
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

  circlesButton.addEventListener ('change', function() {
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

  noiseButton.addEventListener ('change', function() {
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


  


  //add Event handlers to checkboxes
	
} // end setupUI


function loop(){
    /* NOTE: This is temporary testing code that we will delete in Part II */
        requestAnimationFrame(loop);

        canvas.draw(drawParams);

    }


export {init};
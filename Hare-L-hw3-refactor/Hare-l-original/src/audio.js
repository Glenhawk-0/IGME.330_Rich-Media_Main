// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx;



// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element, sourceNode, analyserNode, gainNode;

//HW2| Add 2 Audio Effect nodes to the audio routing graph:
let bassNode, trebleNode;

// 3 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    gain : .5,
    numSamples : 256
});

// 4 - create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData = new Uint8Array(DEFAULTS.numSamples/2);

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
function setupWebaudio(filePath){
// 1 - The || is because WebAudio has not been standardized across browsers yet
const AudioContext = window.AudioContext || window.webkitAudioContext;
audioCtx = new AudioContext();


// HW2  BIQUAD DECLARATION
// https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
/*
let biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = "highshelf";
biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime)*/






// 2 - this creates an <audio> element
element = new Audio(); //document.querySelector("audio");

// 3 - have it point at a sound file
loadSoundFile(filePath);

// 4 - create an a source node that points at the <audio> element
sourceNode = audioCtx.createMediaElementSource(element);

// 5 - create an analyser node
analyserNode = audioCtx.createAnalyser(element); // note the UK spelling of "Analyser"

/*
// 6
We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
across the sound spectrum.

If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
the amplitude of that frequency.
*/ 

// fft stands for Fast Fourier Transform
analyserNode.fftSize = DEFAULTS.numSamples;


// PE8 - GAIN
// 7 - create a gain (volume) node
gainNode = audioCtx.createGain();
gainNode.gain.value = DEFAULTS.gain;

// 8 - connect the nodes - we now have an audio graph
sourceNode.connect(analyserNode);
analyserNode.connect(gainNode);
gainNode.connect(audioCtx.destination);


//HW2 - BASS
// create a Bass  node

bassNode = audioCtx.createBiquadFilter();
bassNode.type = "lowshelf";  // Low shelf filter for bass
//bassNode.frequency.setValueAtTime(2000, audioCtx.currentTime); 
bassNode.gain.value = DEFAULTS.gain;

// connect the nodes - we now have an audio graph
sourceNode.connect(analyserNode);
analyserNode.connect(bassNode);
bassNode.connect(audioCtx.destination); 



//HW2 - TREBLE
// create a Treble node
trebleNode = audioCtx.createBiquadFilter();
trebleNode.type = "highshelf";  // High shelf filter for treble
//trebleNode.frequency.setValueAtTime(5000, audioCtx.currentTime); // Frequency for treble adjustment
trebleNode.gain.value = DEFAULTS.gain;

// connect the nodes - we now have an audio graph
sourceNode.connect(analyserNode);
analyserNode.connect(trebleNode);
trebleNode.connect(audioCtx.destination);

}

function loadSoundFile(filePath){
    element.src = filePath;
}

function playCurrentSound(){
    element.play();
}

function pauseCurrentSound(){
    element.pause();
}

function setVolume(value){
    value = Number(value);// make sure that it's a Number rather than a String
    gainNode.gain.value = value;
}

function setBassVolume(value){
    value = Number(value );// make sure that it's a Number rather than a String
    bassNode.gain.value = (value * 10) ;
  
}

function setTrebleVolume(value){
    value = Number(value);// make sure that it's a Number rather than a String
    trebleNode.gain.value = (value*10);
    //trebleNode.frequency.value = (value);

}

export {audioCtx,setupWebaudio,playCurrentSound,pauseCurrentSound,loadSoundFile,setVolume, analyserNode , setBassVolume, setTrebleVolume};

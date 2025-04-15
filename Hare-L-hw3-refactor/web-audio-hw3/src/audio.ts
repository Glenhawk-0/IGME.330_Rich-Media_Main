// Web Audio context and audio nodes
let audioCtx: AudioContext;

let element: HTMLAudioElement;
let sourceNode: MediaElementAudioSourceNode;
let analyserNode: AnalyserNode;
let gainNode: GainNode;
let bassNode: BiquadFilterNode;
let trebleNode: BiquadFilterNode;

const DEFAULTS = Object.freeze({
  gain: 0.5,
  numSamples: 256
});

let audioData: Uint8Array = new Uint8Array(DEFAULTS.numSamples / 2);

// Set up the WebAudio graph
function setupWebaudio(filePath: string): void {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AudioContextClass();

  // Create audio element and load file
  element = new Audio();
  loadSoundFile(filePath);

  // WebAudio routing
  sourceNode = audioCtx.createMediaElementSource(element);
  analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = DEFAULTS.numSamples;

  gainNode = audioCtx.createGain();
  gainNode.gain.value = DEFAULTS.gain;

  bassNode = audioCtx.createBiquadFilter();
  bassNode.type = "lowshelf";
  bassNode.gain.value = DEFAULTS.gain;

  trebleNode = audioCtx.createBiquadFilter();
  trebleNode.type = "highshelf";
  trebleNode.gain.value = DEFAULTS.gain;

  // Connect nodes
  sourceNode.connect(analyserNode);
  analyserNode.connect(bassNode);
  bassNode.connect(trebleNode);
  trebleNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
}

// Load a new sound file into the <audio> element
function loadSoundFile(filePath: string): void {
  element.src = filePath;
}

// Control playback
function playCurrentSound(): void {
  element.play();
}

function pauseCurrentSound(): void {
  element.pause();
}

// Volume & filter controls
function setVolume(value: string | number): void {
  gainNode.gain.value = Number(value);
}

function setBassVolume(value: string | number): void {
  bassNode.gain.value = Number(value) * 10;
}

function setTrebleVolume(value: string | number): void {
  trebleNode.gain.value = Number(value) * 10;
}

export {
  audioCtx,
  setupWebaudio,
  playCurrentSound,
  pauseCurrentSound,
  loadSoundFile,
  setVolume,
  setBassVolume,
  setTrebleVolume,
  analyserNode
};
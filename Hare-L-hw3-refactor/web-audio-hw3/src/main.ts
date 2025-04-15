import * as audio from './audio';
import * as canvas from './canvas';
import * as utils from './utils';

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

const drawParams = {
  showGradient: true,
  showBars: true,
  showCircles: true,
  showNoise: false,
  showInvert: false,
  showEmboss: false,
  showFrequency: true,
  showWave: false
};

class Sprite {
  x: number;
  y: number;
  innerColorR: number;
  innerColorG: number;
  innerColorB: number;
  outerColorR: number;
  outerColorG: number;
  outerColorB: number;
  audioData!: Uint8Array;

  constructor(
    x: number, y: number,
    innerColorR: number, innerColorG: number, innerColorB: number,
    outerColorR: number, outerColorG: number, outerColorB: number
  ) {
    this.x = x;
    this.y = y;
    this.innerColorR = innerColorR;
    this.innerColorG = innerColorG;
    this.innerColorB = innerColorB;
    this.outerColorR = outerColorR;
    this.outerColorG = outerColorG;
    this.outerColorB = outerColorB;
  }

  update(audioData: Uint8Array): void {
    this.audioData = audioData;
  }

  draw(ctx: CanvasRenderingContext2D, canvasHeight: number, audioData: Uint8Array): void {
    const maxRadius = canvasHeight / 2;
    ctx.save();
    ctx.globalAlpha = 0.5;

    for (let i = 0; i < this.audioData.length; i++) {
      const percent = this.audioData[i] / 255;
      const circleRadius = percent * maxRadius;

      ctx.beginPath();
      ctx.fillStyle = utils.makeColor(this.innerColorR, this.innerColorG, this.innerColorB, 0.34 - percent / 3.0);
      ctx.arc(this.x, this.y, circleRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = utils.makeColor(this.outerColorR, this.outerColorG, this.outerColorB, 0.34 - percent / 3.0);
      ctx.arc(this.x, this.y, circleRadius * 1.5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = utils.makeColor(255, 255, 0, 0.5 - percent / 5.0);
      ctx.arc(this.x, this.y, circleRadius * 0.5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore();
  }
}

let spriteParams1: Sprite;
let spriteParams2: Sprite;

const DEFAULTS = Object.freeze({
sound1: "media/Neon-Cheese-Irritation.mp3"
});

function init(audioFiles: AudioFile[], spriteData1: SpriteData, spriteData2: SpriteData): void {
  spriteParams1 = new Sprite(
    spriteData1.x, spriteData1.y,
    spriteData1.innerColorR, spriteData1.innerColorG, spriteData1.innerColorB,
    spriteData1.outerColorR, spriteData1.outerColorG, spriteData1.outerColorB
  );

  spriteParams2 = new Sprite(
    spriteData2.x, spriteData2.y,
    spriteData2.innerColorR, spriteData2.innerColorG, spriteData2.innerColorB,
    spriteData2.outerColorR, spriteData2.outerColorG, spriteData2.outerColorB
  );

  audio.setupWebaudio(DEFAULTS.sound1);

  const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);
  loop();
}

function setupUI(canvasElement: HTMLCanvasElement): void {
  const fsButton = document.querySelector("#btn-fs") as HTMLButtonElement;
  fsButton.onclick = () => utils.goFullscreen(canvasElement);

  const playButton = document.querySelector("#btn-play") as HTMLButtonElement;
  playButton.onclick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (audio.audioCtx.state === "suspended") audio.audioCtx.resume();

    if (target.dataset.playing === "no") {
      audio.playCurrentSound();
      target.dataset.playing = "yes";
    } else {
      audio.pauseCurrentSound();
      target.dataset.playing = "no";
    }
  };

  const volumeSlider = document.querySelector("#slider-volume") as HTMLInputElement;
  const volumeLabel = document.querySelector("#volumeLabel") as HTMLSpanElement;
  volumeSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    audio.setVolume(target.value);
    volumeLabel.innerHTML = Math.round((+target.value / 2) * 100).toString();
  };
  volumeSlider.dispatchEvent(new Event("input"));

  const trebleSlider = document.querySelector("#slider-treble") as HTMLInputElement;
  const trebleLabel = document.querySelector("#trebleLabel") as HTMLSpanElement;
  trebleSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    audio.setTrebleVolume(target.value);
    trebleLabel.innerHTML = Math.round((+target.value / 2) * 100).toString();
  };
  trebleSlider.dispatchEvent(new Event("input"));

  const bassSlider = document.querySelector("#slider-bass") as HTMLInputElement;
  const bassLabel = document.querySelector("#bassLabel") as HTMLSpanElement;
  bassSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    audio.setBassVolume(target.value);
    bassLabel.innerHTML = Math.round((+target.value / 2) * 100).toString();
  };
  bassSlider.dispatchEvent(new Event("input"));

  const trackSelect = document.querySelector("#trackSelect") as HTMLSelectElement;
  trackSelect.onchange = e => {
    const target = e.target as HTMLSelectElement;
    audio.loadSoundFile(target.value);
    if (playButton.dataset.playing === "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  const typeSelect = document.querySelector("#typeSelect") as HTMLSelectElement;
  typeSelect.onclick = () => {
    drawParams.showFrequency = typeSelect.selectedIndex === 0;
    drawParams.showWave = typeSelect.selectedIndex === 1;
  };

  const checkboxes = [
    { id: "cb-gradient", prop: "showGradient" },
    { id: "cb-bars", prop: "showBars" },
    { id: "cb-circles", prop: "showCircles" },
    { id: "cb-noise", prop: "showNoise" },
    { id: "cb-invert", prop: "showInvert" },
    { id: "cb-emboss", prop: "showEmboss" }
  ];

  checkboxes.forEach(({ id, prop }) => {
    const checkbox = document.querySelector(`#${id}`) as HTMLInputElement;
    checkbox.checked = drawParams[prop as keyof typeof drawParams];
    checkbox.addEventListener("change", () => {
      drawParams[prop as keyof typeof drawParams] = checkbox.checked;
    });
  });
}

function loop(): void {
  const frameRate = 60;
  const interval = 1000 / frameRate;
  setTimeout(() => {
    canvas.draw(drawParams, spriteParams1, spriteParams2);
    loop();
  }, interval);
}

export { init };
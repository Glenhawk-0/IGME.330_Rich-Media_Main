import * as utils from './utils';

interface DrawParams {
  showGradient: boolean;
  showBars: boolean;
  showCircles: boolean;
  showNoise: boolean;
  showInvert: boolean;
  showEmboss: boolean;
  showFrequency: boolean;
  showWave: boolean;
}

interface Sprite {
  update(audioData: Uint8Array): void;
  draw(ctx: CanvasRenderingContext2D, canvasHeight: number, audioData: Uint8Array): void;
}

let ctx: CanvasRenderingContext2D;
let canvasWidth: number;
let canvasHeight: number;
let gradient: CanvasGradient;
let analyserNode: AnalyserNode;
let audioData: Uint8Array;

function setupCanvas(canvasElement: HTMLCanvasElement, analyserNodeRef: AnalyserNode): void {
  ctx = canvasElement.getContext("2d")!;
  canvasWidth = canvasElement.width;
  canvasHeight = canvasElement.height;

  gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
    { percent: 0, color: "red" },
    { percent: 0.25, color: "purple" },
    { percent: 0.5, color: "darkblue" },
    { percent: 0.75, color: "black" },
    { percent: 1, color: "black" }
  ]);

  analyserNode = analyserNodeRef;
  audioData = new Uint8Array(analyserNode.fftSize / 2);
}

function draw(params: DrawParams, spriteParams1: Sprite, spriteParams2: Sprite): void {
  if (params.showFrequency) {
    analyserNode.getByteFrequencyData(audioData);
  } else {
    analyserNode.getByteTimeDomainData(audioData);
  }

  ctx.save();
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();

  if (params.showGradient) {
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }

  if (params.showBars) {
    const barSpacing = 4;
    const margin = 5;
    const screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
    const barWidth = screenWidthForBars / audioData.length;
    const barHeight = 200;
    const topSpacing = 100;

    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.50)';
    ctx.strokeStyle = 'rgba(0,0,0,0.50)';
    for (let i = 0; i < audioData.length; i++) {
      const x = margin + i * (barWidth + barSpacing);
      const y = topSpacing + 256 - audioData[i];
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.strokeRect(x, y, barWidth, barHeight);
    }
    ctx.restore();
  }

  if (params.showCircles) {
    const maxRadius = canvasHeight / 4;
    ctx.save();
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < audioData.length; i++) {
      const percent = audioData[i] / 255;
      const circleRadius = percent * maxRadius;

      ctx.beginPath();
      ctx.fillStyle = utils.makeColor(255, 0, 180, 0.34 - percent / 3.0);
      ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = utils.makeColor(0, 0, 200, 0.10 - percent / 10.0);
      ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = utils.makeColor(200, 0, 0, 0.5 - percent / 5.0);
      ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 0.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
  }

  spriteParams1.update(audioData);
  spriteParams1.draw(ctx, canvasHeight, audioData);

  spriteParams2.update(audioData);
  spriteParams2.draw(ctx, canvasHeight, audioData);

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const data = imageData.data;
  const length = data.length;
  const width = imageData.width;

  for (let i = 0; i < length; i += 4) {
    if (params.showNoise && Math.random() < 0.02) {
      data[i] = data[i + 1] = data[i + 2] = 180;
    }

    if (params.showInvert) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      data[i] = 255 - red;
      data[i + 1] = 255 - green;
      data[i + 2] = 255 - blue;
    }
  }

  if (params.showEmboss) {
    for (let i = 0; i < length; i++) {
      if (i % 4 === 3) continue;
      data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

export { setupCanvas, draw };
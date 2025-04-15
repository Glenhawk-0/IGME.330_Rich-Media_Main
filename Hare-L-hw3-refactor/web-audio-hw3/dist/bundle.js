/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audio.ts":
/*!**********************!*\
  !*** ./src/audio.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyserNode: () => (/* binding */ analyserNode),
/* harmony export */   audioCtx: () => (/* binding */ audioCtx),
/* harmony export */   loadSoundFile: () => (/* binding */ loadSoundFile),
/* harmony export */   pauseCurrentSound: () => (/* binding */ pauseCurrentSound),
/* harmony export */   playCurrentSound: () => (/* binding */ playCurrentSound),
/* harmony export */   setBassVolume: () => (/* binding */ setBassVolume),
/* harmony export */   setTrebleVolume: () => (/* binding */ setTrebleVolume),
/* harmony export */   setVolume: () => (/* binding */ setVolume),
/* harmony export */   setupWebaudio: () => (/* binding */ setupWebaudio)
/* harmony export */ });
// Web Audio context and audio nodes
let audioCtx;
let element;
let sourceNode;
let analyserNode;
let gainNode;
let bassNode;
let trebleNode;
const DEFAULTS = Object.freeze({
    gain: 0.5,
    numSamples: 256
});
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);
// Set up the WebAudio graph
function setupWebaudio(filePath) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
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
function loadSoundFile(filePath) {
    element.src = filePath;
}
// Control playback
function playCurrentSound() {
    element.play();
}
function pauseCurrentSound() {
    element.pause();
}
// Volume & filter controls
function setVolume(value) {
    gainNode.gain.value = Number(value);
}
function setBassVolume(value) {
    bassNode.gain.value = Number(value) * 10;
}
function setTrebleVolume(value) {
    trebleNode.gain.value = Number(value) * 10;
}



/***/ }),

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   draw: () => (/* binding */ draw),
/* harmony export */   setupCanvas: () => (/* binding */ setupCanvas)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

let ctx;
let canvasWidth;
let canvasHeight;
let gradient;
let analyserNode;
let audioData;
function setupCanvas(canvasElement, analyserNodeRef) {
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    gradient = _utils__WEBPACK_IMPORTED_MODULE_0__.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
        { percent: 0, color: "red" },
        { percent: 0.25, color: "purple" },
        { percent: 0.5, color: "darkblue" },
        { percent: 0.75, color: "black" },
        { percent: 1, color: "black" }
    ]);
    analyserNode = analyserNodeRef;
    audioData = new Uint8Array(analyserNode.fftSize / 2);
}
function draw(params, spriteParams1, spriteParams2) {
    if (params.showFrequency) {
        analyserNode.getByteFrequencyData(audioData);
    }
    else {
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
            ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_0__.makeColor(255, 0, 180, 0.34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_0__.makeColor(0, 0, 200, 0.10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_0__.makeColor(200, 0, 0, 0.5 - percent / 5.0);
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
            if (i % 4 === 3)
                continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }
    ctx.putImageData(imageData, 0, 0);
}



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio */ "./src/audio.ts");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



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
    constructor(x, y, innerColorR, innerColorG, innerColorB, outerColorR, outerColorG, outerColorB) {
        this.x = x;
        this.y = y;
        this.innerColorR = innerColorR;
        this.innerColorG = innerColorG;
        this.innerColorB = innerColorB;
        this.outerColorR = outerColorR;
        this.outerColorG = outerColorG;
        this.outerColorB = outerColorB;
    }
    update(audioData) {
        this.audioData = audioData;
    }
    draw(ctx, canvasHeight, audioData) {
        const maxRadius = canvasHeight / 2;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < this.audioData.length; i++) {
            const percent = this.audioData[i] / 255;
            const circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.makeColor(this.innerColorR, this.innerColorG, this.innerColorB, 0.34 - percent / 3.0);
            ctx.arc(this.x, this.y, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.makeColor(this.outerColorR, this.outerColorG, this.outerColorB, 0.34 - percent / 3.0);
            ctx.arc(this.x, this.y, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.makeColor(255, 255, 0, 0.5 - percent / 5.0);
            ctx.arc(this.x, this.y, circleRadius * 0.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();
    }
}
let spriteParams1;
let spriteParams2;
const DEFAULTS = Object.freeze({
    sound1: "media/Neon-Cheese-Irritation.mp3"
});
function init(audioFiles, spriteData1, spriteData2) {
    spriteParams1 = new Sprite(spriteData1.x, spriteData1.y, spriteData1.innerColorR, spriteData1.innerColorG, spriteData1.innerColorB, spriteData1.outerColorR, spriteData1.outerColorG, spriteData1.outerColorB);
    spriteParams2 = new Sprite(spriteData2.x, spriteData2.y, spriteData2.innerColorR, spriteData2.innerColorG, spriteData2.innerColorB, spriteData2.outerColorR, spriteData2.outerColorG, spriteData2.outerColorB);
    _audio__WEBPACK_IMPORTED_MODULE_0__.setupWebaudio(DEFAULTS.sound1);
    const canvasElement = document.querySelector("canvas");
    setupUI(canvasElement);
    _canvas__WEBPACK_IMPORTED_MODULE_1__.setupCanvas(canvasElement, _audio__WEBPACK_IMPORTED_MODULE_0__.analyserNode);
    loop();
}
function setupUI(canvasElement) {
    const fsButton = document.querySelector("#btn-fs");
    fsButton.onclick = () => _utils__WEBPACK_IMPORTED_MODULE_2__.goFullscreen(canvasElement);
    const playButton = document.querySelector("#btn-play");
    playButton.onclick = (e) => {
        const target = e.target;
        if (_audio__WEBPACK_IMPORTED_MODULE_0__.audioCtx.state === "suspended")
            _audio__WEBPACK_IMPORTED_MODULE_0__.audioCtx.resume();
        if (target.dataset.playing === "no") {
            _audio__WEBPACK_IMPORTED_MODULE_0__.playCurrentSound();
            target.dataset.playing = "yes";
        }
        else {
            _audio__WEBPACK_IMPORTED_MODULE_0__.pauseCurrentSound();
            target.dataset.playing = "no";
        }
    };
    const volumeSlider = document.querySelector("#slider-volume");
    const volumeLabel = document.querySelector("#volumeLabel");
    volumeSlider.oninput = e => {
        const target = e.target;
        _audio__WEBPACK_IMPORTED_MODULE_0__.setVolume(target.value);
        volumeLabel.innerHTML = Math.round((+target.value / 2) * 100).toString();
    };
    volumeSlider.dispatchEvent(new Event("input"));
    const trebleSlider = document.querySelector("#slider-treble");
    const trebleLabel = document.querySelector("#trebleLabel");
    trebleSlider.oninput = e => {
        const target = e.target;
        _audio__WEBPACK_IMPORTED_MODULE_0__.setTrebleVolume(target.value);
        trebleLabel.innerHTML = Math.round((+target.value / 2) * 100).toString();
    };
    trebleSlider.dispatchEvent(new Event("input"));
    const bassSlider = document.querySelector("#slider-bass");
    const bassLabel = document.querySelector("#bassLabel");
    bassSlider.oninput = e => {
        const target = e.target;
        _audio__WEBPACK_IMPORTED_MODULE_0__.setBassVolume(target.value);
        bassLabel.innerHTML = Math.round((+target.value / 2) * 100).toString();
    };
    bassSlider.dispatchEvent(new Event("input"));
    const trackSelect = document.querySelector("#trackSelect");
    trackSelect.onchange = e => {
        const target = e.target;
        _audio__WEBPACK_IMPORTED_MODULE_0__.loadSoundFile(target.value);
        if (playButton.dataset.playing === "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };
    const typeSelect = document.querySelector("#typeSelect");
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
        const checkbox = document.querySelector(`#${id}`);
        checkbox.checked = drawParams[prop];
        checkbox.addEventListener("change", () => {
            drawParams[prop] = checkbox.checked;
        });
    });
}
function loop() {
    const frameRate = 60;
    const interval = 1000 / frameRate;
    setTimeout(() => {
        _canvas__WEBPACK_IMPORTED_MODULE_1__.draw(drawParams, spriteParams1, spriteParams2);
        loop();
    }, interval);
}



/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLinearGradient: () => (/* binding */ getLinearGradient),
/* harmony export */   getRandom: () => (/* binding */ getRandom),
/* harmony export */   getRandomColor: () => (/* binding */ getRandomColor),
/* harmony export */   goFullscreen: () => (/* binding */ goFullscreen),
/* harmony export */   makeColor: () => (/* binding */ makeColor)
/* harmony export */ });
const makeColor = (red, green, blue, alpha = 1) => {
    return `rgba(${red},${green},${blue},${alpha})`;
};
const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};
const getRandomColor = () => {
    const floor = 35;
    const getByte = () => getRandom(floor, 255 - floor);
    return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};
const getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {
    const lg = ctx.createLinearGradient(startX, startY, endX, endY);
    for (const stop of colorStops) {
        lg.addColorStop(stop.percent, stop.color);
    }
    return lg;
};
const goFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/loader.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.ts");

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
        .then((appData) => {
        console.log("JSON data loaded:", appData);
        // Preload audio files
        const audioFiles = appData.audioFiles.map(audio => {
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
        const trackSelect = document.querySelector("#trackSelect");
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
        _main__WEBPACK_IMPORTED_MODULE_0__.init(audioFiles, spriteData1, spriteData2);
    })
        .catch(error => {
        console.error("Error loading JSON data:", error);
    });
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
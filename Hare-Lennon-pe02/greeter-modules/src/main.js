

import { greet, doubleIt, defaultFirstName, defaultLastName, meaningOfLife } from "./utils.js";
import * as utils from  "./utils.js"; // OR give all of the exported `utils` functions a namespace

window.onload 

let temp = "main.js temp value"; // does not conflict with `temp` in utils.js

const input1 = document.querySelector("#input-firstname");
const input2 = document.querySelector("#input-lastname");
const output = document.querySelector("#output");
const cbForcefully = document.querySelector("#cb-forcefully");

output.style.background = 'yellow';
output.style.color = 'red';

const helloButton = document.querySelector("#btn-hello");
const goodbyeButton = document.querySelector("#btn-goodbye");

let forcefully = cbForcefully.checked;

//cbForcefully.onchange = () => forcefully = cbForcefully.checked;
cbForcefully.onchange = e => forcefully = e.target.checked;
helloButton.onclick = () => output.innerHTML = greet("Hello",input1.value.trim(), input2.value.trim() ,forcefully);
goodbyeButton.onclick = () => output.innerHTML = greet("Goodbye",input1.value.trim(),input2.value.trim() ,forcefully);

console.log("greet('Hey There') = ", greet('Hey there'));
console.log("doubleIt(10) = ", doubleIt(10));
console.log("defaultName = ", defaultFirstName); // FAILS - we need to import it
//console.log("meaningOfLife = ", meaningOfLife); // FAILS - it is not being exported by utils.js

console.log("temp = ", temp);
console.log("utils.temp = ", utils.temp); // named import


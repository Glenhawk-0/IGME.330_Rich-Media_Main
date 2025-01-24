// explictly import only the functions we are interested in

// 1 - get a reference to the button
// 2 - add a click event to button that calls a `sayHello` function
// 3 - create a `sayHello()` function
// 3A - get name of person from the <input>
// 3B - get a reference to the #output <p>
// 3C - update HTML of #output <p>

import { sayHello, doubleIt, defaultName, meaningOfLife } from "./utils.js";
import * as utils from  "./utils.js"; // OR give all of the exported `utils` functions a namespace

let temp = "main.js temp value"; // does not conflict with `temp` in utils.js

const input = document.querySelector("#input-firstname");
const output = document.querySelector("#output");
const cbForcefully = document.querySelector("#cb-forcefully");

const helloButton = document.querySelector("#btn-hello");
const goodbyeButton = document.querySelector("#btn-goodbye");

let forcefully = cbForcefully.checked;

//cbForcefully.onchange = () => forcefully = cbForcefully.checked;
cbForcefully.onchange = e => forcefully = e.target.checked;
helloButton.onclick = () => output.innerHTML = sayHello("Hello",input.value.trim(),forcefully);
goodbyeButton.onclick = () => output.innerHTML = sayHello("Goodbye",input.value.trim(),forcefully);

console.log("sayHello('Hey There') = ", sayHello('Hey there'));
console.log("doubleIt(10) = ", doubleIt(10));
console.log("defaultName = ", defaultName); // FAILS - we need to import it
//console.log("meaningOfLife = ", meaningOfLife); // FAILS - it is not being exported by utils.js

console.log("temp = ", temp);
console.log("utils.temp = ", utils.temp); // named import


//getin randomElement from utils.js
import { randomElement } from "./utils.js";	

//declarin words
let words1
let words2 
let words3




//functions
const init = () => {
    // generate();
     document.querySelector("#btn-gen-1").addEventListener("click",generate.bind(this, 1))
     document.querySelector("#btn-gen-2").addEventListener("click",generate.bind(this, 5))
 }//end init
 
 
 const generate = (num = 1 ) => {
     //return randomElement(words1) + " " + randomElement(words2) + " " + randomElement(words3)
     let str = "" ;
     for (let i = 0; i < num ; i++){
      str += `<br>${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}`
     }
     str += "!"
     document.querySelector("#output").innerHTML = str;
 }//end generate


const loadBabble = () => {
    console.log ("loadBabble Funtion has been triggered");
			// 1 - create a new XHR object
			let xhr = new XMLHttpRequest();

			// 2 - set the onload Handler
			xhr.onload = babbleLoaded;

			// 3 - set the onerror handler
			xhr.onerror = dataError;

			// 4 - open connection and send the request
			xhr.open("GET", "data/babble-data.json");
			xhr.send();
}//end loadBabble

const babbleLoaded = (e) => {

    			// 5 - event.target is the xhr object
			let xhr = e.target;

			// 6 - xhr.responseText is the JSON file we just downloaded
			//console.log(xhr.responseText);   //this fills up stuff reall fast

			// 7 - turn the text into a parsable JavaScript object
			let obj = JSON.parse(xhr.responseText);
            console.log("Json object")
			console.log(obj[0])

             words1 = obj[0].words1;
             words2 = obj[0].words2;
             words3 = obj[0].words3;
          
            // calling functions to make buttons work and to generate text on loading the page
             init();
             generate();
}//end babbleLoaded

const dataError = (e) => {
    console.log("An error occured for 'xhr.onload = dataLoaded;' ")
}//end dataError

// Doin Stuff
loadBabble();



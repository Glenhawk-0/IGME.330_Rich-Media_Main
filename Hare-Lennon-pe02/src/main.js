


// varibles

const defaultFirstName = "Peter";
const defaultLastName = "Parker";

// document selectors
const input1 = document.querySelector("#input-firstname");
const input2 = document.querySelector("#input-lastname");
const output = document.querySelector("#output");
const cbShoutfully = document.querySelector("#cb-shoutfully");
const helloButton = document.querySelector("#btn-hello");
const goodbyeButton = document.querySelector("#btn-goodbye");






//Decorating :D  / declarin stuff

let shoutfully = cbShoutfully.checked;
output.style.background = 'yellow';
output.style.color = 'red';

//functions 

cbShoutfully.onchange = (e) => shoutfully = e.target.checked;
helloButton.onclick = () => output.innerHTML = greet("Hello", input1.value.trim(), input2.value.trim(), shoutfully);
goodbyeButton.onclick = () => output.innerHTML = greet("Goodbye", input1.value.trim(), input2.value.trim(), shoutfully);



function greet(greeting, nameF, nameL, shoutfully) {
    const recipient = (nameF ? nameF : defaultFirstName) + (" ") + (nameL ? nameL : defaultLastName);
    //recipient += (" ") + nameL ? nameL : defaultLastName ;  ;
    const str = `${greeting} ${recipient}`;
    return shoutfully ? `${str.toUpperCase()}!` : str;
};
const meaningOfLife = 42;
const defaultFirstName = "Peter";
const defaultLastName = "Parker";

let temp = "utils.js temp value"; // does not conflict with `temp` in main.js

const doubleIt = val =>  val * 2;

const greet = (greeting, nameF , nameL, forcefully) => {
  const recipient  = (nameF ? nameF : defaultFirstName) + (" ") + (nameL ? nameL : defaultLastName) ;
  //recipient += (" ") + nameL ? nameL : defaultLastName ;  ;
  const str = `${greeting} ${recipient}`;
  return forcefully ? `${str.toUpperCase()}!` : str;
};

// export our "public" symbols, everything else in this file is "private" by default
export { defaultFirstName, defaultLastName, doubleIt, greet, temp, meaningOfLife };

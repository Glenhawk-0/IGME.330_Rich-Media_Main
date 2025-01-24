const meaningOfLife = 42;
const defaultName = "..Uh.. No One?";
let temp = "utils.js temp value"; // does not conflict with `temp` in main.js

const doubleIt = val =>  val * 2;

const sayHello = (greeting, name, forcefully) => {
  const recipient  = name ? name : defaultName;
  const str = `${greeting} ${recipient}`;
  return forcefully ? `${str.toUpperCase()}!` : str;
};

// export our "public" symbols, everything else in this file is "private" by default
export { defaultName, doubleIt, sayHello, temp, meaningOfLife };

// Import functions from api.js and ui.js

   // ADD TWO LINES OF CODE HERE TO IMPORT THE getData FUNCTION from api.js
   
   //for all the type script i didnt really study too well on how to use it so ill just have to leave most of it the same. im sorry.
   
   import { getData} from "./api";
   // AND THE THREE FUNCTIONS IN ui.js
   import {renderResults, showError,clearError } from "./ui";


   interface Creature {
    // provide types for picture, name, breed,
    // and location (all strings)

    }


   // Get references to the dropdown and button
const creatureTypeSelect = document.querySelector("#creatureType");
const getDataButton = document.querySelector("#getDataButton");

// Set up event listener for the "Get Data" button
getDataButton.addEventListener("click", () => {
  const selectedType  =  creatureTypeSelect.value; // Get the selected type

  clearError(); // Clear any existing error messages

  // Fetch data for the selected type
  getData(
    selectedType,
    (data) => {
      renderResults(data); // Render the results on success
    },
    (errorMessage) => {
      showError(errorMessage); // Show an error message on failure
    }
  );
});

interface Creature {
  // provide types for picture, name, breed,
  // and location (all strings)
  picture: string;
  name: string;
  breed: string;
  location: string;

  }

// Import functions from api.js and ui.js

   // ADD TWO LINES OF CODE HERE TO IMPORT THE getData FUNCTION from api.js
   import { getData} from "./api";
   // AND THE THREE FUNCTIONS IN ui.js
   import {renderResults, showError,clearError } from "./ui";
// Get references to the dropdown and button
const creatureTypeSelect = document.querySelector("#creatureType") as HTMLSelectElement;
const getDataButton = document.querySelector("#getDataButton") as HTMLButtonElement;

// Set up event listener for the "Get Data" button
getDataButton.addEventListener("click", () => {
  const selectedType = creatureTypeSelect.value; // Get the selected type
  clearError(); // Clear any existing error messages

  // Fetch data for the selected type
  getData(
    selectedType,
    (data: Creature[]) => {  
      renderResults(data); // Render the results on success
    },
    (errorMessage: string) => {
      showError(errorMessage); // Show an error message on failure
    }
  );
});

// Fetches data from the Adoptable Creatures API
// - type: The type of creature to fetch (e.g., "cats", "dogs", "dragons")
// - callback: Function to run with the fetched data if successful
// - errorCallback: Function to run with an error message if the request fails
export function getData(type, callback, errorCallback) {
    const API_URL = "https://people.rit.edu/anwigm/330/practical/api.php";
    const xhr = new XMLHttpRequest();
  
    // Open a GET request to the API
    xhr.open("GET", `${API_URL}?type=${type}`, true);
  
    // Handle the API response
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          // Parse the response and call the success callback
          const data = JSON.parse(xhr.responseText);

          callback(data);
        } catch (err) {
          // Handle JSON parsing errors
          errorCallback("Error parsing data from the server.");
        }
      } else {
        // Handle HTTP errors
        errorCallback("Error fetching data from the server.");
      }
    };
  
    // Handle network errors
    xhr.onerror = function () {
      errorCallback("Network error occurred while fetching data.");
    };
  
    // Send the request
    xhr.send();
  }
  
window.addEventListener('DOMContentLoaded', () => {
  // DOM ELEMENTS - START
  const quotesContainer = document.getElementById('quotes_container')
  console.log(quotesContainer)

  // DOM ELEMENTS - END

  // GLOBAL VARIABLES (STATE) - START
  const profilePictures = {
    
  }

  // GLOBAL VARIABLES (STATE) - END

  // HELPER FUNCTIONS - START
  function fetchQuotes() {
    fetch('http://localhost:8000/scripts/fetchQuotes.php')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((quotes) => {
      console.log(quotes);
    })
    .catch((error) => {
      console.log(`Error fetching quotes: ${error}`);
    });
  }

  // HELPER FUNCTIONS - END

  // CONTROLLER FUNCTIONS - START

  // CONTROLLER FUNCTIONS - END

  // CONTAINER FUNCTION - START
  function startApp() {
    //add initial event listeners here
    fetchQuotes()
  }
  // CONTAINER FUNCTION - END
  startApp();
});

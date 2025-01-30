window.addEventListener('DOMContentLoaded', () => {
  // DOM ELEMENTS - START
  const quotesContainer = document.getElementById('quotes_container');
  const votingTabs = document.querySelectorAll('.voting_tabs_button');
  const oneVersusOne = document.getElementById('versus_button');
  const versusSection = document.getElementById('versus_section');
  const searchSection = document.getElementById('search_section');
  const search = document.getElementById('search_button');
  const versusCards = document.querySelectorAll('.versus_section_quote_card')
  const quote1Versus = document.getElementById('versus_section_quotes_1');
  const quote2Versus = document.getElementById('versus_section_quotes_2');

  const votingForm = document.querySelectorAll('.voting_form');

  // DOM ELEMENTS - END

  // GLOBAL VARIABLES (STATE) - START
  /// quotes
  const quote1 = document.getElementById('quote_rank_1_text');
  const quote2 = document.getElementById('quote_rank_2_text');
  const quote3 = document.getElementById('quote_rank_3_text');
  const quote4 = document.getElementById('quote_rank_4_text');
  const quote5 = document.getElementById('quote_rank_5_text');
  const quote6 = document.getElementById('quote_rank_6_text');
  const quote7 = document.getElementById('quote_rank_7_text');
  const quote8 = document.getElementById('quote_rank_8_text');
  const quote9 = document.getElementById('quote_rank_9_text');
  const quote10 = document.getElementById('quote_rank_10_text');
  const quote11 = document.getElementById('quote_rank_11_text');
  const quote12 = document.getElementById('quote_rank_12_text');
  const quote13 = document.getElementById('quote_rank_13_text');
  const quote14 = document.getElementById('quote_rank_14_text');
  const quote15 = document.getElementById('quote_rank_15_text');
  const quote16 = document.getElementById('quote_rank_16_text');
  const quote17 = document.getElementById('quote_rank_17_text');
  const quote18 = document.getElementById('quote_rank_18_text');
  const quote19 = document.getElementById('quote_rank_19_text');
  const quote20 = document.getElementById('quote_rank_20_text');
  const quote21 = document.getElementById('quote_rank_21_text');

  let quoteElements = [
    quote1,
    quote2,
    quote3,
    quote4,
    quote5,
    quote6,
    quote7,
    quote8,
    quote9,
    quote10,
    quote11,
    quote12,
    quote13,
    quote14,
    quote15,
    quote16,
    quote17,
    quote18,
    quote19,
    quote20,
    quote21,
  ];

  /// quotes
  let quotesArray = [];

  // GLOBAL VARIABLES (STATE) - END

  // HELPER FUNCTIONS - START
  function votingTabsClickEvent() {
    votingTabs.forEach((votingTab) => {
      votingTab.addEventListener('click', () => {
        votingTabs.forEach((vt) => vt.classList.remove('active'));
        votingTab.classList.add('active');
        //When user click on 1v1, only show 1v1 section
        if (oneVersusOne.classList.contains('active')) {
          versusSection.classList.remove('inactive');
          versusSection.classList.add('active');
          searchSection.classList.remove('active');
          searchSection.classList.add('inactive');
        }
        //When user click on search, only show search section
        if (search.classList.contains('active')) {
          searchSection.classList.remove('inactive');
          searchSection.classList.add('active');
          versusSection.classList.remove('active');
          versusSection.classList.add('inactive');
        }
      });
    });
  }


  function displayQuotes(sortedQuotes) {
    for (let i = 0; i <= sortedQuotes.length; i++) {
      quoteElements[i].innerHTML = sortedQuotes[i].quote;
    }
  }

  function createOneVersusOneQuotesDisplay(quotesArray) {
    let quotesRemovedArray = [...quotesArray];
    

    return function displayOneVersusOneQuotes() {

      //run function again when user votes

      if (quotesRemovedArray.length < 2) {
        console.log('Not enough quotes');
        return;
      }

      let firstRandomIndex = Math.floor(Math.random() * quotesRemovedArray.length);
      let firstQuote = quotesRemovedArray.splice(firstRandomIndex, 1)[0].quote //remove quote from array and get quote text
      quote1Versus.innerHTML = firstQuote;

      let secondRandomIndex = Math.floor(
        Math.random() * quotesRemovedArray.length
      );
      let secondQuote = quotesRemovedArray.splice(secondRandomIndex, 1)[0].quote //remove quote from array and get quote text
      quote2Versus.innerHTML = secondQuote;
     
    };
  }

  function votingCardsClickEvent(quotesArray) {
    versusCards.forEach((card) => {
      card.addEventListener('click', createOneVersusOneQuotesDisplay(quotesArray))
    })
  }

  // HELPER FUNCTIONS - END

  // CONTROLLER FUNCTIONS - START

  function sortQuotes(quotes) {
    let sortedQuotes = quotes.sort((b, a) => {
      if (b.votes === a.votes) {
        return b.quote.length - a.quote.length; //if votes are equal, the shortest quote wins (no reason for this, just had to sort them somehow)
      }
      return b.votes - a.votes;
    });
    displayQuotes(sortedQuotes.slice(0, 21)); //only send the top 21 quotes
  }

  function fetchQuotes() {
    fetch('http://localhost:8000/scripts/fetchQuotes.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((quotes) => {
        quotesArray = [...quotes];
        let displayQuotes = createOneVersusOneQuotesDisplay(quotesArray); //closure inside create func so need to call displayQuotes below
        displayQuotes();
        votingCardsClickEvent(quotesArray);
        sortQuotes(quotesArray);
      })
      .catch((error) => {
        console.log(`Error fetching quotes: ${error}`);
      });
  }

  // CONTROLLER FUNCTIONS - END

  // CONTAINER FUNCTION - START
  function startApp() {
    //add initial event listeners here
    fetchQuotes();
    votingTabsClickEvent()

  }
  // CONTAINER FUNCTION - END
  startApp();
});

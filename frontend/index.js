//Comments key:
// = general comment
//// = needs changing

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
  const mainVoteCount = document.getElementById('vote_count');
  const overlayVoteCount = document.getElementById('overlay_vote_count_span');

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
  
  ///voting
  let voteCount = 21; //user gets 21 votes only - start at 21 and count down
  mainVoteCount.innerHTML = voteCount;
  overlayVoteCount.innerHTML = voteCount;

  /// quotes
  let quotesArray = [];
  let displayVersusQuotes; //points to function with closure inside later but is declared globally here so that it points to createOneVersusOneQuotesDisplay(quotesArray) only once, thus the same quotesArray is used instead of duplicates. 

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
    
    let quotesRemovedArray = [...quotesArray]; //point to quotesArray and in closure below, quotesRemovedArray remembers edited array with quotes removed
    

    return function displayOneVersusOneQuotes() { //closure to remember which quotes have been removed

      //run function again when user votes

      if (quotesRemovedArray.length < 2) {
        console.log('Not enough quotes'); ////change this to a notification
        return;
      }

      let firstRandomIndex = Math.floor(Math.random() * quotesRemovedArray.length);
      let firstQuote = quotesRemovedArray.splice(firstRandomIndex, 1)[0].quote ////firstQuote and secondQuote variables are pointing to two different array - need to remove splice from same array //remove quote from array and get quote text
      quote1Versus.innerHTML = firstQuote;
      console.log("first", quotesRemovedArray)

      let secondRandomIndex = Math.floor(
        Math.random() * quotesRemovedArray.length
      );
      let secondQuote = quotesRemovedArray.splice(secondRandomIndex, 1)[0].quote //remove quote from array and get quote text
      quote2Versus.innerHTML = secondQuote;
      console.log("second", quotesRemovedArray)
     
    };
  }

  function votingCardsClickEvent() {
    versusCards.forEach((card) => {
      card.addEventListener('click', () => {
        displayVersusQuotes()
        let runVoteCount = changeVoteCount(); //because it's a closure
        runVoteCount();
        //// click needs to run function that +1 to quote that was voted for
      }) 
    })
  }

  function changeVoteCount() {

    return function trackVoteCount() {
      if (voteCount < 1) {
        ////notification
        return
      }
      voteCount--
      overlayVoteCount.innerHTML = voteCount;
      mainVoteCount.innerHTML = voteCount;
    }

  }

  // HELPER FUNCTIONS - END

  // CONTROLLER FUNCTIONS - START

  function sortQuotes(quotes) { //sorts quotes highest to lowest number of votes
    let sortedQuotes = quotes.sort((b, a) => {
      if (b.votes === a.votes) {
        return b.quote.length - a.quote.length; //if votes are equal, the shortest quote wins (no reason for this, just had to sort them somehow)
      }
      return b.votes - a.votes;
    });
    displayQuotes(sortedQuotes.slice(0, 21)); //only display top 21 quotes
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
        if (!displayVersusQuotes) displayVersusQuotes = createOneVersusOneQuotesDisplay(quotesArray); //closure inside create func so need to call displayQuotes below
        displayVersusQuotes();
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

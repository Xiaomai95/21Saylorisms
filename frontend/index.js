//Comments key:
// = general comment
//// = needs changing

window.addEventListener('DOMContentLoaded', () => {
  // DOM ELEMENTS - START

  const closeOverlay = document.getElementById('close_overlay_button');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');
  const votingTabs = document.querySelectorAll('.voting_tabs_button');

  //OneVersusOne Section
  const oneVersusOne = document.getElementById('versus_button');
  const versusSection = document.getElementById('versus_section');
  const searchSection = document.getElementById('search_section');
  const search = document.getElementById('search_button');
  const quote1Versus = document.getElementById('versus_section_quotes_1');
  const quote2Versus = document.getElementById('versus_section_quotes_2');

  //Emoji Search section
  const emojiButtons = document.querySelectorAll('.search_section_button');
  const emojiQuotes = document.querySelectorAll('.emoji_search_quotes');
  const moneyQuotes = document.getElementById('money_quotes');
  const predictionQuotes = document.getElementById('prediction_quotes');
  const energyQuotes = document.getElementById('energy_quotes');
  const fireQuotes = document.getElementById('fire_quotes');
  const worldQuotes = document.getElementById('world_quotes');
  const upQuotes = document.getElementById('up_quotes');
  const thinkQuotes = document.getElementById('think_quotes');
  const targetQuotes = document.getElementById('target_quotes');
  const hearts = document.querySelectorAll('.voteDB');
  const votePopUp = document.getElementById('vote_popup');
  const noVotesPopUp = document.getElementById('no_votes_popup');

  //Vote counters
  const mainVoteCount = document.getElementById('vote_count');
  const overlayVoteCount = document.getElementById('overlay_vote_count_span');
  const popupVoteCount = document.getElementById('vote_popup_span');

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

  const voteCount1 = document.getElementById('vote_count_1');
  const voteCount2 = document.getElementById('vote_count_2');
  const voteCount3 = document.getElementById('vote_count_3');
  const voteCount4 = document.getElementById('vote_count_4');
  const voteCount5 = document.getElementById('vote_count_5');
  const voteCount6 = document.getElementById('vote_count_6');
  const voteCount7 = document.getElementById('vote_count_7');
  const voteCount8 = document.getElementById('vote_count_8');
  const voteCount9 = document.getElementById('vote_count_9');
  const voteCount10 = document.getElementById('vote_count_10');
  const voteCount11 = document.getElementById('vote_count_11');
  const voteCount12 = document.getElementById('vote_count_12');
  const voteCount13 = document.getElementById('vote_count_13');
  const voteCount14 = document.getElementById('vote_count_14');
  const voteCount15 = document.getElementById('vote_count_15');
  const voteCount16 = document.getElementById('vote_count_16');
  const voteCount17 = document.getElementById('vote_count_17');
  const voteCount18 = document.getElementById('vote_count_18');
  const voteCount19 = document.getElementById('vote_count_19');
  const voteCount20 = document.getElementById('vote_count_20');
  const voteCount21 = document.getElementById('vote_count_21');

  let voteCountArray = [
    voteCount1,
    voteCount2,
    voteCount3,
    voteCount4,
    voteCount5,
    voteCount6,
    voteCount7,
    voteCount8,
    voteCount9,
    voteCount10,
    voteCount11,
    voteCount12,
    voteCount13,
    voteCount14,
    voteCount15,
    voteCount16,
    voteCount17,
    voteCount18,
    voteCount19,
    voteCount20,
    voteCount21,
  ];

  ///voting
  let voteCount = 2; //user gets 21 votes only - start at 21 and count down
  mainVoteCount.innerHTML = voteCount;
  overlayVoteCount.innerHTML = voteCount;
  popupVoteCount.innerHTML = voteCount;

  /// quotes
  let quotesArray = [];
  let displayVersusQuotes; //points to function with closure inside later but is declared globally here so that it points to createOneVersusOneQuotesDisplay(quotesArray) only once, thus the same quotesArray is used instead of duplicates.

  // GLOBAL VARIABLES (STATE) - END

  // HELPER FUNCTIONS - START

  function toggleOverlay() {
    //opens/closes the overlay
    if (overlay.classList.contains('inactive')) {
      overlay.classList.remove('inactive');
      overlay.classList.add('active');
      document.body.classList.add('overlay_open'); //don't allow scrolling when overlay is open
    } else {
      overlay.classList.remove('active');
      overlay.classList.add('inactive');
      document.body.classList.remove('overlay_open'); //don't allow scrolling when overlay is open
    }
  }

  function toggleEmojiQuotes(event) {
    let emojiEvent = event.target.id;
    emojiQuotes.forEach((quotes) => {
      quotes.classList.add('inactive');
      if (emojiEvent === 'money') moneyQuotes.classList.remove('inactive');
      else if (emojiEvent === 'prediction')
        predictionQuotes.classList.remove('inactive');
      else if (emojiEvent === 'energy')
        energyQuotes.classList.remove('inactive');
      else if (emojiEvent === 'fire') fireQuotes.classList.remove('inactive');
      else if (emojiEvent === 'world') worldQuotes.classList.remove('inactive');
      else if (emojiEvent === 'up') upQuotes.classList.remove('inactive');
      else if (emojiEvent === 'think') thinkQuotes.classList.remove('inactive');
      else if (emojiEvent === 'target')
        targetQuotes.classList.remove('inactive');
    });
  }

  function toggleEmojiButtons() {
    emojiButtons.forEach((button) => {
      //first forEach to add event listener and to activate button once clicked
      button.addEventListener('click', toggleEmojiQuotes);
      button.addEventListener('click', () => {
        emojiButtons.forEach((bt) => {
          //second forEach resets all once one button is clicked to ensure no two are active at same time
          bt.classList.remove('active');
          bt.classList.add('inactive');
        });
        if (button.classList.contains('inactive')) {
          button.classList.remove('inactive');
          button.classList.add('active');
        }
      });
    });
  }

  function toggleVotingTabs() {
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

  function addHeartEventListeners() {
    hearts.forEach((heart) => {
      heart.addEventListener('click', handleHeartVotes);
    });
  }

  function disableHeartVote(id) {
    hearts.forEach((heart) => {
      if (heart.dataset.id === id) {
        heart.checked = true;
        heart.disabled = true;
      }
    });
  }

  function displayQuotes(sortedQuotes) {
    console.log(sortedQuotes)
    for (let i = 0; i <= sortedQuotes.length; i++) {
      quoteElements[i].innerHTML = sortedQuotes[i].quote;
      voteCountArray[i].innerHTML = sortedQuotes[i].vote;
    }
  }

  function handleVotePopUp() {
    if (voteCount > 0) {
      votePopUp.classList.remove('inactive');
      setTimeout(() => {
        votePopUp.classList.add('inactive');
      }, 3000);
    } else {
      noVotesPopUp.classList.remove('inactive');
      setTimeout(() => {
        noVotesPopUp.classList.add('inactive');
      }, 3000);
    }
    //if still have votes, run show upvoted popup function
    //if no more votes, run no more votes popup
  }

  function changeVoteCount() {
    
    handleVotePopUp();
    let usedVotes = parseInt(localStorage.getItem('usedVotes', '0')) || 0;


    return function trackVoteCount() {
      //closure tracking the vote count
      if (usedVotes >= 2) {
        handleVotePopUp();
        return;
      }
      voteCount--;
      overlayVoteCount.innerHTML = voteCount;
      mainVoteCount.innerHTML = voteCount;
      popupVoteCount.innerHTML = voteCount;

      localStorage.setItem('usedVotes', usedVotes + 1);
    };
  }

  async function updateDBVoteCount(event) {
    if (voteCount === 0) return;

    const id = event.target.dataset.id; // Get ID from button
    if (!id) {
      console.error('No ID found for vote update.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8000/scripts/updateVoteCount.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating vote count:', error);
    }
  }

  // HELPER FUNCTIONS - END

  // CONTROLLER FUNCTIONS - START

  function createOneVersusOneQuotesDisplay(quotesArray) {
    let quotesRemovedArray = [...quotesArray];

    return function displayOneVersusOneQuotes() {
      if (quotesRemovedArray.length < 2) {
        console.log('Not enough quotes');
        return;
      }
      if (localStorage.getItem("usedVotes") >= 2) return; //stop showing new quotes if no more votes left

      let firstRandomIndex = Math.floor(
        Math.random() * quotesRemovedArray.length
      );
      let firstQuote = quotesRemovedArray.splice(firstRandomIndex, 1)[0];
      quote1Versus.innerHTML = firstQuote.quote;
      quote1Versus.setAttribute('data-id', firstQuote.id);

      let secondRandomIndex = Math.floor(
        Math.random() * quotesRemovedArray.length
      );
      let secondQuote = quotesRemovedArray.splice(secondRandomIndex, 1)[0];
      quote2Versus.innerHTML = secondQuote.quote;
      quote2Versus.setAttribute('data-id', secondQuote.id);
    };
  }

  // Ensure only one function handles votes
  function handleOneVersusOneVote(event) {
    const id = event.target.dataset.id; // Get ID from button

    if (voteCount !== 0) localStorage.setItem(`id-${id}`, id); //only add id to local storage if user still has votes remaining

    if (localStorage.getItem(`id-${id}`)) {
      event.target.disabled = true; //both disabled+checked needed to prevent user voting again
      // event.target.checked = true;
    }

    disableHeartVote(id); //

    let runVoteCount = changeVoteCount();
    runVoteCount();
    displayVersusQuotes();
    updateDBVoteCount(event);
  }

  function handleHeartVotes(event) {
    const id = event.target.dataset.id; // Get ID from button

    localStorage.setItem(`id-${id}`, id);

    if (localStorage.getItem(`id-${id}`)) {
      event.target.disabled = true; //both disabled+checked needed to prevent user voting again
      // event.target.checked = true;
    }

    let runVoteCount = changeVoteCount();
    runVoteCount();
    updateDBVoteCount(event);
  }

  function sortQuotes(quotes) {
    //sorts quotes highest to lowest number of votes
    let sortedQuotes = quotes.sort((b, a) => {
      return a.vote - b.vote;
    });
    displayQuotes(sortedQuotes.slice(0, 21)); //only display top 21 quotes
  }

  function fetchQuotes() {
    fetch('http://localhost:8000/scripts/fetchQuotes.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((quotes) => {
        quotesArray = [...quotes];
        console.log(quotesArray)
        displayVersusQuotes = createOneVersusOneQuotesDisplay(quotesArray);
        displayVersusQuotes(); // Ensure it's only called ONCE
        sortQuotes(quotesArray);
      })
      .catch((error) => {
        console.error(`Error fetching quotes: ${error}`);
      });
  }

  // CONTROLLER FUNCTIONS - END

  // CONTAINER FUNCTION - START
  function startApp() {
    fetchQuotes();
    //add initial event listeners here
    toggleVotingTabs();
    toggleEmojiButtons();
    addHeartEventListeners();
    closeOverlay.addEventListener('click', toggleOverlay);
    menu.addEventListener('click', toggleOverlay);
    quote1Versus.addEventListener('click', handleOneVersusOneVote);
    quote2Versus.addEventListener('click', handleOneVersusOneVote);
  }
  // CONTAINER FUNCTION - END
  startApp();
});

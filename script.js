"use strict";

// Selecting elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Declaring global variables
let scores, currentScore, activePlayer, isPlaying;

// Reset the game function = initialise the game
const init = function () {
  // Variables inside function are scoped to the function
  // Points for both players
  scores = [0, 0]; // [player 0, player 1]
  currentScore = 0;
  activePlayer = 0; // First player = player 0

  // State variable for game is playing
  isPlaying = true;

  // Reset the total scores
  // JS will automatically convert number into strings
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  // Reset the current scores
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // Remove the dice
  diceElement.classList.add("hidden");

  // Remove player winner class
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");

  // Make player 0 the active player
  player0Element.classList.add("player--active");

  // Remove active player class on non-active player
  player1Element.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  // Switching to the next player
  // Reset the score back to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Reassigning active player based on 0 and 1
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Adding/Removing active player class based on current state
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // Only execute code if game playing = true
  if (isPlaying) {
    // 1. Generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;
    // Adjust the src imgage file name with the dice number

    // 3. Check for rolled 1: if true
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice; // currentScore = currentScore + dice

      // Select current score dynamically based on ative player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // Only execute code if game playing = true
  if (isPlaying) {
    // 1. Add current score to active player score
    scores[activePlayer] += currentScore;
    // scores[0] = scores[0] + currentScore

    // Display the accumulated score of the active player after hold
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // score--0

    // 2. Check if player score is >= 100
    if (scores[activePlayer] >= 20) {
      // a. Finish the game
      isPlaying = false;
      diceElement.classList.add("hidden");

      // Assign a player winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // Remove the player active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // b. Switch to the next player
      switchPlayer();
    }
  }
});

// Call the init() function
btnNew.addEventListener("click", init);

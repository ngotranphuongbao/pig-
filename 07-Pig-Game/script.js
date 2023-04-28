"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

const changePlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer ? (activePlayer = 0) : (activePlayer = 1);
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

//Roll Dice Functionality
btnRoll.addEventListener("click", function () {
  if (scores[activePlayer] < 10) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

//Hold Score Functionality
btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.querySelectorAll(".score")[activePlayer].textContent =
    scores[activePlayer];
  currentScore = 0;
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    diceEl.classList.add("hidden");
  } else {
    changePlayer();
  }
});

//New Game Functionality
btnNew.addEventListener("click", function () {
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  if (
    !document.querySelector(".player--0").classList.contains("player--active")
  ) {
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
  }
});

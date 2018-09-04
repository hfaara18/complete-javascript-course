/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score;
let roundScore;
let activePlayer;
let gamePlaying;
let lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if(gamePlaying) {
    // 1. Random Number
    let dice1 = Math.floor(Math.random()*6) + 1;
    let dice2 = Math.floor(Math.random()*6) + 1;

    // 2. Display result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    //3. Update score if number is not 1
    if(dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
    else {
      nextPlayer();
    }
  }

});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if(gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    let winningScore;

    let finalScore = document.querySelector(".final-score").value;

    // Checking for undefined, 0, null or "" values
    if(finalScore) {
      winningScore = finalScore;
    }
    else {
      winningScore = 100;
    }

    // Check if player won the game
    if(scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      hideDice();
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

      gamePlaying = false;
    }

    else {
      // Next Player
      nextPlayer();
    }
  }


});


function nextPlayer() {
  //next activePlayer
  activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  hideDice();
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  hideDice();
  resetUI();

}

function hideDice() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

function resetUI() {
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

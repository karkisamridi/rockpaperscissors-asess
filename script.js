const moves = ["Rock", "Paper", "Scissors"];
const outcomes = ["It's a tie!", "You win!", "You lose!"];
let playerScore = 0;
let computerScore = 0;
const winningScore = 3;
let numMatches = 0;
// Function to generate a random move
function getRandomMove() {
  return Math.floor(Math.random() * moves.length);
}

// Function to calculate the result of the game
function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return outcomes[0];
  } else if (
    (playerMove === 0 && computerMove === 2) ||
    (playerMove === 1 && computerMove === 0) ||
    (playerMove === 2 && computerMove === 1)
  ) {
    return outcomes[1];
  } else {
    return outcomes[2];
  }
}

// Function to update the score display
function updateScore() {
  const scoreDisplay = document.querySelector("#score-display");
  scoreDisplay.textContent = `${playerScore} - ${computerScore}`;
}

// Function to update the status display
function updateStatusDisplay(status) {
  const statusDisplay = document.querySelector("#status-head");
  statusDisplay.textContent = status;
}

// Function to handle player's move and calculate the result
function play(event) {
  const playerMove = event.target.textContent;
  const computerMove = getRandomMove();
  const result = getResult(moves.indexOf(playerMove), computerMove);

  updateStatusDisplay(result);
  document.getElementById("result").textContent = `You played ${playerMove} - Computer played ${moves[computerMove]}`;

  if (result === outcomes[1]) {
    playerScore++;
  } else if (result === outcomes[2]) {
    computerScore++;
  }

  updateScore();

  numMatches++;

  if (numMatches === winningScore) {
    endGame();
  }
}

// Function to end the game
function endGame() {
  const statusDisplay = document.querySelector("#status-head");
  const moveDisplay = document.querySelector(".move-display");
  const playAgainButton = document.querySelector("#play-again-button");

  if (playerScore > computerScore) {
    statusDisplay.textContent = "Victory ◉⁠‿⁠◉ ";
  } else if (playerScore < computerScore) {
    statusDisplay.textContent = "Crushing Defeat ಥ⁠‿⁠ಥ ";
  } else {
    statusDisplay.textContent = "It's a tie!";
  }

  moveDisplay.children[0].textContent = "";
  moveDisplay.children[1].textContent = "";
  playAgainButton.textContent = "Play Again";
  playAgainButton.style.display = "block";

  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.removeEventListener("click", play);
  });

  playAgainButton.addEventListener("click", resetGame);
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  numMatches = 0;
  const scoreDisplay = document.querySelector("#score-display");
  scoreDisplay.textContent = "";
  const statusDisplay = document.querySelector("#status-head");
  statusDisplay.textContent = "Choose!";
  const moveDisplay = document.querySelector(".move-display");
  moveDisplay.children[0].textContent = "";
  moveDisplay.children[1].textContent = "";
  const playAgainButton = document.querySelector("#play-again-button");
  playAgainButton.style.display = "none";

  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", play);
  });
}

// Add click event listeners to the buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", play);
});

// Call the startGame function when the DOM is ready
document.addEventListener("DOMContentLoaded", startGame);
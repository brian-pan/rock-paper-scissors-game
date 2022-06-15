// query selectors
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const userScore = document.querySelector(".page-score-user");
const botScore = document.querySelector(".page-score-bot");
const next = document.querySelector("#next");
const reset = document.querySelector("#reset");
const message = document.querySelector("#message");

//global variables
let userMove;
let botMove;
let winner;
let msg = "";
const scores = {
  user: 0,
  bot: 0,
};
let currentPage = 1; //record page number/index
let round = 1;

//fetch bot move from API
const fetchResult = async () => {
  try {
    const response = await fetch("https://random.darkjoy.ca/random/GetPick");
    return await response.text();
  } catch (error) {
    console.log("Error:", error);
  }
};
fetchResult().then((data) => {
  botMove = data.toLowerCase();
  console.log("BotMove:", botMove);
});

const navigateToPage = (num) => {
  const nextPage = document.querySelector(`#page-${num}`);
  nextPage.style.display = "flex";
  const current = document.querySelector(`#page-${currentPage}`);
  current.style.display = "none";
  currentPage = num;
};
//button callback function
const onButtonClick = (e) => {
  userMove = e.target.id.toLowerCase();
  winner = getWinner(userMove, botMove);
  updateScore(winner);
  console.log("UserMove:", userMove);
  console.log("winner:", winner);
  console.log("message:", msg);
  console.log(scores);
  console.log("round:", round);
  round++;
  if (round > 3) {
    navigateToPage(3);
  } else {
    navigateToPage(2);
  }
};

//winning conditions
const getWinner = (userMove, botMove) => {
  if (userMove === botMove) {
    return null;
  } else if (botMove === "rock") {
    return userMove === "scissor" ? "bot" : "user";
  } else if (botMove === "paper") {
    return userMove === "rock" ? "bot" : "user";
  } else {
    return userMove === "paper" ? "bot" : "user";
  }
};

const updateScore = (winner) => {
  if (winner === "user") {
    scores.user++;
  } else if (winner === "bot") {
    scores.bot++;
  }
};

const renderMessage = () => {
  if (scores.user > scores.bot) {
    message.innerText = "Congrats! You win.";
  } else if (scores.user < scores.bot) {
    message.innerText = "Sorry. You lose.";
  } else {
    message.innerText = "Tie. Please try again.";
  }
};

const onNextRound = () => {
  fetchResult().then((data) => {
    botMove = data.toLowerCase();
    console.log("BotMove:", botMove);
  });
  navigateToPage(1);
};

const onReset = () => {
  scores.user = 0;
  scores.bot = 0;
  currentPage = 1;
  round = 1;
  msg = "";
  winner = "";
  navigateToPage(1);
};

//button actions/events
rock.addEventListener("click", onButtonClick);
paper.addEventListener("click", onButtonClick);
scissor.addEventListener("click", onButtonClick);
next.addEventListener("click", onNextRound);
reset.addEventListener("click", onReset);

//select buttons
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const userScore = document.querySelector(".page-score-user");
const botScore = document.querySelector(".page-score-bot");
const next = document.querySelector("#next");
const reset = document.querySelector("#reset");

//global vars
let userMove;
let botMove;
let winner;
let msg = "";
const scores = {
  user: 0,
  bot: 0,
};
let counter = 1; //record page number/index

//fetch bot move from API
const fetchResult = async () => {
  try {
    const response = await fetch("https://random.darkjoy.ca/random/GetPick");
    // console.log("response:", response);
    const data = await response.text();
    // console.log("data:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};
fetchResult().then((data) => {
  botMove = data.toLowerCase();
  console.log("BotMove:", botMove);
});

//button callback function
const onButtonClick = (e) => {
  console.log(e.target);
  userMove = e.target.id.toLowerCase();
  winner = getWinner(userMove, botMove);
  renderMsg(winner);
  console.log("UserMove:", userMove);
  console.log("winner:", winner);
  console.log("message:", msg);
  console.log(scores.user);
  console.log(scores.bot);
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

// //scores
// userScore.innerText = scores.user;
// botScore.innerText = scores.bot;

//winning messages
const renderMsg = (winner) => {
  if (winner === "user") {
    msg = "Congrats! You win.";
    scores.user++;
  } else if (winner === "bot") {
    msg = "Sorry. You lose.";
    scores.bot++;
  } else {
    msg = "Tie! Please try again.";
  }
};

const onNextRound = () => {};

const onResetStats = () => {
  scores.user = 0;
  scores.bot = 0;
  counter = 1;
  msg = "";
  winner = null;
};

//button actions/events
rock.addEventListener("click", onButtonClick);
paper.addEventListener("click", onButtonClick);
scissor.addEventListener("click", onButtonClick);
next.addEventListener("click", onNextRound);
reset.addEventListener("click", onResetStats);

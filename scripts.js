// query selectors
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const userScore = document.querySelector("#user-score");
const botScore = document.querySelector("#bot-score");
const userScoreFinal = document.querySelector("#user-score-final");
const botScoreFinal = document.querySelector("#bot-score-final");
const userImage = document.querySelector("#user-image");
const botImage = document.querySelector("#bot-image");
const userWinnerTag = document.querySelector("#winner-user");
const botWinnerTag = document.querySelector("#winner-bot");
const next = document.querySelector("#next");
const reset = document.querySelector("#reset");
const message = document.querySelector("#message");

//global variables
const scores = {
  user: 0,
  bot: 0,
};
let currentPage = 1;
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

window.addEventListener("DOMContentLoaded", () => {
  fetchResult().then((data) => {
    botMove = data.toLowerCase();
  });

  rock.addEventListener("click", onButtonClick);
  paper.addEventListener("click", onButtonClick);
  scissor.addEventListener("click", onButtonClick);
  next.addEventListener("click", onNextRound);
  reset.addEventListener("click", onReset);
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
  const userMove = e.target.id.toLowerCase();
  userImage.src = `./assets/images/${userMove}.png`;
  botImage.src = `./assets/images/${botMove}.png`;
  const winner = getWinner(userMove, botMove);
  updateScore(winner);
  updateWinnerTag(winner);
  round++;
  if (round > 3) {
    renderMessage();
    navigateToPage(3);
  } else {
    navigateToPage(2);
  }
};

const updateWinnerTag = (winner) => {
  userWinnerTag.style.opacity = 0;
  botWinnerTag.style.opacity = 0;
  if (winner) {
    document.querySelector(`#winner-${winner}`).style.opacity = 1;
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
    userScore.innerText = scores.user;
    userScoreFinal.innerText = scores.user;
  } else if (winner === "bot") {
    scores.bot++;
    botScore.innerText = scores.bot;
    botScoreFinal.innerText = scores.bot;
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
  });
  navigateToPage(1);
};

const onReset = () => {
  scores.user = 0;
  scores.bot = 0;
  userScore.innerText = 0;
  botScore.innerText = 0;
  userScoreFinal.innerText = 0;
  botScoreFinal.innerText = 0;
  round = 1;
  navigateToPage(1);
};

//button actions/events

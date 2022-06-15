//select buttons
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");

//global vars
let userMove;
let botMove;
let winner;
let msg = "";
const scores = {
  user: 0,
  bot: 0,
};

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
  userMove = e.target.innerText.toLowerCase();
  winner = getWinner(userMove, botMove);
  renderMsg(winner);
  console.log("UserMove:", userMove);
  console.log("winner:", winner);
  console.log("message:", msg);
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

//winning messages
const renderMsg = (winner) => {
  if (winner === "user") {
    msg = "Congrats! You win.";
  } else if (winner === "bot") {
    msg = "Sorry. You lose.";
  } else {
    msg = "Tie! Please try again.";
  }
};

//button actions/events
rock.addEventListener("click", onButtonClick);
paper.addEventListener("click", onButtonClick);
scissor.addEventListener("click", onButtonClick);

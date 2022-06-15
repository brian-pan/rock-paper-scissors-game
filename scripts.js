//select buttons
const rock = document.querySelector(".main-btn:nth-of-type(1)");
const paper = document.querySelector(".main-btn:nth-of-type(2)");
const scissor = document.querySelector(".main-btn:nth-of-type(3)");

//global vars
let userMove;
let botMove;
let winner;
// let msg = "";

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
  compare(userMove, botMove);
  console.log("UserMove:", userMove);
  console.log("winner:", winner);
  console.log("message:", msg);
};

//winning conditions
const compare = (userMove, botMove) => {
  if (userMove === botMove) {
    fetchResult().then((data) => {
      botMove = data.toLowerCase();
      console.log("second botMove:", botMove);
    });
    msg = "Tie! Please select your next move.";
  } else if (botMove === "rock") {
    userMove === "scissor" ? (winner = "user") : (winner = "bot");
  } else if (botMove === "paper") {
    userMove === "rock" ? (winner = "user") : (winner = "bot");
  } else {
    userMove === "paper" ? (winner = "user") : (winner = "bot");
  }
};

//button actions/events
rock.addEventListener("click", onButtonClick);
paper.addEventListener("click", onButtonClick);
scissor.addEventListener("click", onButtonClick);

//winning messages
// winner === "user" ? (msg = "Congrats! You win.") : (msg = "Sorry. You lose.");

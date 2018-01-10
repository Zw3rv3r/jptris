import {getHighscore, setHighscore} from "./storage";

const scoreElement = document.getElementById("score");
const highscoreElement = document.getElementById("highscore");

let highscore = getHighscore();

export const updateScore = player => {
  scoreElement.innerText = String(player.score);
  highscoreElement.innerText = String(highscore);
  if (player.score > highscore) {
    highscore = player.score;
    setHighscore(highscore);
  }
};

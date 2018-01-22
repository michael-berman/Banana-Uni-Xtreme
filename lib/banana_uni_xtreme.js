const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");
  let audio = document.getElementById("audio");
  audio.muted = true;

  const startGame = e => {
    if (e.keyCode === 32){
      window.removeEventListener("keydown", startGame, false);
      new GameView(ctx).start();
    }
  }

  window.addEventListener("keydown", startGame, false);


  const toggleMusic = (e) => {
    let audio = document.getElementById("audio");
    audio.play();
    if (audio.muted === false) {
      audio.muted = true;
    } else {
      audio.muted = false;
    }
  }

  let soundIcon = document.getElementById("sound-icon");
  soundIcon.addEventListener("click", toggleMusic, false)


});

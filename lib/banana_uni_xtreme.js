const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");
  let audio = document.getElementById("audio-theme");
  audio.muted = true;

  let game = new GameView(ctx);

  const startGame = e => {
    if (e.keyCode === 32){
      window.removeEventListener("keydown", startGame, false);
      game.start();
    }
  }

  window.addEventListener("keydown", startGame, false);

});

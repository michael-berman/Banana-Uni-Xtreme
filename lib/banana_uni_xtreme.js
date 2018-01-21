const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");


  const startGame = e => {
    if (e.keyCode === 32){
      new GameView(ctx).start();
    }
    window.removeEventListener("keydown", startGame, false);
  }

  window.addEventListener("keydown", startGame, false);


});

const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("game-canvas")[0];
  debugger
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});

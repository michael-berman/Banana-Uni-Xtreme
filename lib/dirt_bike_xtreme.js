const Game = require('./game');
const GameView = require('./game_view');
import Matter from 'matter-js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;


  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  window.bike = game.bike;
  window.stop = () => game.bike.vel = [0, 0];
  window.obstacle = game.obstacles.coords[0];
  new GameView(game, ctx).start();
});

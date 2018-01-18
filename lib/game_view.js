const DirtBike = require('./dirt_bike');
const Game = require('./game');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike.bind(this), false);
  }

  moveBike(e){
    let delta;
    switch(e.keyCode){
      case 37: //left key
        delta = [-10, 0];
        break;
      case 39: //right key
        delta = [20, 0];
        break;
      default:
        delta = [0, 0];
        break;
    }
    this.game.step(delta);
  }

  start(){
    this.bindKeyHandlers();

    this.lastTime = 0;
    this.animate();
  }

  animate() {

    const fps = 60;

    const that = this;

    function draw() {
        setTimeout(function() {
            requestAnimationFrame(draw);
            that.game.draw(that.ctx); // TODO: change to game when refactoring
        }, 1000 / fps);
    }

    draw();

  }
}

module.exports = GameView;

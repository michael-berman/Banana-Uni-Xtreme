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
    let impulse;
    switch(e.keyCode){
      case 40: //down key
        impulse = [-0.05, 0];
        break;
      case 38: //top key
        impulse = [0.05, 0];
        break;
      default:
        impulse = [0, 0];
        break;
    }
    this.game.bike.accel(impulse);
  }

  start(){
    this.bindKeyHandlers();

    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));

  }
}

module.exports = GameView;

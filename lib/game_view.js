const DirtBike = require('./dirt_bike');
const Game = require('./game');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }

  start(){
    this.game.bindKeyHandlers();

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

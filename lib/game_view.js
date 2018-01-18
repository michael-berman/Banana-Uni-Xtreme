const DirtBike = require('./dirt_bike');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.bike = new DirtBike(this.ctx);
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike.bind(this), false);
  }

  moveBike(e){
    let delta;
    switch(e.keyCode){
      case 37: //left key
        delta = -10;
        break;
      case 39: //right key
        delta = 10;
        break;
      default:
        delta = 0;
        break;
    }
    this.bike.move(delta);
  }

  start(){
    this.bindKeyHandlers();
    //this.bike.draw(this.ctx);

    this.animate();
  }

  animate() {
    // this.game.step(timeDelta); step with velocity not time

    this.bike.draw();

    requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = GameView;

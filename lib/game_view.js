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
        delta = -30;
        break;
      case 39: //right key
        delta = 30;
        break;
      default:
        delta = 0;
        break;
    }
    this.bike.move(delta);
  }

  start(){
    this.bindKeyHandlers();

    this.lastTime = 0;
    this.animate();
  }

  animate() {

    // requestAnimationFrame(this.animate.bind(this));
    // this.bike.draw();

    const fps = 60;

    const that = this;

    function draw() {
        setTimeout(function() {
            requestAnimationFrame(draw);
            that.bike.draw();
        }, 1000 / fps);
    }

    draw();

  }
}

module.exports = GameView;

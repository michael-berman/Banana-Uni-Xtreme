const DirtBike = require('./dirt_bike');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    const options = { posX: 0, posY: 0, ctx: this.ctx };
    this.bike = new DirtBike(options);
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike, false);
  }

  moveBike(){
    debugger
    switch(e.keyCode){
      case 37: //left key
        this.posX -= 10;
      case 39: //right key
        this.posX += 10;
    }
    this.bike.move()
  }

  start(){
    this.bindKeyHandlers();
    this.bike.drawBike();
  }

}

module.exports = GameView;

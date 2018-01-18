const DirtBike = require('./dirt_bike');

class Game {
  constructor(){
    this.bike = new DirtBike();
  }

  draw(ctx){
    this.bike.draw(ctx);
    // TODO: draw out all obstacle too
  }

  step(delta){
    this.bike.move(delta);
    // TODO: need to step the whole view and game and reduce position
    // of all obstacles as well
  }

}


module.exports = Game;

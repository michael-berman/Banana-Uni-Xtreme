const DirtBike = require('./dirt_bike');

class Game {
  constructor(){
    this.bike = new DirtBike();
    this.obstacles = [] // TODO: have all obstacles in here
  }

  // TODO: have a collection of all obstacles and reduce by each step

  draw(ctx){
    this.bike.draw(ctx);
    // TODO: draw out all obstacle too
  }

  step(delta){
    this.bike.move(delta);
    // TODO: need to step the whole view and game and reduce position
    // of all obstacles as well and invoke check collisions
  }


  // checkCollisions(){
    // TODO: check for collisions with obstacles
  // }

}


module.exports = Game;

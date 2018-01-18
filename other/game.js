const DirtBike = require('./dirt_bike');
const Level1Obstacle = require('./level_1_obstacle');
const DistanceUtil = require('./distance_util');

class Game {
  constructor(){
    let bikeCoords = [50, 290]
    this.bike = new DirtBike(bikeCoords);
    this.obstacles = new Level1Obstacle();
    // this.obstacles = [] // TODO: have all obstacles in here
  }

  allObstacles(){
    // TODO: have a collection of all obstacles and reduce by each step
  }

  draw(ctx){
    ctx.clearRect(0, 0, 500, 500);
    this.bike.draw(ctx);
    this.obstacles.draw(ctx);
  }

  step(delta){
    if (this.checkCollision()) {
      debugger
    } else {
      this.bike.move(delta);
      this.obstacles.move(this.bike.offsetX);
    }
    // TODO: need to step the whole view and game and reduce position
    // of all obstacles as well and invoke check collisions
  }

  checkCollision(){
    let bikePos = this.bike.pos[0];
    let obstaclePos = this.obstacles.coords[0]
    if (bikePos + 50 > obstaclePos.startX && bikePos + 50 < obstaclePos.endX){
      this.rotation = Math.atan()
      return true;
    }
    return false;
  }

}


module.exports = Game;

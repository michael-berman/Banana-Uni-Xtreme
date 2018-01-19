const DirtBike = require('./dirt_bike');
const Level1Obstacle = require('./level_1_obstacle');
const DistanceUtil = require('./distance_util');

class Game {
  constructor(){
    let bikeCoords = [50, 185]
    this.bike = new DirtBike(bikeCoords);
    this.obstacles = new Level1Obstacle();
    this.enterCollision = false;
    this.frames = 0;
    // this.obstacles = [] // TODO: have all obstacles in here
  }

  allObstacles(){
    // TODO: have a collection of all obstacles and reduce by each step
  }

  draw(ctx){
    this.frames += 1;
    ctx.clearRect(0, 0, 700, 500);
    this.bike.draw(ctx, this.frames);
    this.obstacles.draw(ctx);
  }

  step(delta){
    let bikePos = this.bike.pos[0];
    let obstaclePos = this.obstacles.coords[0];
    let degrees = this.obstacles.coords[0].degrees;
    let xDistance = obstaclePos.startX - bikePos;
    if (this.checkCollision(bikePos, obstaclePos)) {
      let offsetX = xDistance * Math.cos(degrees) > 0 ?
        xDistance * Math.cos(degrees) * 0.5 : 0;
      let offsetY = xDistance * Math.sin(degrees) + obstaclePos.offset;
      this.bike.shift(offsetY);
      this.bike.move(delta * Math.cos(degrees));
      this.obstacles.move(offsetX);
    } else {
      this.lowerBike();
      this.bike.move(delta);
      this.obstacles.move(this.bike.offsetX);
    }
    // TODO: need to step the whole view and game and reduce position
    // of all obstacles as well and invoke check collisions
  }

  lowerBike(){
    if (this.bike.pos[1] < 185){
      this.bike.dipDown();
    }
  }

  checkCollision(bikePos, obstaclePos){
    if (bikePos + 60 > obstaclePos.startX && bikePos + 100 < obstaclePos.endX){
      return true;
    }
    return false;
  }

}


module.exports = Game;

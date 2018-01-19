const DirtBike = require('./dirt_bike');
const Level1Obstacle = require('./level_1_obstacle');
const DistanceUtil = require('./distance_util');

class Game {
  constructor(){
    let bikeCoords = [50, 185]
    this.bike = new DirtBike(bikeCoords);
    this.obstacles = new Level1Obstacle();
    this.currentObstacle = null;
    this.frames = 0;
  }

  draw(ctx){
    this.frames += 1;
    ctx.clearRect(0, 0, 700, 500);
    this.bike.draw(ctx, this.frames);
    this.obstacles.draw(ctx);
  }

  step(delta){
    this.currentObstacle = null;
    this.checkCollisions()
    if (this.currentObstacle) {
      let degrees = this.currentObstacle.degrees;
      let xDistance = this.currentObstacle.startX - this.bike.pos[0];
      let offsetX = xDistance * Math.cos(degrees) > 0 ?
        xDistance * Math.cos(degrees) * 0.5 : 0;
      let offsetY = xDistance * Math.sin(degrees)
                      + this.currentObstacle.offset;
      this.bike.shift(offsetY);
      this.bike.move(delta * Math.cos(degrees));
      this.obstacles.move(offsetX);
    } else {
      this.currentObstacle = null;
      this.lowerBike();
      this.bike.move(delta);
      this.obstacles.move(this.bike.offsetX);
    }
  }

  lowerBike(){
    if (!Boolean(this.currentObstacle)){
      debugger
      this.bike.dipDown();
    }
  }

  checkCollisions(){
    let bikePos = this.bike.pos[0];
    this.obstacles.coords.forEach( obstacle => {
      if (this.checkCollision(bikePos, obstacle)){
        debugger
        this.currentObstacle = obstacle;
      }
    })
  }


  checkCollision(bikePos, obstaclePos){
    if (bikePos + 80 > obstaclePos.startX && bikePos + 50 < obstaclePos.endX){
      return true;
    }
    return false;
  }

}


module.exports = Game;

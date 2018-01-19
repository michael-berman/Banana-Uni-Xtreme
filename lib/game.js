const Unicycle = require('./unicycle');
const Level1Obstacle = require('./level_1_obstacle');
const DistanceUtil = require('./distance_util');

class Game {
  constructor(){
    let bikeCoords = [50, 185]
    this.bike = new Unicycle(bikeCoords);
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

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike.bind(this), false);
  }

  moveBike(e){
    let impulse;
    switch(e.keyCode){
      case 40: //down key
        impulse = [-0.1, 0];
        break;
      case 38: //top key
        impulse = [0.05, 0];
        break;
      default:
        impulse = [0, 0];
        break;
    }
    this.accelBike(impulse);
  }

  accelBike(impulse){
    if(this.currentObstacle){
      impulse[0] = impulse[0] * Math.cos(this.currentObstacle.degrees);
      this.bike.accel(impulse)
    } else {
      this.bike.accel(impulse);
    }

  }

  step(delta){
    this.currentObstacle = null;
    this.checkCollisions()
    if (this.currentObstacle) {
      let degrees = this.currentObstacle.degrees;
      let xDistance = this.currentObstacle.startX - this.bike.pos[0];
      // let offsetX = xDistance * Math.cos(degrees) > 0 ?
      //   xDistance * Math.cos(degrees) : 0;
      let offsetY = xDistance * Math.sin(degrees)
                      + this.currentObstacle.offset;
      this.bike.shift(offsetY);
      this.bike.move(delta * Math.cos(degrees));
      // debugger
      // let offsetX = this.bike.offsetX * Math.cos(degrees);
      this.obstacles.move(this.bike.offsetX);
    } else {
      this.currentObstacle = null;
      this.lowerBike();
      this.bike.move(delta);
      this.obstacles.move(this.bike.offsetX);
    }
  }

  lowerBike(){
    if (!Boolean(this.currentObstacle)){
      this.bike.dipDown();
    }
  }

  checkCollisions(){
    let bikePos = this.bike.pos[0];
    this.obstacles.coords.forEach( obstacle => {
      if (this.checkCollision(bikePos, obstacle)){
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

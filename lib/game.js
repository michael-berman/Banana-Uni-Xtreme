const Unicycle = require('./unicycle');
const Level1Obstacle = require('./level_1_obstacle');
const DistanceUtil = require('./distance_util');

class Game {
  constructor(){
    let uniCoords = [50, 185]
    this.unicycle = new Unicycle(uniCoords);
    this.obstacles = new Level1Obstacle();
    this.currentObstacle = null;
    this.frames = 0;
  }

  draw(ctx){
    this.frames += 1;
    ctx.clearRect(0, 0, 700, 500);
    this.unicycle.draw(ctx, this.frames);
    this.obstacles.draw(ctx, this.frames);
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike.bind(this), false);
  }

  moveBike(e){
    let impulse;
    switch(e.keyCode){
      case 37: //down key
        impulse = [-0.5, 0];
        break;
      case 39: //top key
        impulse = [0.2, 0];
        break;
      case 38:
        break;
      default:
        impulse = [0, 0];
        break;
    }
    if (impulse){
      this.accelUnicycle(impulse);
    } else {
      this.unicycle.jumpUnicycle()
    }
  }

  accelUnicycle(impulse){
    if(this.currentObstacle){
      impulse[0] = impulse[0] * Math.cos(this.currentObstacle.degrees) * 0.8;
      this.unicycle.accel(impulse)
    } else {
      this.unicycle.accel(impulse);
    }

  }

  step(delta){
    this.currentObstacle = null;
    this.checkCollisions()
    if (this.currentObstacle) {
      let degrees = this.currentObstacle.degrees;
      let xDistance = this.currentObstacle.startX - this.unicycle.pos[0];
      // let offsetX = xDistance * Math.cos(degrees) > 0 ?
      //   xDistance * Math.cos(degrees) : 0;
      let offsetY = xDistance * Math.sin(degrees)
                      + this.currentObstacle.offset;
      this.unicycle.shift(offsetY);
      this.unicycle.move(delta * Math.cos(degrees));
      // debugger
      // let offsetX = this.unicycle.offsetX * Math.cos(degrees);
      this.obstacles.move(this.unicycle.offsetX);
    } else {
      this.currentObstacle = null;
      this.lowerBike();
      this.unicycle.move(delta);
      this.obstacles.move(this.unicycle.offsetX);
    }
  }

  lowerBike(){
    if (!Boolean(this.currentObstacle)){
      this.unicycle.dipDown();
    }
  }

  checkCollisions(){
    let bikePos = this.unicycle.pos[0];
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

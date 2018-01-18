const DirtBike = require('./dirt_bike');
const Level1Obstacle = require('./level_1_obstacle');

class Game {
  constructor(){
    this.bike = new DirtBike();
    this.obstacles = new Level1Obstacle();
    // this.obstacles = [] // TODO: have all obstacles in here
  }

  allObstacles(){
    // TODO: have a collection of all obstacles and reduce by each step
  }

  draw(ctx){
    ctx.clearRect(0, 0, 500, 500);
    this.bike.draw(ctx);
    this.drawFloor(ctx);
    this.obstacles.drawObstacles(ctx);
    // TODO: draw out all obstacle too
  }

  drawFloor(ctx){
    ctx.beginPath();
    ctx.rect(0, 330, 500, 210);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
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

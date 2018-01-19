const Level1ObstacleArr =
  require('./obstacles_scripts/level_1_obstacles_script');

class Level1Obstacle{
  constructor(){
    this.coords = Level1ObstacleArr.generateScript();
    debugger
    this.offset = 0;
    this.groundPos = [0, 330]
  }

  draw(ctx){
    this.drawFloor(ctx);
    this.drawObstacles(ctx);
  }

  drawFloor(ctx){
    ctx.beginPath();
    ctx.rect(this.groundPos[0], this.groundPos[1], 700, 250);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawObstacles(ctx){
    // TODO: draw each one and have a generator
    ctx.beginPath();
    ctx.moveTo(this.coords[0].startX - this.offset, this.groundPos[1]);
    ctx.lineTo(this.coords[0].endX - this.offset, this.coords[0].endY);
    ctx.lineTo(this.coords[0].endX - this.offset, this.groundPos[1]);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  move(offset){
    this.offset += offset * NORMAL_FRAME_TIME_DELTA;
    this.coords.forEach((coord) => {
      coord.startX -= this.offset;
      coord.endX -= this.offset;
    })
  }
}

module.exports = Level1Obstacle;

const NORMAL_FRAME_TIME_DELTA = 60 / 1000;

class Level1Obstacle{
  constructor(){
    // this.obstacles = []
    this.offset = 0;
  }

  drawObstacles(ctx){
    ctx.beginPath();
    ctx.moveTo(100, 330);
    ctx.lineTo(250, 280);
    ctx.lineTo(250, 330);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

module.exports = Level1Obstacle;

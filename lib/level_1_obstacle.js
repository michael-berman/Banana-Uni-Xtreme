class Level1Obstacle{
  constructor(){
    this.coords = [];
    this.offset = 0;
    this.groundPos = [0, 330]
  }

  draw(ctx){
    this.drawFloor(ctx);
    this.drawObstacles(ctx);
  }

  drawFloor(ctx){
    ctx.beginPath();
    ctx.rect(this.groundPos[0], this.groundPos[1], 500, 210);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawObstacles(ctx){
    // TODO: only one obstacle for now
    let coords = {startX: 300, endX: 450, endY: 300}
    this.coords.push(coords);
    ctx.beginPath();
    ctx.moveTo(coords.startX - this.offset, this.groundPos[1]);
    ctx.lineTo(coords.endX - this.offset, coords.endY);
    ctx.lineTo(coords.endX - this.offset, this.groundPos[1]);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  move(offset){
    this.offset += offset * NORMAL_FRAME_TIME_DELTA;
  }
}

module.exports = Level1Obstacle;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

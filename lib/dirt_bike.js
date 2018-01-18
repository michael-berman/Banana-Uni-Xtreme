const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(ctx){
    this.posX = 10;
    this.posY = 200;
    this.ctx = ctx;
  }

  draw(){
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.beginPath();
    this.ctx.rect(this.posX,this.posY,150 ,100);
    this.ctx.stroke();
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    //this.ctx.clearRect(0, 0, 500, 500)
  }

  move(delta){
    this.posX += delta;
  }

}

module.exports = DirtBike;

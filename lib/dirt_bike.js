const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(options){
    this.posX = options.posX;
    this.posY = options.posY;
    this.ctx = options.ctx;
  }

  drawBike(){
    this.ctx.rect(this.posX, this.posY, 150, 100);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
  }


}

module.exports = DirtBike;

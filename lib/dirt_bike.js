const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(){
    this.pos = [10, 200];
    this.vel = [0, 0];
  }

  draw(ctx){
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1], 150 ,100);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }

  move(delta){
    this.pos[0] += delta[0];
    this.pos[1] += delta[1];
  }

  // TODO: accelerator
  // power(impulse) {
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  // }

}

module.exports = DirtBike;

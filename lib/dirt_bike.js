const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(){
    this.pos = [10, 240];
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

  move(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let offsetX = this.vel[0] * velocityScale;
    let offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }

  accel(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;

const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(){
    this.pos = [10, 240];
    this.vel = [0, 0];
  }

  draw(ctx){
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1], 50 , 50);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }

  move(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.offsetX = this.vel[0] * velocityScale;
    this.offsetY = this.vel[1] * velocityScale;

    // TODO: use these offsets to have background moving

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }

  accel(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.checkVelocities();
  }

  checkVelocities(){
    switch (this.vel) {
      case this.vel[0] > 0.3:
        this.vel[0] = 0.3;
        break;
      case this.vel[0] < -0.2:
        this.vel[0] = -0.2;
        break;
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;

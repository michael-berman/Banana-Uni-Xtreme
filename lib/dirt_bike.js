const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(coords){
    this.pos = [coords[0], coords[1]];
    this.vel = [0, 0];
  }

  draw(ctx){
    // ctx.clearRect(0, 0, 500, 500);
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }

  move(timeDelta, offsetY = 0){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.offsetX = this.vel[0] * velocityScale;
    this.offsetY = offsetY;

    // TODO: use these offsets to have background moving

    this.pos = [this.pos[0] + this.offsetX, this.pos[1] + this.offsetY];
  }

  stop(){
    this.vel = [0, 0];
  }

  rotate(degrees){

  }

  accel(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.checkVelocities();
  }

  checkVelocities(){
    switch (this.vel) {
      case this.vel[0] > 0.2:
        this.vel[0] = 0.2;
        break;
      case this.vel[0] < -0.1:
        this.vel[0] = -0.1;
        break;
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;

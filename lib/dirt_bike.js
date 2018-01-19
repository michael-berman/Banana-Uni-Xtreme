const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(coords){
    this.pos = [coords[0], coords[1]];
    this.vel = [0, 0];
  }

  draw(ctx){
    const unicycle = new Image();
    unicycle.src = './assets/bananas.png';
    ctx.drawImage(unicycle, this.pos[0], this.pos[1], 250, 200);
    // ctx.clearRect(0, 0, 700, 500);
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], 40, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fill();
    // ctx.fillStyle = "blue";
    // ctx.fill();
  }

  move(timeDelta, offsetY = 0){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.offsetX = this.vel[0] * velocityScale;
    this.pos = [this.pos[0] + this.offsetX, this.pos[1]];
  }

  shift(offsetY){
    this.pos = [this.pos[0], 1020 + offsetY - 3];
  }

  dipDown(){
    this.pos[1] += 60 / NORMAL_FRAME_TIME_DELTA;
  }

  accel(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.checkVelocities();
  }

  checkVelocities(){
    switch (this.vel) {
      case this.vel[0] > 0.10:
        this.vel[0] = 0.1;
        break;
      case this.vel[0] < -0.05:
        this.vel[0] = -0.05;
        break;
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;

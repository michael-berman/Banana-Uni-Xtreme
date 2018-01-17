const DistanceUtil = require('./distance_util');

class DirtBike {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
  }

  collideWithObstacle(){
    // TODO: need physics logic
  }

  draw(ctx){
    // TODO: Draw out bike
  }

  move(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    offsetX = this.vel[0] * velocityScale;
    offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }


}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;

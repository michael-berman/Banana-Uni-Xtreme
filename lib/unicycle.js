const DistanceUtil = require('./distance_util');

class Unicycle {
  constructor(coords){
    this.pos = [coords[0], coords[1]];
    this.vel = [0, 0];
    this.spritesCoords = [25, 265, 515, 773]
    this.spritePos = 0
  }

  draw(ctx, frames){
    this.changeSpritePos(frames);
    const unicycle = new Image();
    unicycle.src = './assets/bananas_sprite.png';
    ctx.drawImage(unicycle, this.spritesCoords[this.spritePos], 0,
                    250, 360, this.pos[0],
                    this.pos[1], 150, 150
                  );
  }

  changeSpritePos(frames){
    frames = Math.abs(frames % 32);
    if (frames < 8 || this.vel[0] == 0){
      this.spritePos = 0;
    } else if (frames < 16){
      this.spritePos = 1;
    } else if (frames < 24){
      this.spritePos = 2;
    } else {
      this.spritePos = 3;
    }
  }

  move(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.offsetX = this.vel[0] * velocityScale;
    let offsetY = this.vel[1] * velocityScale;

    // if (this.vel[1] < 0 && this.pos[1] < 185 ){
    //   this.vel[1] += 0.1;
    //   debugger
    // }
    // this.pos[1] = this.pos[1] + offsetY
  }

  shift(offsetY){
    this.pos = [this.pos[0], 160 + offsetY];
  }

  dipDown(){
    if (this.pos[1] < 185 ){
      this.pos[1] += 20 / NORMAL_FRAME_TIME_DELTA;
    }
  }

  accel(impulse) {
    if (this.vel[0] < 1 || this.vel[0] > 0){
      this.vel[0] += impulse[0];
    }
  }

  jumpUnicycle(){

    if (this.pos[1] > 180){
      this.pos[1] -= 150;
    }

    // if (this.vel[1] == 0){
    //   debugger
    // this.vel[1] -= 0.5;
    // }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Unicycle;

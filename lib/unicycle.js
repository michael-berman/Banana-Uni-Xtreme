class Unicycle {
  constructor(coords){
    this.pos = [coords[0], coords[1]];
    this.vel = [0, 0];
    this.spritesCoords = [13, 265, 515, 773]
    this.spritePos = 0;
    this.maxSpeed = 1.2;
  }

  draw(ctx, frames){
    this.changeSpritePos(frames);
    const unicycle = new Image();
    unicycle.src = 'https://i.imgur.com/NqklI3w.png';
    ctx.drawImage(unicycle, this.spritesCoords[this.spritePos], 0,
                    250, 360, this.pos[0],
                    this.pos[1], 150, 150
                  );
  }

  changeSpritePos(frames){
    if (this.vel[0] !== 0){
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
  }

  move(timeDelta){
    if (this.vel[0] == this.maxSpeed){
      this.offsetX = 0;
    } else {
      const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      this.offsetX = this.vel[0] * velocityScale;
    }
    let offsetY = this.vel[1] * 5;


    if (this.vel[1] < 0 && this.pos[1] < 183 ){
      this.vel[1] += 0.1;
    } else if (this.pos[1] < 183){
      this.vel[1] = 0;
    }

    this.pos[1] = this.pos[1] + offsetY
  }

  shift(offsetY){
    this.pos = [this.pos[0], 160 + offsetY];
  }

  dipDown(){
    if (this.pos[1] < 265 && this.vel[1] === 0){
      this.pos[1] += 60 / NORMAL_FRAME_TIME_DELTA;
    }
  }

  accel(impulse) {
    if (this.vel[0] < this.maxSpeed || this.vel[0] > 0){
      this.vel[0] += impulse[0];
    }
  }

  jumpUnicycle(gameMuted){

    if (this.vel[1] == 0 && this.pos[1] > 250 ){
      this.vel[1] -= 1.4
      this.toggleJumpNoise(gameMuted);
    }
  }

  toggleJumpNoise(gameMuted){
    if (!gameMuted){
      let jumpSound = document.getElementById("jump-sound");
      jumpSound.play();
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Unicycle;

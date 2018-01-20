const Level1ObstacleArr =
  require('./obstacles_scripts/level_1_obstacles_script');

class Level1Obstacle{
  constructor(){
    this.coords = Level1ObstacleArr.generateScript();
    this.offset = 0;
    this.groundPos = [0, 330];
    this.spritesCoords = [0, 250, 515, 800, 1050,
                          1330, 1627, 1927, 2250, 2550];
    this.spritePos = [400, 4200]; // 110000 normal position
    this.spriteFrame = 0;
    this.fruitBowlPos = 5200;
  }

  draw(ctx, frames){
    this.drawFloor(ctx);
    this.drawObstacles(ctx);
    this.drawMonkeys(ctx, frames);
    this.drawFruitBowl(ctx);
  }

  drawFloor(ctx){
    ctx.beginPath();
    ctx.rect(this.groundPos[0], this.groundPos[1], 700, 250);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawObstacles(ctx){
    this.coords.forEach( coords => {
      ctx.beginPath();
      ctx.moveTo(coords.startX - this.offset, this.groundPos[1]);
      ctx.lineTo(coords.endX - this.offset, coords.endY);
      ctx.lineTo(coords.endX - this.offset, this.groundPos[1]);
      ctx.fillStyle = "black";
      ctx.fill();
      }
    )
  }

  drawMonkeys(ctx, frames){
    this.spritePos.forEach( monkeyPosX => {
      this.changeSpritePos(frames);
      const monkey = new Image();
      monkey.src = './assets/monkey_sprite.png';
      ctx.drawImage(monkey, this.spritesCoords[this.spriteFrame], 0,
        250, 360, monkeyPosX,
        230, 150, 150
      );
    })
  }

  changeSpritePos(frames){
    frames = Math.abs(frames % 100);
    this.spriteFrame = Math.floor(frames / 10);
  }

  drawFruitBowl(ctx){
    const fruitBowl = new Image();
    fruitBowl.src = './assets/fruit-bowl.png';
    ctx.drawImage(fruitBowl, this.fruitBowlPos, 48, 350, 350);
  }

  move(offset){
    this.offset = offset //* NORMAL_FRAME_TIME_DELTA;
    this.moveRamps();
    this.moveMonkeys();
    this.moveFruitBowl();
  }

  moveRamps(){
    this.coords.forEach((coord) => {
      coord.startX -= this.offset;
      coord.endX -= this.offset;
    })
  }

  moveMonkeys(){
    let pos;

    pos = this.spritePos.map( monkeyPosX => {
      return monkeyPosX -= this.offset
    })
    this.spritePos = pos;
  }

  moveFruitBowl(){
    this.fruitBowlPos -= this.offset;
  }


}

module.exports = Level1Obstacle;

const NORMAL_FRAME_TIME_DELTA = 60 / 1000;

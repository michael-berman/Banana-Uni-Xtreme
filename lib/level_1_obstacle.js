const Level1ObstacleArr =
  require('./obstacles_scripts/level_1_obstacles_script');
const SkyMonkeyPos = require('./obstacles_scripts/sky_monkey');
const Coords = require('./obstacles_scripts/generate_positions.js');

class Level1Obstacle{
  constructor(){
    this.coords = Level1ObstacleArr.generateScript();
    this.offset = 0;
    this.groundPos = [0, 415];
    this.spritesCoords = [0, 250, 515, 800, 1050,
                          1330, 1627, 1927, 2250, 2550];
    this.spritePos = [null, null, null]; // 3000 6500 11000
    this.spriteFrame = 0;
    this.fruitBowlPos = 14500; // 12000
    this.skyFrame = 0;
    this.skyMonkeyPos = SkyMonkeyPos.generateSkyPos();
    this.skyMonkeyPosX = [null, null, null]; //450 4500 8500
    this.endGame = false;
    this.generatedCoords = Coords.generateCoords();
    this.generateObstacleCoords();
  }

  generateObstacleCoords(){
    this.coords.forEach( coord => {
      coord.startX = this.generatedCoords[0];
      coord.endX = coord.startX + coord.width;
      this.generatedCoords.shift();
    })

    this.spritePos.map( (coord,idx) => {
      this.spritePos[idx] = this.generatedCoords[0];
      this.generatedCoords.shift();
    })

    this.skyMonkeyPosX.map( (coord, idx) => {
      this.skyMonkeyPosX[idx] = this.generatedCoords[0];
      this.generatedCoords.shift();
    })

  }

  draw(ctx, frames){
    this.drawObstacles(ctx);
    this.drawGroundMonkeys(ctx, frames);
    this.drawSkyMonkey(ctx, frames);
    this.drawFruitBowl(ctx);
  }

  drawObstacles(ctx){
    this.coords.forEach( coords => {
      ctx.beginPath();
      ctx.moveTo(coords.startX - this.offset, this.groundPos[1]);
      ctx.lineTo(coords.endX - this.offset, coords.endY);
      ctx.lineTo(coords.endX - this.offset, this.groundPos[1]);
      ctx.fillStyle = "#72300F";
      ctx.fill();
      }
    )
  }

  drawGroundMonkeys(ctx, frames){
    this.spritePos.forEach( monkeyPosX => {
      this.changeMonkeySpritePos(frames);
      const groundMonkey = new Image();
      groundMonkey.src = 'https://i.imgur.com/9ipr3dx.png';
      ctx.drawImage(groundMonkey, this.spritesCoords[this.spriteFrame], 0,
        250, 360, monkeyPosX,
        310, 150, 150
      );
    })
  }

  drawSkyMonkey(ctx, frames){
    this.skyMonkeyPosX.forEach( skyMonkeyPosX => {
      this.changeSkySpritePos(frames);
      const skyMonkey = new Image();
      skyMonkey.src = './assets/sky_monkey_sprite.png';
      let skyMonkeyPos = this.skyMonkeyPos[this.skyFrame]
      ctx.drawImage(skyMonkey, skyMonkeyPos.startX, skyMonkeyPos.startY,
        skyMonkeyPos.width, skyMonkeyPos.height, skyMonkeyPosX, 80, 150, 150
      );
    })
  }

  changeSkySpritePos(frames){
    frames = Math.abs(frames % 230);
    this.skyFrame = Math.floor(frames / 10);
    // console.log(this.skyFrame)
  }

  changeMonkeySpritePos(frames){
    frames = Math.abs(frames % 100);
    this.spriteFrame = Math.floor(frames / 10);
  }

  drawFruitBowl(ctx){
    const fruitBowl = new Image();
    fruitBowl.src = './assets/fruit-bowl.png';
    ctx.drawImage(fruitBowl, this.fruitBowlPos, 130, 350, 350);
  }

  move(offset){
    // if (this.fruitBowlPos > 350){
    //   this.offset = 0;
    //   this.endGame = true;
    // } else {
      this.offset = offset;
    // }
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

    let skyPos;

    skyPos = this.skyMonkeyPosX.map( monkeyPosX => {
      return monkeyPosX -= this.offset
    })
    this.skyMonkeyPosX = skyPos;
  }

  moveFruitBowl(){
    this.fruitBowlPos -= this.offset;
  }

}

module.exports = Level1Obstacle;

const NORMAL_FRAME_TIME_DELTA = 60 / 1000;

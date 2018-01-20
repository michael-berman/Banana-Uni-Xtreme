const Unicycle = require('./unicycle');
const Level1Obstacle = require('./level_1_obstacle');

class Game {
  constructor(){
    let uniCoords = [50, 265]
    this.unicycle = new Unicycle(uniCoords);
    this.obstacles = new Level1Obstacle();
    this.currentObstacle = null;
    this.frames = 0;
    this.gameOver = false;
    this.shouldRestartGame = false;
  }

  draw(ctx){
    this.frames += 1;
    ctx.clearRect(0, 0, 700, 500);
    this.unicycle.draw(ctx, this.frames);
    this.obstacles.draw(ctx, this.frames);
    this.renderTimer();
  }

  renderTimer(){
    let scoreboard = document.getElementById("game-score");
    let scoreSheet;
    if (this.gameOver){
      scoreSheet = "You didn't get to the fruit bowl!"
    } else {
      scoreSheet = `Time: ${Math.floor(this.frames / 60)}`
    }
    scoreboard.innerHTML = scoreSheet;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveUnicycle.bind(this), false);
  }

  moveUnicycle(e){
    let impulse;
    let jump;
    let restart;
    switch(e.keyCode){
      case 37: //down key
        impulse = [-0.5, 0];
        break;
      case 39: //top key
        impulse = [0.2, 0];
        break;
      case 32:
        jump = true;
        break;
      case 82:
        restart = true;
        break;
      default:
        impulse = [0, 0];
        break;
    }
    if (impulse){
      this.accelUnicycle(impulse);
    } else if (jump) {
      this.unicycle.jumpUnicycle()
    } else if (restart){
      // TODO: restart game
      this.restartGame();
    }
  }

  restartGame(){
    if (this.gameOver){
      this.shouldRestartGame = true;
      let gameOverModal = document.getElementById("game-over");
      let scoreboard = document.querySelector(".game-scoreboard");
      scoreboard.className = " game-scoreboard";
      gameOverModal.innerHTML = ""
    }
  }

  accelUnicycle(impulse){
    if(this.currentObstacle){
      impulse[0] = impulse[0] * Math.cos(this.currentObstacle.degrees) * 0.8;
      this.unicycle.accel(impulse)
    } else {
      this.unicycle.accel(impulse);
    }

  }

  step(delta){
    this.currentObstacle = null;
    this.checkCollisions()
    if (this.currentObstacle) {
      let degrees = this.currentObstacle.degrees;
      let xDistance = this.currentObstacle.startX - this.unicycle.pos[0];
      let offsetY = xDistance * Math.sin(degrees)
                      + this.currentObstacle.offset;
      this.unicycle.shift(offsetY);
      this.unicycle.move(delta * Math.cos(degrees));
      this.obstacles.move(this.unicycle.offsetX);
    } else {
      this.currentObstacle = null;
      this.lowerBike();
      this.unicycle.move(delta);
      this.obstacles.move(this.unicycle.offsetX);
    }
  }

  lowerBike(){
    if (!Boolean(this.currentObstacle)){
      this.unicycle.dipDown();
    }
  }

  checkCollisions(){
    let bikePos = this.unicycle.pos[0];
    this.obstacles.coords.forEach( obstacle => {
      if (this.checkCollision(bikePos, obstacle)){
        this.currentObstacle = obstacle;
      }
    })

    // if (this.checkMonkeysCollision()){
    //   this.renderGameOver();
    //   this.stopGame();
    // }

    if (this.checkFruitBowlCollision()){

    }

  }

  checkFruitBowlCollision(){
    if (this.obstacles.fruitBowlPos < -45){
      debugger
    }
  }

  stopGame(){
    this.gameOver = true;
  }

  renderGameOver(){
    let gameOverModal = document.getElementById("game-over");
    let scoreboard = document.querySelector(".game-scoreboard");
    scoreboard.className += " game-scoreboard-gameover";
    gameOverModal.innerHTML = "Game over! Press r to restart"
  }

  checkMonkeysCollision(){
    let monkeyPos = this.obstacles.spritePos;
    let unicyclePos = this.unicycle.pos;
    let hitMonkey;
    monkeyPos.forEach( monkeyPosX => {
      if (monkeyPosX < unicyclePos[0] + 105
        && monkeyPosX + 100 > unicyclePos[0]
        && 95 < unicyclePos[1]){ //monkeyPos[1] - 130
          hitMonkey = true;
      }
    })
    if (hitMonkey){
      return true;
    } else {
      return false;
    }
  }

  checkCollision(bikePos, obstaclePos){
    if (bikePos + 80 > obstaclePos.startX && bikePos + 50 < obstaclePos.endX){
      return true;
    }
    return false;
  }

}


module.exports = Game;

const Unicycle = require('./unicycle');
const Level1Obstacle = require('./level_1_obstacle');

class Game {
  constructor(){
    let uniCoords = [50, 180]
    this.unicycle = new Unicycle(uniCoords);
    this.obstacles = new Level1Obstacle();
    this.currentObstacle = null;
    this.frames = 0;
    this.gameOver = false;
    this.shouldRestartGame = false;
    this.gameWon = false;
    this.gameMuted = true;
    this.gamePaused = false;
  }

  draw(ctx){
    if (!this.gamePaused) {}
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
      scoreSheet = ""
    } else if (this.gameWon) {
      scoreSheet = `Your time is ${Math.floor(this.frames / 60)}!`
    } else {
      scoreSheet = `Time: ${Math.floor(this.frames / 60)}`
    }
    scoreboard.innerHTML = scoreSheet;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.bindKeys.bind(this), false);
  }

  bindKeys(e){
    let impulse;
    let jump;
    let restart;
    let toggleSound;
    let pauseGame;
    switch(e.keyCode){
      case 37: //down key
        impulse = [-0.5, 0];
        break;
      case 39: //top key
        impulse = [0.2, 0];
        break;
      case 32: //spacebar
        jump = true;
        break;
      case 82:  // r key
        restart = true;
        break;
      case 81: // q key
        toggleSound = true;
        break;
      case 82:
        pauseGame = true;
        break;
      default:
        impulse = [0, 0];
        break;
    }
    if (impulse){
      this.accelUnicycle(impulse);
    } else if (jump) {
      this.unicycle.jumpUnicycle(this.gameMuted)
    } else if (restart){
      this.restartGame();
    } else if (toggleSound){
      this.toggleSound();
    } else if (pauseGame){
      // TODO: add in pause game
    }
  }

  toggleSound(){
    let audio = document.getElementById("audio-theme");
    if (this.gameMuted){
      this.gameMuted = false;
      audio.muted = false;
      audio.play();
    } else {
      this.gameMuted = true;
      audio.muted = true;
      audio.pause();
    }
  }

  restartGame(){
    if (this.gameOver || this.gameWon){
      this.shouldRestartGame = true;
      let gameOverModal = document.querySelector(".game-over-container");
      let scoreboard = document.getElementById("game-over")
      gameOverModal.setAttribute("style", "opacity: -1");
      scoreboard.innerHTML = "";
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
      let offsetX = delta * Math.cos(degrees) / 3;
      this.obstacles.move((offsetX));
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
    let bikePos = this.unicycle.pos;
    this.obstacles.coords.forEach( obstacle => {
      if (this.checkCollision(bikePos, obstacle)){
        this.currentObstacle = obstacle;
      }
    })

    if (this.checkMonkeysCollision()){
      this.renderGameOver();
      this.stopGame();
    }

    if (this.checkFruitBowlCollision()){
      this.gameWon = true;
    }

  }

  checkFruitBowlCollision(){
    if (this.obstacles.fruitBowlPos < -45){
      return true;
    }
  }

  stopGame(){
    this.gameOver = true;
  }

  renderGameOver(){
    let gameOverModal = document.querySelector(".game-over-container");
    let scoreboard = document.getElementById("game-over")
    gameOverModal.setAttribute("style", "opacity: 1");
    scoreboard.innerHTML = "Game over! You didn't get to the fruit bowl, press r to restart"
  }

  checkMonkeysCollision(){
    let monkeyPos = this.obstacles.spritePos;
    let unicyclePos = this.unicycle.pos;
    let hitMonkey;
    monkeyPos.forEach( monkeyPosX => {
      if (monkeyPosX < unicyclePos[0] + 105
        && monkeyPosX + 100 > unicyclePos[0]
        && 180 < unicyclePos[1]){
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
    let degrees = obstaclePos.degrees;
    let xDistance = obstaclePos.startX - bikePos[0];
    let offsetY = xDistance * Math.sin(degrees)
                    + obstaclePos.offset;
    if (bikePos[0] + 80 > obstaclePos.startX && bikePos[0] + 50 < obstaclePos.endX
      ){
        console.log(bikePos[1] - offsetY);
        if (bikePos[1] - offsetY > 160) {
          return true;
        }
    }
    return false;
  }

}


module.exports = Game;

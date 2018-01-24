const Unicycle = require('./unicycle');
const Level1Obstacle = require('./level_1_obstacle');

class Game {
  constructor(muted = true){
    let uniCoords = [50, 180]
    this.unicycle = new Unicycle(uniCoords);
    this.obstacles = new Level1Obstacle();
    this.currentObstacle = null;
    this.frames = 0;
    this.gameOver = false;
    this.shouldRestartGame = false;
    this.gameWon = false;
    this.gameMuted = muted;
    this.gamePaused = false;
    this.unicycleVel = 0;
    this.mainTheme = document.getElementById("audio-theme");
    if (!this.gameMuted) this.mainTheme.play();
  }

  draw(ctx){
    if (this.gamePaused){
      this.renderTimer()
    } else {
      this.frames += 1;
      ctx.clearRect(0, 0, 700, 500);
      this.unicycle.draw(ctx, this.frames);
      this.obstacles.draw(ctx, this.frames);
      this.renderTimer();
    }
  }

  renderTimer(){
    let scoreboard = document.getElementById("game-score");
    let scoreSheet;
    if (this.gameOver){
      scoreSheet = ""
    } else if (this.gameWon) {
      scoreSheet = `Your time is ${Math.floor(this.frames / 60)}!`
    } else if (this.gamePaused){
      scoreSheet = " Game paused"
    } else {
      scoreSheet = `Time: ${Math.floor(this.frames / 60)}
                    BPH: ${Math.ceil(this.unicycle.vel[0] * 10) / 10}`
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
      case 82:  //r key
        restart = true;
        break;
      case 81: // q key
        toggleSound = true;
        break;
      case 80: //p key
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
      this.togglePause();
    }
  }

  togglePause(){
    if (this.gamePaused){
      this.gamePaused = false;
      if (!this.gameMuted) this.mainTheme.play();
    } else {
      this.gamePaused = true;
      this.mainTheme.pause();
    }
  }

  toggleSound(){
    let gameOver = document.getElementById("game-over-sound");
    let victoryTheme = document.getElementById("victory-theme");
    if (this.gameMuted){
      this.gameMuted = false;
      this.mainTheme.muted = false;
      this.mainTheme.play();
    } else {
      this.gameMuted = true;
      this.mainTheme.muted = true;
      this.mainTheme.pause();
      gameOver.pause();
      victoryTheme.pause();
    }
  }

  restartGame(){
    let gameOver = document.getElementById("game-over-sound");
    let victoryTheme = document.getElementById("victory-theme");
    if (this.gameOver || this.gameWon){
      this.mainTheme.currentTime = 0;
      gameOver.pause();
      victoryTheme.pause();
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
      this.unicycleVel = this.unicycle.offsetX * 0.8;
      this.obstacles.move(this.unicycleVel);
    } else {
      this.currentObstacle = null;
      this.lowerBike();
      this.unicycle.move(delta);
      this.unicycleVel = this.unicycle.offsetX;
      this.obstacles.move(this.unicycleVel);
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
      this.playVictoryTheme();
    }

  }

  checkFruitBowlCollision(){
    if (this.obstacles.fruitBowlPos < -45){
      return true;
    }
  }

  playVictoryTheme(){
    if (!this.gameMuted){
      let victoryTheme = document.getElementById("victory-theme");
      victoryTheme.currentTime = 0;
      this.mainTheme.pause();
      victoryTheme.play();
    }
  }

  stopGame(){
    this.gameOver = true;
  }

  renderGameOver(){
    let gameOverModal = document.querySelector(".game-over-container");
    let scoreboard = document.getElementById("game-over")
    let gameOverSound = document.getElementById("game-over-sound");
    if (!this.gameMuted) {
      this.mainTheme.pause();
      gameOverSound.currentTime = 0;
      gameOverSound.play();
    }
    gameOverModal.setAttribute("style", "opacity: 1");
    scoreboard.innerHTML = "Game over! You didn't get to the fruit bowl, press r to restart"
  }

  checkMonkeysCollision(){
    if (this.checkGroundMonkeyCollision()
        || this.checkSkyMonkeyCollision()){
      return true;
    } else {
      return false
    }
  }

  checkSkyMonkeyCollision(){
    let skyMonkeyPos = this.obstacles.skyMonkeyPosX;
    let unicyclePos = this.unicycle.pos;
    let hitSkyMonkey;
    skyMonkeyPos.forEach( skyMonkeyPosX => {
      if (skyMonkeyPosX - 140 < unicyclePos[0]
          && unicyclePos[1] < 200
          && skyMonkeyPosX > unicyclePos[0] - 120){
        hitSkyMonkey = true;
      }
    })

      if (hitSkyMonkey) {
        return true;
      } else {
        return false;
      }
  }

  checkGroundMonkeyCollision(){
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
        if (bikePos[1] - offsetY > 160) {
          return true;
        }
    }
    return false;
  }

}


module.exports = Game;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Unicycle = __webpack_require__(2);
const Level1Obstacle = __webpack_require__(3);

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
                    BPH: ${Math.ceil(this.unicycle.vel[0])}`
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
        impulse = [0.3, 0];
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
    let gamePause = document.getElementById("pause-game-container");
    if (this.gamePaused){
      this.gamePaused = false;
      if (!this.gameMuted) this.mainTheme.play();
      gamePause.setAttribute("style", "z-index: -3");
    } else {
      gamePause.setAttribute("style", "z-index: 1");
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");
  let audio = document.getElementById("audio-theme");
  audio.muted = true;

  const startGame = e => {
    if (e.keyCode === 32){
      window.removeEventListener("keydown", startGame, false);
      new GameView(ctx).start();
    }
  }

  window.addEventListener("keydown", startGame, false);

});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Level1ObstacleArr =
  __webpack_require__(4);
const SkyMonkeyPos = __webpack_require__(5);
const Coords = __webpack_require__(7);

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

    debugger

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Level1ObstacleArr = {

  generateScript(){
    // return [ //prev ground pos 310
    //   { startX: 1000, endX: 1500, endY: 250, degrees: Math.atan(53/150),
    //   offset: 80 }, // width: 500 // height 160
    //  { startX: 5000, endX: 5250, endY: 330, degrees: Math.atan(53/150),
    //   offset: 78 }, // width: 250 //height 80
    //  { startX: 9000, endX: 9600, endY: 375, degrees: Math.atan(10/150),
    //   offset: 105 }  // width: 600 // 35
    // ]
    return [ //prev ground pos 310
      { width: 500, endY: 250, degrees: Math.atan(53/150),
      offset: 80 }, // width: 500 // height 160
     { width: 250, endY: 330, degrees: Math.atan(53/150),
      offset: 78 }, // width: 250 //height 80
     { width: 600, endY: 375, degrees: Math.atan(10/150),
      offset: 105 }  // width: 600 // 35
    ]
  } // ground at 330

};

module.exports = Level1ObstacleArr;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const SkyMonkeyPos = {
  generateSkyPos(){
    return [
      // first row
      {startX: 0, startY: 0, width: 135, height: 125},
      {startX: 135, startY: 0, width: 135, height: 125},
      {startX: 270, startY: 0, width: 135, height: 125},
      {startX: 403, startY: 0, width: 137, height: 125},
      {startX: 540, startY: 0, width: 136, height: 125},
      {startX: 675, startY: 0, width: 129, height: 141},
      {startX: 805, startY: 0, width: 131, height: 142},
      // second row
      {startX: 0, startY: 126, width: 130, height: 129},
      {startX: 130, startY: 126, width: 130, height: 133},
      {startX: 260, startY: 130, width: 146, height: 136},
      {startX: 407, startY: 130, width: 129, height: 138},
      {startX: 536, startY: 131, width: 128, height: 140},
      {startX: 665, startY: 141, width: 129, height: 138},
      {startX: 795, startY: 141, width: 133, height: 138},
      // third row
      {startX: 0, startY: 264, width: 128, height: 140},
      {startX: 130, startY: 264, width: 129, height: 140},
      {startX: 260, startY: 267, width: 131, height: 141},
      {startX: 395, startY: 272, width: 145, height: 139},
      {startX: 541, startY: 283, width: 164, height: 141},
      {startX: 708, startY: 280, width: 132, height: 147},
      {startX: 842, startY: 281, width: 131, height: 147},
      // fourth row
      {startX: 0, startY: 406, width: 177, height: 173},
      {startX: 179, startY: 410, width: 184, height: 178},
    ]
  }
}

module.exports = SkyMonkeyPos;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game();
  }

  start(){
    this.game.bindKeyHandlers();
    this.removeStart();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  removeStart(){
    let gameStart = document.querySelector(".game-start-container");
    let gameInstructions = document.querySelector(".game-instructions")
    gameStart.setAttribute("style", "z-index: -1");
    gameInstructions.setAttribute("style", "z-index: -1");
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (this.game.gamePaused){
      this.game.draw(this.ctx)
    } else if (!this.game.gameOver && !this.game.gameWon){
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
    }
    this.lastTime = time;
    if (this.game.shouldRestartGame){
      this.game = new Game(this.game.gameMuted);
      this.start();
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

  }
}

module.exports = GameView;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const generatePosition = {

  generateCoords(){
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    let array = [600, 2000, 3500, 5000, 6500, 8000, 9500, 11000, 13500];
    return shuffle(array)
  }


}

module.exports = generatePosition;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
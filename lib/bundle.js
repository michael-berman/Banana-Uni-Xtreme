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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Unicycle = __webpack_require__(3);
const Level1Obstacle = __webpack_require__(4);
const DistanceUtil = __webpack_require__(1);

class Game {
  constructor(){
    let uniCoords = [50, 185]
    this.unicycle = new Unicycle(uniCoords);
    this.obstacles = new Level1Obstacle();
    this.currentObstacle = null;
    this.frames = 0;
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
    scoreboard.innerHTML = `Time: ${Math.floor(this.frames / 60)}`
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike.bind(this), false);
  }

  moveBike(e){
    let impulse;
    switch(e.keyCode){
      case 37: //down key
        impulse = [-0.5, 0];
        break;
      case 39: //top key
        impulse = [0.2, 0];
        break;
      case 38:
        break;
      default:
        impulse = [0, 0];
        break;
    }
    if (impulse){
      this.accelUnicycle(impulse);
    } else {
      this.unicycle.jumpUnicycle()
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

    // TODO: Check for monkey collision here
    if (this.checkMonkeyCollision()){
      // TODO: render game over
    }

  }

  checkMonkeyCollision(){
    let monkeyPos = this.obstacles.spritePos;
    let unicyclePos = this.unicycle.pos;
    if (monkeyPos[0] < unicyclePos[0] + 105
          // || monkeyPos[0] + 110 > unicyclePos[0]
          // && monkeyPos[1] < unicyclePos[1] + 45
          // monkeyPos[0]
            ){
            // TODO: gameover
            debugger
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const DistanceUtil = {

  dir(vec) {
  const norm = Util.norm(vec);
  return Util.scale(vec, 1 / norm);
  },

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  norm(vec) {
    return Util.dist([0, 0], vec);
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }


};

module.exports = DistanceUtil;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const DistanceUtil = __webpack_require__(1);

class Unicycle {
  constructor(coords){
    this.pos = [coords[0], coords[1]];
    this.vel = [0, 0];
    this.spritesCoords = [13, 265, 515, 773]
    this.spritePos = 0;
    this.maxSpeed = 0.8;
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
    if (this.vel[0] == this.maxSpeed){
      this.offsetX = 0;
    } else {
      const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      this.offsetX = this.vel[0] * velocityScale;
    }
    let offsetY = this.vel[1] * 10;


    if (this.vel[1] < 0 && this.pos[1] < 183 ){
      this.vel[1] += 0.009;
    } else if (this.pos[1] < 183){
      this.vel[1] = 0;
    }

    this.pos[1] = this.pos[1] + offsetY
  }

  shift(offsetY){
    this.pos = [this.pos[0], 160 + offsetY];
  }

  dipDown(){
    if (this.pos[1] < 185 && this.vel[1] == 0){
      this.pos[1] += 40 / NORMAL_FRAME_TIME_DELTA;
    }
  }

  accel(impulse) {
    if (this.vel[0] < this.maxSpeed || this.vel[0] > 0){
      this.vel[0] += impulse[0];
    }
  }

  jumpUnicycle(){

    if (this.vel[1] == 0 && this.pos[1] > 183){
      this.vel[1] -= 0.56
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Unicycle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Level1ObstacleArr =
  __webpack_require__(5);

class Level1Obstacle{
  constructor(){
    this.coords = Level1ObstacleArr.generateScript();
    this.offset = 0;
    this.groundPos = [0, 330]
    this.spritesCoords = [0, 250, 515, 800, 1050,
                          1330, 1627, 1927, 2250, 2550]
    this.spritePos = [300, 230] // 110000 normal position
    this.spriteFrame = 0
  }

  draw(ctx, frames){
    this.drawFloor(ctx);
    this.drawObstacles(ctx);
    // TODO: draw the monkeys!
    this.drawMonkeys(ctx, frames)
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
    this.changeSpritePos(frames);
    const monkey = new Image();
    monkey.src = './assets/monkey_sprite.png';
    ctx.drawImage(monkey, this.spritesCoords[this.spriteFrame], 0,
                    250, 360, this.spritePos[0],
                    this.spritePos[1], 150, 150
                  );
  }

  changeSpritePos(frames){
    frames = Math.abs(frames % 100);
    this.spriteFrame = Math.floor(frames / 10);
  }

  move(offset){
    this.offset = offset //* NORMAL_FRAME_TIME_DELTA;
    this.coords.forEach((coord) => {
      coord.startX -= this.offset;
      coord.endX -= this.offset;
    })

    this.spritePos[0] -= this.offset;
  }
}

module.exports = Level1Obstacle;

const NORMAL_FRAME_TIME_DELTA = 60 / 1000;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Level1ObstacleArr = {

  generateScript(){
    return [
      { startX: 1200, endX: 1700, endY: 150, degrees: Math.atan(60/150),
      offset: -6 }, // width: 500
     { startX: 5000, endX: 5250, endY: 230, degrees: Math.atan(58/150),
      offset: -16 }, // width: 250
     { startX: 9000, endX: 9600, endY: 275, degrees: Math.atan(13/150),
      offset: 18 }  // width: 600
    ]
  } // ground at 330

};


// Testing ramp
// const Level1ObstacleArr = {
//
//   generateScript(){
//     return [
//       { startX: 800, endX: 1400, endY: 150, degrees: Math.atan(46/150),
//       offset: -8 } // width: 600
//     ]
//   } // ground at 330
//
// };

module.exports = Level1ObstacleArr;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }

  start(){
    this.game.bindKeyHandlers();

    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));

  }
}

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
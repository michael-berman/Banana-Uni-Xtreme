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

const DirtBike = __webpack_require__(1);
const Level1Obstacle = __webpack_require__(5);
const DistanceUtil = __webpack_require__(3);

class Game {
  constructor(){
    let bikeCoords = [50, 290]
    this.bike = new DirtBike(bikeCoords);
    this.obstacles = new Level1Obstacle();
    // this.obstacles = [] // TODO: have all obstacles in here
  }

  allObstacles(){
    // TODO: have a collection of all obstacles and reduce by each step
  }

  draw(ctx){
    ctx.clearRect(0, 0, 500, 500);
    this.bike.draw(ctx);
    this.obstacles.draw(ctx);
  }

  step(delta){
    if (this.checkCollision()) {
      debugger
    } else {
      this.bike.move(delta);
      this.obstacles.move(this.bike.offsetX);
    }
    // TODO: need to step the whole view and game and reduce position
    // of all obstacles as well and invoke check collisions
  }

  checkCollision(){
    let bikePos = this.bike.pos[0];
    let obstaclePos = this.obstacles.coords[0]
    if (bikePos + 50 > obstaclePos.startX && bikePos + 50 < obstaclePos.endX){
      this.rotation = Math.atan()
      return true;
    }
    return false;
  }

}


module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DistanceUtil = __webpack_require__(3);

class DirtBike {
  constructor(coords){
    this.pos = [coords[0], coords[1]];
    this.vel = [0, 0];
  }

  draw(ctx){
    // ctx.clearRect(0, 0, 500, 500);
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1], 50 , 50);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }

  move(timeDelta, offsetY = 0){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.offsetX = this.vel[0] * velocityScale;
    this.offsetY = offsetY;

    // TODO: use these offsets to have background moving

    this.pos = [this.pos[0] + this.offsetX, this.pos[1] + this.offsetY];
  }

  rotate(degrees){

  }

  accel(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.checkVelocities();
  }

  checkVelocities(){
    switch (this.vel) {
      case this.vel[0] > 0.2:
        this.vel[0] = 0.2;
        break;
      case this.vel[0] < -0.1:
        this.vel[0] = -0.1;
        break;
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const DirtBike = __webpack_require__(1);
const Game = __webpack_require__(0);

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", this.moveBike.bind(this), false);
  }

  moveBike(e){
    let impulse;
    switch(e.keyCode){
      case 40: //left key
        impulse = [-0.05, 0];
        break;
      case 38: //right key
        impulse = [0.1, 0];
        break;
      default:
        impulse = [0, 0];
        break;
    }
    this.game.bike.accel(impulse);
  }

  start(){
    this.bindKeyHandlers();

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Level1Obstacle{
  constructor(){
    this.coords = [{startX: 300, endX: 450, endY: 300}];
    this.offset = 0;
    this.groundPos = [0, 330]
  }

  draw(ctx){
    this.drawFloor(ctx);
    this.drawObstacles(ctx);
  }

  drawFloor(ctx){
    ctx.beginPath();
    ctx.rect(this.groundPos[0], this.groundPos[1], 500, 210);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawObstacles(ctx){
    // TODO: only one obstacle for now
    ctx.beginPath();
    ctx.moveTo(this.coords[0].startX - this.offset, this.groundPos[1]);
    ctx.lineTo(this.coords[0].endX - this.offset, this.coords[0].endY);
    ctx.lineTo(this.coords[0].endX - this.offset, this.groundPos[1]);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  move(offset){
    this.offset += offset * NORMAL_FRAME_TIME_DELTA;
    this.coords.forEach((coord) => {
      coord.startX -= this.offset;
      coord.endX -= this.offset;
    })
  }
}

module.exports = Level1Obstacle;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
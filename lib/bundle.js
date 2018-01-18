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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DirtBike = __webpack_require__(3);

class Game {
  constructor(){
    this.bike = new DirtBike();
    this.obstacles = [] // TODO: have all obstacles in here
  }

  // TODO: have a collection of all obstacles and reduce by each step

  draw(ctx){
    this.bike.draw(ctx);
    // TODO: draw out all obstacle too
  }

  step(delta){
    this.bike.move(delta);
    // TODO: need to step the whole view and game and reduce position
    // of all obstacles as well and invoke check collisions
  }


  // checkCollisions(){
    // TODO: check for collisions with obstacles
  // }

}


module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const DirtBike = __webpack_require__(3);
const Game = __webpack_require__(1);

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
        impulse = [-0.1, 0];
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const DistanceUtil = __webpack_require__(4);

class DirtBike {
  constructor(){
    this.pos = [10, 240];
    this.vel = [0, 0];
  }

  draw(ctx){
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1], 50 , 50);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }

  move(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.offsetX = this.vel[0] * velocityScale;
    this.offsetY = this.vel[1] * velocityScale;

    // TODO: use these offsets to have background moving

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }

  accel(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.checkVelocities();
  }

  checkVelocities(){
    switch (this.vel) {
      case this.vel[0] > 0.3:
        this.vel[0] = 0.3;
        break;
      case this.vel[0] < -0.2:
        this.vel[0] = -0.2;
        break;
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = DirtBike;


/***/ }),
/* 4 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
const Game = require('./game');

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
    gameStart.setAttribute("style", "z-index: -1");
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (!this.game.gameOver && !this.game.gameWon){
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
    }
    this.lastTime = time;
    if (this.game.shouldRestartGame){
      this.game = new Game();
      this.start();
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

  }
}

module.exports = GameView;

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.bike = this.game.addBike();
  }

  bindKeyHandlers() {
    const bike = this.bike;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      // TODO: render keypress moves on left or right arrow
      key(k, () => { bike.move(move); });
    });

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

GameView.MOVES = {
  a: [0, -1],
  d: [0, 1]
};


module.exports = GameView;

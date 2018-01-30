const Game = require('./game');
const Database = require('./database')

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game();
    this.database = Database;
    this.fetchScores();
  }

  start(){
    this.game.bindKeyHandlers();
    this.removeStart();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  fetchScores(){
    let highscores = [];
    let fetchScoreResults = this.database.ref("scores");
    fetchScoreResults = fetchScoreResults.orderByValue().on('child_added', (snapshot) => {
      highscores.push(snapshot.val());

    })
    // this.sortByTime
  }

  // sortByTime(){
  // TODO: sort by time
  // }

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
    } else {
      // reveal submit score
      //Math.floor(this.game.frames / 60)}:${Math.floor(this.game.frames % 60)
      // initials
      // push into firebase
      this.database.ref("scores").push({
        initials: initials,
        time: time
      })


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

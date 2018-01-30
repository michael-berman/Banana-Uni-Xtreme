const Game = require('./game');
const Database = require('./database')

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game();
    this.database = Database;
    this.fetchScores();
    this.inputScore = false;
    this.submitScore = document.getElementById('submit-score');
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

  addScore(e){
    if (e.keyCode === 13 && !this.inputScore) {
      let input = document.getElementById('submit-score-input')
      let initials = input.value;
      let time = `${Math.floor(this.game.frames / 60)}${Math.floor(this.game.frames % 60)}`;
      if (time.length === 3){
        time = `${time}0`;
      }
      this.database.ref("scores").push({
        initials: initials,
        time: parseInt(time)
      })
      this.inputScore = true;
      this.input.removeEventListener('keypress', this.addScore.bind(this), false);
      this.submitScore.setAttribute("style", "display: none");
    }
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (this.game.gamePaused){
      this.game.draw(this.ctx)
    } else if (!this.game.gameOver && !this.game.gameWon){
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
    } else if (this.game.gameWon && !this.inputScore){
      this.submitScore.setAttribute("style", "display: block");
      this.input = document.getElementById("submit-score-input");
      this.input.addEventListener('keypress', this.addScore.bind(this), false);
    }
    this.lastTime = time;
    if (this.game.shouldRestartGame){
      this.inputScore = false;
      this.game = new Game(this.game.gameMuted);
      this.start();
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

  }
}

module.exports = GameView;

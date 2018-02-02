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
    this.highscores = [];
    let fetchScoreResults = this.database.ref("scores");
    fetchScoreResults.on('value', (snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        this.highscores.push(childSnapshot.val());
      }.bind(this));
    }).bind(this);

    const delay = (() => setTimeout( this.sortScores.bind(this), 5000));
    delay();

  }

  sortScores(){
    function insertionSort(array) {
      for(var i = 0; i < array.length; i++) {
        var temp = array[i];
        var j = i - 1;
        while (j >= 0 && array[j].time > temp.time) {
          array[j + 1] = array[j];
          j--;
        }
        array[j + 1] = temp;
      }
      return array;
    }

    this.highscores = insertionSort(this.highscores).slice(0, 10);
    this.displayHighScores();
  }

  displayHighScores(){
    let hsList = document.getElementById("high-score-list");
    while (hsList.firstChild) {
        hsList.removeChild(hsList.firstChild);
    }
    this.highscores.forEach( score => {
      let node = document.createElement("LI");
      let numString = `${score.time}`;
      let textNode = document.createTextNode(`${score.initials}:
        ${numString.slice(0, 2)}:${numString.slice(2,4)}`);
      node.appendChild(textNode);
      node.classList.add("high-score-list-item");
      hsList.appendChild(node);
    })
  }

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
      let time = this.game.finalScore;
      if (time.length === 4) time = `${time}0`;
      if (time.length === 3) time = `${time}:00`;
      time = `${time.slice(0, 2)}${time.slice(3, 5)}`;
      this.database.ref("scores").push({
        initials: initials,
        time: parseInt(time)
      })
      this.inputScore = true;
      this.input.removeEventListener('keypress', this.addScore.bind(this), false);
      this.submitScore.setAttribute("style", "display: none");
      debugger
      this.fetchScores();
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

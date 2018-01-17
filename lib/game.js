

class Game = {
  constructor(){
    options = { pos: [100, 100], vel: [0, 0]}
    this.bikes = DirtBike.new(options);
    this.obstacles = [];
  }

  addBike(){

  }

  run(){
    // interactions with obstacles
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  }

}


module.exports = Game;

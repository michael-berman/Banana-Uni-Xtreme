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

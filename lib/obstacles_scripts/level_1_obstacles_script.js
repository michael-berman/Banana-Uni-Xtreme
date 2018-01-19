const Level1ObstacleArr = {

  generateScript(){
    return [
      { startX: 300, endX: 900, endY: 150, degrees: Math.atan(46/150),
      offset: -8 },
     { startX: 1200, endX: 1450, endY: 230, degrees: Math.atan(100/150),
      offset: -30 },
     { startX: 2000, endX: 2600, endY: 275, degrees: Math.atan(15/150),
      offset: 18 }
    ]
  } // ground at 330
  
};

module.exports = Level1ObstacleArr;

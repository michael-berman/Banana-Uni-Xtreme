const Level1ObstacleArr = {

  generateScript(){
    return [
      { startX: 1200, endX: 1700, endY: 150, degrees: Math.atan(60/150),
      offset: -6 }, // width: 500
     { startX: 5000, endX: 5250, endY: 230, degrees: Math.atan(58/150),
      offset: -16 }, // width: 250
     { startX: 9000, endX: 9600, endY: 275, degrees: Math.atan(13/150),
      offset: 18 }  // width: 600
    ]
  } // ground at 330

};


// Testing ramp
// const Level1ObstacleArr = {
//
//   generateScript(){
//     return [
//       { startX: 800, endX: 1400, endY: 150, degrees: Math.atan(46/150),
//       offset: -8 } // width: 600
//     ]
//   } // ground at 330
//
// };

module.exports = Level1ObstacleArr;

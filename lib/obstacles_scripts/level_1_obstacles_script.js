const Level1ObstacleArr = {

  generateScript(){
    return [
      { startX: 200, endX: 700, endY: 150, degrees: Math.atan(57/150),
      offset: -14 }, // width: 600
     { startX: 2200, endX: 2450, endY: 230, degrees: Math.atan(60/150),
      offset: -25 }, // width: 250
     { startX: 3500, endX: 4100, endY: 275, degrees: Math.atan(15/150),
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

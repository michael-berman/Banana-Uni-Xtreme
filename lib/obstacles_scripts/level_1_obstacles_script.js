const Level1ObstacleArr = {

  generateScript(){
    return [ //prev ground pos 310
      { startX: 1000, endX: 1500, endY: 250, degrees: Math.atan(53/150),
      offset: 80 }, // width: 500 // height 160
     { startX: 2000, endX: 2250, endY: 330, degrees: Math.atan(53/150),
      offset: 78 }, // width: 250 //height 80
     { startX: 3000, endX: 3600, endY: 375, degrees: Math.atan(10/150),
      offset: 105 }  // width: 600 // 35
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

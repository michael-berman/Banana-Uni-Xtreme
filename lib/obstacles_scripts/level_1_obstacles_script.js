const Level1ObstacleArr = {

  generateScript(){
    // return [ //prev ground pos 310
    //   { startX: 1000, endX: 1500, endY: 250, degrees: Math.atan(53/150),
    //   offset: 80 }, // width: 500 // height 160
    //  { startX: 5000, endX: 5250, endY: 330, degrees: Math.atan(53/150),
    //   offset: 78 }, // width: 250 //height 80
    //  { startX: 9000, endX: 9600, endY: 375, degrees: Math.atan(10/150),
    //   offset: 105 }  // width: 600 // 35
    // ]
    return [ //prev ground pos 310
      { width: 500, endY: 250, degrees: Math.atan(53/150),
      offset: 80 }, // width: 500 // height 160
     { width: 250, endY: 330, degrees: Math.atan(53/150),
      offset: 78 }, // width: 250 //height 80
     { width: 600, endY: 375, degrees: Math.atan(10/150),
      offset: 105 }  // width: 600 // 35
    ]
  } // ground at 330

};

module.exports = Level1ObstacleArr;

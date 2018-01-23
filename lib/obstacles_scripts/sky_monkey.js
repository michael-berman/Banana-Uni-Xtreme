const SkyMonkeyPos = {
  generateSkyPos(){
    return [
      // swidth, sheight, sx, sy
      // first row
      {startX: 0, startY: 0, width: 135, height: 125},
      {startX: 135, startY: 0, width: 135, height: 125},
      {startX: 270, startY: 0, width: 135, height: 125},
      {startX: 403, startY: 0, width: 137, height: 125},
      {startX: 540, startY: 0, width: 136, height: 125},
      {startX: 675, startY: 0, width: 129, height: 141},
      {startX: 805, startY: 0, width: 131, height: 142},
      // second row
      {startX: 0, startY: 126, width: 130, height: 129},
      {startX: 130, startY: 126, width: 130, height: 133},
      {startX: 260, startY: 130, width: 146, height: 136},
      {startX: 407, startY: 130, width: 129, height: 138},
      {startX: 536, startY: 131, width: 128, height: 140},
      {startX: 665, startY: 141, width: 129, height: 138},
      {startX: 795, startY: 141, width: 133, height: 138},
      // third row
      {startX: 0, startY: 264, width: 128, height: 140},
      {startX: 130, startY: 264, width: 129, height: 140},
      {startX: 260, startY: 267, width: 131, height: 141},
      {startX: 395, startY: 272, width: 145, height: 139},
      {startX: 541, startY: 283, width: 164, height: 141},
      {startX: 708, startY: 280, width: 132, height: 147},
      {startX: 842, startY: 281, width: 131, height: 147},
      // fourth row
      {startX: 0, startY: 406, width: 177, height: 173},
      {startX: 179, startY: 410, width: 184, height: 178},
    ]
  }
}

module.exports = SkyMonkeyPos;

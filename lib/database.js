const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyC1uNqdCeI0TcdIRggELEdLdcE2xJnVUwE",
  authDomain: "banana-uni-xtreme.firebaseapp.com",
  databaseURL: "https://banana-uni-xtreme.firebaseio.com",
  projectId: "banana-uni-xtreme",
  storageBucket: "",
  messagingSenderId: "87927721490"
};
const firebaseDB = firebase.initializeApp(config);

const Database = firebaseDB.database();

module.exports = Database;


// const database = {
//
//   initializeDatabase(){
//     var config = {
//       apiKey: "AIzaSyC1uNqdCeI0TcdIRggELEdLdcE2xJnVUwE",
//       authDomain: "banana-uni-xtreme.firebaseapp.com",
//       databaseURL: "https://banana-uni-xtreme.firebaseio.com",
//       projectId: "banana-uni-xtreme",
//       storageBucket: "",
//       messagingSenderId: "87927721490"
//     };
//     firebase.initializeApp(config);
//   }
//
//   addScore(name, score){
//     let database = firebase.database();
//     var newScoreKey = firebase.database().ref().push().key;
//     let score =  key, score, username
//     firebase.database().ref('/users/').
//   }
//
// }

// {
//   "name": "dirt_bike_xtreme",
//   "version": "1.0.0",
//   "description": "A game based on riding on a motor bike, where the goal is to get through every obstacle as fast as possible.",
//   "main": "webpack.config.js",
//   "dependencies": {
//     "firebase": "^4.9.0",
//     "matter-js": "^0.14.1",
//     "planck-js": "^0.1.38"
//   },
//   "devDependencies": {},
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "repository": {
//     "type": "git",
//     "url": "git+https://github.com/michael-berman/Dirt-Bike-Xtreme.git"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "bugs": {
//     "url": "https://github.com/michael-berman/Dirt-Bike-Xtreme/issues"
//   },
//   "homepage": "https://github.com/michael-berman/Dirt-Bike-Xtreme#readme"
// }

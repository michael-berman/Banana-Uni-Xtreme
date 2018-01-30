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

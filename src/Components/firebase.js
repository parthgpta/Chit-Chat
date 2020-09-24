import firebase from "firebase" ;

const firebaseConfig = {
    apiKey: "AIzaSyBwIvSKW3--5kXH2UD7x_UaPRGnqw4saFQ",
    authDomain: "chitchat-on.firebaseapp.com",
    databaseURL: "https://chitchat-on.firebaseio.com",
    projectId: "chitchat-on",
    storageBucket: "chitchat-on.appspot.com",
    messagingSenderId: "412437269392",
    appId: "1:412437269392:web:043a6135146b947e754115",
    measurementId: "G-6HLWYS4G5L"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider} ;
export default db ;
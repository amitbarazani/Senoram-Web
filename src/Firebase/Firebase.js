//import * as firebase from 'firebase';
import firebase from 'firebase/app';
import "firebase/auth"; // ADDED 
import "firebase/firestore";  // ADDED 


var firebaseConfig = {
    apiKey: "AIzaSyDZpihh56xpGwQMli-uM0P5wmtknY2kv6Q",
    authDomain: "senorma-64974.firebaseapp.com",
    databaseURL: "https://senorma-64974-default-rtdb.firebaseio.com/", // ADDED 
    projectId: "senorma-64974",
    storageBucket: "senorma-64974.appspot.com",
    messagingSenderId: "365150409749",
    appId: "1:365150409749:web:7318b311dd3d95c39e2a1c",
    measurementId: "G-SCPBQ8BY74"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  
export default fire;
//export const auth = firebase.auth();  // ADDED
//export const firestore = firebase.firestore();  // ADDED
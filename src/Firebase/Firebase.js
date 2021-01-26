import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDZpihh56xpGwQMli-uM0P5wmtknY2kv6Q",
    authDomain: "senorma-64974.firebaseapp.com",
    projectId: "senorma-64974",
    storageBucket: "senorma-64974.appspot.com",
    messagingSenderId: "365150409749",
    appId: "1:365150409749:web:7318b311dd3d95c39e2a1c",
    measurementId: "G-SCPBQ8BY74"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  
export default fire;
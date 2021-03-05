import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA_rSnvjJ0IsGQymwTFqo5pqKNtVYobeuQ",
  authDomain: "schulich-velocity.firebaseapp.com",
  databaseURL: "https://schulich-velocity.firebaseio.com",
  projectId: "schulich-velocity",
  storageBucket: "schulich-velocity.appspot.com",
  messagingSenderId: "627030248616",
  appId: "1:627030248616:web:fd34df45c87f3a2a3b069d",
  measurementId: "G-ZSGK8C63GM"
};

var fbApp = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
//var database = firebase.database();

export default fbApp;
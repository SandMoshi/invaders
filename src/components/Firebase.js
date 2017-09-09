import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAy63Wq1T60EsqEvSHKK1l-74UZNWjN-54",
  authDomain: "astrodoginvaders.firebaseapp.com",
  databaseURL: "https://astrodoginvaders.firebaseio.com",
  projectId: "astrodoginvaders",
  storageBucket: "astrodoginvaders.appspot.com",
  messagingSenderId: "255330426813"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth();
export const database = firebase.database();
export const provider = new firebase.auth.FacebookAuthProvider();

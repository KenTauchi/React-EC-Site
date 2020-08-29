import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB48W36gsEJ-OokgXCaGXxJTIK_Wxozzq0",
  authDomain: "crwn-db-be8ee.firebaseapp.com",
  databaseURL: "https://crwn-db-be8ee.firebaseio.com",
  projectId: "crwn-db-be8ee",
  storageBucket: "crwn-db-be8ee.appspot.com",
  messagingSenderId: "465011150111",
  appId: "1:465011150111:web:549c0b003ce41e6f18f42a",
  measurementId: "G-KR6T00VECH",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmpt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

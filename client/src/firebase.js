import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPOG-5Eiucz0hvJC_dEEasIZCJBO6Ucd4",
  authDomain: "girbas.firebaseapp.com",
  projectId: "girbas",
  storageBucket: "girbas.appspot.com",
  messagingSenderId: "581460081968",
  appId: "1:581460081968:web:1e2d88314450fd3b499cf5",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

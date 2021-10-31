//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEqnXRP23Dk5FoAqHHhSz3es1pNe2bUA0",
  authDomain: "trail-app-5b2b7.firebaseapp.com",
  projectId: "trail-app-5b2b7",
  storageBucket: "trail-app-5b2b7.appspot.com",
  messagingSenderId: "571751211472",
  appId: "1:571751211472:web:dd517f5764930d4d3299d5",
  measurementId: "G-FJW2JET3YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export default firebase;


import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import  { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
const database = getDatabase(app);

export default database;
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
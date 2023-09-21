import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuFX4sx5w1PThcvHmjHTEbv7TvgjRRLuQ",
  authDomain: "thehngsite.firebaseapp.com",
  projectId: "thehngsite",
  storageBucket: "thehngsite.appspot.com",
  messagingSenderId: "497603107451",
  appId: "1:497603107451:web:17e445398332281db0a0de",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase aut
const auth = getAuth();

export { db, auth };


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-19df5.firebaseapp.com",
  projectId: "interviewiq-19df5",
  storageBucket: "interviewiq-19df5.firebasestorage.app",
  messagingSenderId: "406738220035",
  appId: "1:406738220035:web:74daa7c4a14da6574c4a36",
  measurementId: "G-RWZ8FHPTK7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
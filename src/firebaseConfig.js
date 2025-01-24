// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg40xJhErMiWjsT6deYDalj9ml-NiHCkE",
  authDomain: "kanbanapplication-3ddbe.firebaseapp.com",
  projectId: "kanbanapplication-3ddbe",
  storageBucket: "kanbanapplication-3ddbe.firebasestorage.app",
  messagingSenderId: "645911729503",
  appId: "1:645911729503:web:e02e5309847a311c20d2ea",
  measurementId: "G-JGGQGD67WT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

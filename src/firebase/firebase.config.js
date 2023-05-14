// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8u2vZKyOiBB_Qo8rCFkncXS5iEtBgXwA",
  authDomain: "ema-jon-with-firebase-au-68b3b.firebaseapp.com",
  projectId: "ema-jon-with-firebase-au-68b3b",
  storageBucket: "ema-jon-with-firebase-au-68b3b.appspot.com",
  messagingSenderId: "716032951054",
  appId: "1:716032951054:web:2c511c8c053f195c6f0d5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
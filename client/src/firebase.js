// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-62965.firebaseapp.com",
  projectId: "mern-estate-62965",
  storageBucket: "mern-estate-62965.appspot.com",
  messagingSenderId: "933519658814",
  appId: "1:933519658814:web:8305383bd348e4aa44e66f",
  measurementId: "G-1Y7C3V6BXB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

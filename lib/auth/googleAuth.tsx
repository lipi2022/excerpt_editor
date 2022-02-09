// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApp9oOwcOvdEUcIwAwVt51dKh3Xo_0hOA",
  authDomain: "excerpt-portal.firebaseapp.com",
  projectId: "excerpt-portal",
  storageBucket: "excerpt-portal.appspot.com",
  messagingSenderId: "571825614353",
  appId: "1:571825614353:web:a3f97015558b22b10a0bb0",
  measurementId: "G-KJNNJMY7VK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app };

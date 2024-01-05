// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbnBRuzPaGdDqE1cxGYXUWRg8u_dj4IeA",
  authDomain: "donationapp-75a71.firebaseapp.com",
  projectId: "donationapp-75a71",
  storageBucket: "donationapp-75a71.appspot.com",
  messagingSenderId: "63004966777",
  appId: "1:63004966777:web:2159e3f571cd4649c5b9a8",
  measurementId: "G-2E3HVRMY9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default db;
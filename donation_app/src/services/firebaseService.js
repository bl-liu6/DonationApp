// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a new donation to the Firestore database
export const addDonation = async (donationData) => {
    try {
      const docRef = await addDoc(collection(db, 'donations'), donationData);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id; // Return the new document ID
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e; // Re-throw the error to be handled by the calling component
    }
  };

// Fetch unique donation types from Firestore
export const getDonationTypes = async () => {
    const snapshot = await getDocs(collection(db, 'donations'));
    const types = new Set();
    snapshot.docs.forEach(doc => types.add(doc.data().type));
    return Array.from(types);
};

// Function to log the distribution of a specific donation in Firestore
export const distributeDonation = async (distributionData) => {
  try {
    // You'd also likely want to update the original donation here to reflect the distribution
    const docRef = await addDoc(collection(db, 'distributions'), distributionData);
    console.log('Distribution document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error logging distribution: ', e);
    throw e;
  }
};

// Fetch all donations from Firestore
export const getDonations = async () => {
    const snapshot = await getDocs(collection(db, 'donations'));
    return snapshot.docs.map(doc => doc.data());
};

// Fetch all distributions from Firestore
export const getDistributions = async () => {
    const snapshot = await getDocs(collection(db, 'distributions'));
    return snapshot.docs.map(doc => doc.data());
};

export default db;
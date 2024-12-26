// client/src/services/authService.js
import { auth } from 'firebase/app'; // Import Firebase Authentication

// Firebase Initialization
import { firebaseConfig } from './firebaseConfig'; // Your Firebase config

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// Login with Firebase
export const loginWithFirebase = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const idToken = await userCredential.user.getIdToken(); // Get the Firebase JWT token
    return idToken; // Return the token to store in the local storage
  } catch (error) {
    throw new Error(error.message);
  }
};

// Register with Firebase
export const registerWithFirebase = async (username, email, password, zodiacSign) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const idToken = await userCredential.user.getIdToken(); // Get the Firebase JWT token
    // Optionally, save other user data (e.g., username, zodiacSign) to Firebase Realtime Database
    return idToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

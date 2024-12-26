// client/src/services/authService.js
import { initializeApp } from 'firebase/app';  // Correct way to import Firebase
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';  // Correct way to import auth methods
import { firebaseConfig } from '../services/firebaseConfig';  // Ensure this file exports your firebaseConfig

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login with Firebase
export const loginWithFirebase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();  // Get the Firebase JWT token
    return idToken;  // Return the token to store in local storage
  } catch (error) {
    throw new Error(error.message);
  }
};

// Register with Firebase
export const registerWithFirebase = async (username, email, password, zodiacSign) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();  // Get the Firebase JWT token
    // Optionally, save other user data (e.g., username, zodiacSign) to Firebase Realtime Database
    return idToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Login function for user authentication
export const login = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user details from Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User profile not found.');
    }

    return { user: userDoc.data() };
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

// Register function for user registration
export const register = async (username, email, password, zodiacSign = '') => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username,
      email,
      zodiacSign,
    });

    return { user: { username, email, zodiacSign } };
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('User logged out.');
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};

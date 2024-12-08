import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "socialapp-67fa1.firebaseapp.com",
    projectId: "socialapp-67fa1",
    storageBucket: "socialapp-67fa1.firebasestorage.app",
    messagingSenderId: "44311490128",
    appId: "1:44311490128:web:266c6c78540df695b4eb55"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

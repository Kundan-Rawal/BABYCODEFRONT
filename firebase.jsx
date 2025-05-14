// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDHiH7aSWnEEXluYoirSBSCn7dfJ-O4Fi4',
  authDomain: 'babycode-229be.firebaseapp.com',
  projectId: 'babycode-229be',
  storageBucket: 'babycode-229be.firebasestorage.app',
  messagingSenderId: '723034911295',
  appId: '1:723034911295:web:0a5d970135b047ea82be8a',
  measurementId: 'G-BBM5HWZJPM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

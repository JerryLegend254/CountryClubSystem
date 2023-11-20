/* eslint-disable import/no-extraneous-dependencies */
// const { initializeApp } = require("firebase/app");
// const {
//   getFirestore,
//   doc,
//   setDoc,
//   collection,
//   addDoc,
//   query,
//   getDocs,
// } = require("firebase/firestore");
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDwKn8_iosdgqR03fYUWwNaGUIBsd4lO4c',
  authDomain: 'country-club-2974d.firebaseapp.com',
  projectId: 'country-club-2974d',
  storageBucket: 'country-club-2974d.appspot.com',
  messagingSenderId: '261000815470',
  appId: '1:261000815470:web:0f6533fd278170d6c6977f',
  measurementId: 'G-NL6H1HEDBM',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);


export { auth, signOut, onAuthStateChanged, signInWithEmailAndPassword };

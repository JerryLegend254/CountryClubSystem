// const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  getDocs,
} = require("firebase/firestore");
const {
  getAuth: getClientAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} = require("firebase/auth");
const { initializeApp: adminInitApp, cert } = require("firebase-admin/app");
const { initializeApp: clientInitApp } = require("firebase/app");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");

const serviceAccount = require("./firebase-adm-sdk.json");

// const firebaseConfig = {
//   apiKey: "AIzaSyDwKn8_iosdgqR03fYUWwNaGUIBsd4lO4c",
//   authDomain: "country-club-2974d.firebaseapp.com",
//   projectId: "country-club-2974d",
//   storageBucket: "country-club-2974d.appspot.com",
//   messagingSenderId: "261000815470",
//   appId: "1:261000815470:web:0f6533fd278170d6c6977f",
//   measurementId: "G-NL6H1HEDBM",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBh27so4ToeUUpT7XZTre62Uo-E1N4Dz8k",
  authDomain: "countryclubsystem-b2495.firebaseapp.com",
  projectId: "countryclubsystem-b2495",
  storageBucket: "countryclubsystem-b2495.appspot.com",
  messagingSenderId: "1079531979980",
  appId: "1:1079531979980:web:080bad5a6d4bdf44932e69",
};

const adminApp = adminInitApp({
  credential: cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const clientApp = clientInitApp(firebaseConfig);
const adminAuth = getAdminAuth(adminApp);
const clientAuth = getClientAuth(clientApp);
const db = getFirestore(clientApp);

// module.exports = {
//   doc,
//   setDoc,
//   db,
//   collection,
//   addDoc,
//   query,
//   getDocs,
//   auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
// };

module.exports = {
  adminAuth,
  clientAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  collection,
  db,
  setDoc
};

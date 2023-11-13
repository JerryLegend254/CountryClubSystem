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
//   apiKey: "AIzaSyBj16t-OXZtQlDKo5AWA4mr-QmKghLcF4E",
//   authDomain: "country-club-3daf4.firebaseapp.com",
//   projectId: "country-club-3daf4",
//   storageBucket: "country-club-3daf4.appspot.com",
//   messagingSenderId: "965270852130",
//   appId: "1:965270852130:web:6c9d552e29945e06d8307b",
//   measurementId: "G-E0GJQRD7ME",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBDdY0Gewxa32VB0tycpnKylu705KDdzYk",
  authDomain: "countryclubsystem.firebaseapp.com",
  projectId: "countryclubsystem",
  storageBucket: "countryclubsystem.appspot.com",
  messagingSenderId: "1063370598366",
  appId: "1:1063370598366:web:00b05aa719ed6aebbfdf4f",
};

const adminApp = adminInitApp({
  credential: cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const clientApp = clientInitApp(firebaseConfig);
const adminAuth = getAdminAuth(adminApp);
const clientAuth = getClientAuth(clientApp);
// const db = getFirestore(app);

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
};

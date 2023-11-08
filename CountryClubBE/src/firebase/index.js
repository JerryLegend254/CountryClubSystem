const { initializeApp } = require("firebase/app");
const {getFirestore, doc, setDoc, collection, addDoc, query, getDocs} = require("firebase/firestore")


const firebaseConfig = {
  apiKey: "AIzaSyBj16t-OXZtQlDKo5AWA4mr-QmKghLcF4E",
  authDomain: "country-club-3daf4.firebaseapp.com",
  projectId: "country-club-3daf4",
  storageBucket: "country-club-3daf4.appspot.com",
  messagingSenderId: "965270852130",
  appId: "1:965270852130:web:6c9d552e29945e06d8307b",
  measurementId: "G-E0GJQRD7ME",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = {
    doc, setDoc,db, collection, addDoc, query, getDocs
}
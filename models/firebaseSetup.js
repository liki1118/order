const { initializeApp } = require("firebase/app");
const { getFirestore, collection, query, where, getDocs, updateDoc, arrayUnion, addDoc } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyB3QhHLpJ4MXgV0VrIuCWf_Cq7ADWynRxk",
  authDomain: "order-c4cfa.firebaseapp.com",
  projectId: "order-c4cfa",
  storageBucket: "order-c4cfa.firebasestorage.app",
  messagingSenderId: "1070337352027",
  appId: "1:1070337352027:web:3f919d1e64b76b41727a7e",
  measurementId: "G-82P3PRVP80"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports=db;


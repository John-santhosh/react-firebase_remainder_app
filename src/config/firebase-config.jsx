import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBwFaljOcEKTLtzrXglKU5picQVtmg_msQ",
  authDomain: "reainder-app.firebaseapp.com",
  projectId: "reainder-app",
  storageBucket: "reainder-app.appspot.com",
  messagingSenderId: "1280433664",
  appId: "1:1280433664:web:3f2415808b9cd55917c2e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

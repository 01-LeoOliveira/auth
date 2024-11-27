// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD39kMsFP-y0H2XIDwJGhAuQDydKWdlNxg",
  authDomain: "cindy-trans.firebaseapp.com",
  projectId: "cindy-trans",
  storageBucket: "cindy-trans.firebasestorage.app",
  messagingSenderId: "1009759578870",
  appId: "1:1009759578870:web:f47b99f5634ef778911ad7",
  measurementId: "G-1T4J8B2RWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
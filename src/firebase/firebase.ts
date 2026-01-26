import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig={
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// debug 
// console.log("API key:",firebaseConfig.apiKey);
// console.log("Authdomain:",firebaseConfig.authDomain);
// console.log("Project Id:",firebaseConfig.projectId);
// console.log("Storage Bucket:",firebaseConfig.storageBucket);
// console.log("Messaging Sender Id:",firebaseConfig.messagingSenderId);
// console.log("App Id:",firebaseConfig.appId);

// Intigrate Firebase SDK
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
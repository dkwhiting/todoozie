import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// const firebaseConfig = {
//   apiKey: "AIzaSyA7rao183OVglEe7gMJzf5pcIJ_Tmxov4o",
//   authDomain: "todoozie-development.firebaseapp.com",
//   projectId: "todoozie-development",
//   storageBucket: "todoozie-development.appspot.com",
//   messagingSenderId: "674813470553",
//   appId: "1:674813470553:web:343a42a80912c5d2814e48"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

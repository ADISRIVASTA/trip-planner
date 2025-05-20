
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA5SSmAKa3HstlJGIFL1y5YeYZqvVp9U4M",
  authDomain: "trip-planner-project-223e7.firebaseapp.com",
  projectId: "trip-planner-project-223e7",
  storageBucket: "trip-planner-project-223e7.appspot.com",
  messagingSenderId: "60419445042",
  appId: "1:60419445042:web:ceb7adee58f22c32df472b",
  measurementId: "G-HS9C2RW9LQ"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
 const db=getFirestore(app);
 export {db};
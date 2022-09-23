
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHSDWbzX-BPWb5nTJDk0pI_O6qfOD5B-Y",
  authDomain: "sheygram-lite-udemy-58d65.firebaseapp.com",
  projectId: "sheygram-lite-udemy-58d65",
  storageBucket: "sheygram-lite-udemy-58d65.appspot.com",
  messagingSenderId: "532453589788",
  appId: "1:532453589788:web:fb2339aaf38ea4cf51f0d9",
  measurementId: "G-Y8VF5F1EQC"
};


const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app)


export {app,fireDB}
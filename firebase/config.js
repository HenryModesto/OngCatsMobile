import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB714OB1DxFjQDQTCJ0-H0XtdJfLkmYSDM",
  authDomain: "ong-tiniebird-cats.firebaseapp.com",
  projectId: "ong-tiniebird-cats",
  storageBucket: "ong-tiniebird-cats.firebasestorage.app",
  messagingSenderId: "481352723350",
  appId: "1:481352723350:web:41f4fda6b16f6fe2254bb7",
  measurementId: "G-4NBE8WSETH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
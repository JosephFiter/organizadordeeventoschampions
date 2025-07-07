import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPVLOSAzHzuqb8XK76yOT9pbVUHcfilic",
  authDomain: "futbolchampions-c776d.firebaseapp.com",
  projectId: "futbolchampions-c776d",
  storageBucket: "futbolchampions-c776d.firebasestorage.app",
  messagingSenderId: "1048404192037",
  appId: "1:1048404192037:web:dd217d55443cd5a1d5c8cc",
  measurementId: "G-SGBGKNZVFS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

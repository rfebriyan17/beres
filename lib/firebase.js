// Import dari Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,                  // Ambil API Key dari env variabel untuk keamanan
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,          // Ambil Auth Domain dari env variabel
  projectId: process.env.FIREBASE_PROJECT_ID,            // Ambil Project ID dari env variabel
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,    // Ambil Storage Bucket dari env variabel
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Ambil Messaging Sender ID dari env variabel
  appId: process.env.FIREBASE_APP_ID                     // Ambil App ID dari env variabel
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mengakses Firestore dan Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Ekspor db dan auth untuk digunakan di aplikasi
export { db, auth };

import { initializeApp, FirebaseApp } from "firebase/app";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Configuración de Firebase
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBWDyHE1uiuh-tSXktZGYRlmhXW57cRZM0",
  authDomain: "atom-app-1fd4c.firebaseapp.com",
  projectId: "atom-app-1fd4c",
  storageBucket: "atom-app-1fd4c.firebasestorage.app",
  messagingSenderId: "44517833603",
  appId: "1:44517833603:web:9dce2d614cd92d1c3814b6",
  measurementId: "G-865YNW9XWB"
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };

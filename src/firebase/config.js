import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEmn2P_0WFFb-RzejZ3UVEfzVC1fpmto4",
  authDomain: "gamitivity.firebaseapp.com",
  projectId: "gamitivity",
  storageBucket: "gamitivity.firebasestorage.app",
  messagingSenderId: "1065595999695",
  appId: "1:1065595999695:web:6b7927a21066f46b792eba",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

export default app;

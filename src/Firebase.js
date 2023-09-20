import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpAtsAbl7JEpiS0QaUXWUEgQvtm9riWm4",
  authDomain: "imeet-marketplace.firebaseapp.com",
  projectId: "imeet-marketplace",
  storageBucket: "imeet-marketplace.appspot.com",
  messagingSenderId: "171093769647",
  appId: "1:171093769647:web:3c9cb35d997fed7851835a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

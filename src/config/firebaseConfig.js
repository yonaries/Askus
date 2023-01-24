import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDcV31RWIwfTHMQewFu9pWf9ZDf8grHY9E",
  authDomain: "movie-app-87a4d.firebaseapp.com",
  projectId: "movie-app-87a4d",
  storageBucket: "movie-app-87a4d.appspot.com",
  messagingSenderId: "951756567129",
  appId: "1:951756567129:web:3f4f4e8bb3a254b3fe3748",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);

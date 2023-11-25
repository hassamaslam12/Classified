import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyADejTs9nVGRwzLlvDL7XMoT-Q3ARTj9RU",
  authDomain: "e-commerce-dd9d5.firebaseapp.com",
  projectId: "e-commerce-dd9d5",
  storageBucket: "e-commerce-dd9d5.appspot.com",
  messagingSenderId: "782808209929",
  appId: "1:782808209929:web:10f13085749973cebfb6d8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const STORAGE = getStorage(app);

export{
  auth,database,STORAGE
}
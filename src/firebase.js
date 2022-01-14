import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDYNzuGaqs1BL2ZJ9lXpFOgEbvGXOmNwog",
  authDomain: "otonom-f1e18.firebaseapp.com",
  databaseURL: "https://otonom-f1e18-default-rtdb.firebaseio.com/",
  projectId: "otonom-f1e18",
  storageBucket: "otonom-f1e18.appspot.com",
  messagingSenderId: "620367793465",
  appId: "1:620367793465:web:e6f3f0d8e1f4e434a6ace8",
  measurementId: "G-NFK1QNS1NB"
};

const app = initializeApp(firebaseConfig);


export default app;

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
apiKey: "AIzaSyAwjCbvLcAvt02KhKnxILgd6NAPTZ5kX_Q",
  authDomain: "apps-fcca4.firebaseapp.com",
  databaseURL: "https://apps-fcca4-default-rtdb.firebaseio.com",
  projectId: "apps-fcca4",
  storageBucket: "apps-fcca4.firebasestorage.app",
  messagingSenderId: "550397806964",
  appId: "1:550397806964:web:30126cf2606f2e4eab0421",
  measurementId: "G-T7GYDQCGBP"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;

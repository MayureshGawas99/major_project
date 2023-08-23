import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set, get, update, remove, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAiRQAm5EDT1kecjmw_6jjDYCOJk4ytyRw",
  authDomain: "location-tracking-e1ee7.firebaseapp.com",
  databaseURL: "https://location-tracking-e1ee7-default-rtdb.firebaseio.com",
  projectId: "location-tracking-e1ee7",
  storageBucket: "location-tracking-e1ee7.appspot.com",
  messagingSenderId: "227536643894",
  appId: "1:227536643894:web:341fde91d8879eb0a03597",
  measurementId: "G-6Y8ELM7TH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// console.log(db);
const user = "mayuresh";
const lat = 10;
const lng = 20;
try {
  await set(ref(db, "Users/" + user), { cord: { lat, lng } });
} catch (error) {
  console.log(error);
}

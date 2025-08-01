import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


//   const DB_CONFIG ={
//   apiKey: "AIzaSyAXAIs7ErQT5ZxWfs3-gufvzCknj2AAk24",
//   authDomain: "coba2-876b1.firebaseapp.com",
//   databaseURL: "https://coba2-876b1-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "coba2-876b1",
//   storageBucket: "coba2-876b1.firebasestorage.app",
//   messagingSenderId: "873819054942",
//   appId: "1:873819054942:web:58cb418daf0ef297b2e5cf",
//   measurementId: "G-3GGND3QPB8"
// };


const DB_CONFIG = {
  apiKey: "AIzaSyBcQ1reTukrVZAHVfF1ACuTO5uMfH5nGHE",
  authDomain: "taayam-9bab6.firebaseapp.com",
  databaseURL: "https://taayam-9bab6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "taayam-9bab6",
  storageBucket: "taayam-9bab6.firebasestorage.app",
  messagingSenderId: "612969401904",
  appId: "1:612969401904:web:24becee2bc4280f82067f5",
  measurementId: "G-WH6C9NJPBD"
};



// // Your web app's Firebase configuration
// const DB_CONFIG = {
  // apiKey: "AIzaSyCeKpp7BtShNRBFno_zA7iA9jPYiWVRgAQ",
  // authDomain: "iotmencoba.firebaseapp.com",
  // databaseURL: "https://iotmencoba-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "iotmencoba",
  // storageBucket: "iotmencoba.firebasestorage.app",
  // messagingSenderId: "360250948706",
  // appId: "1:360250948706:web:019e944238fbed4ac0a53b"
// };
  const app = initializeApp(DB_CONFIG);
  const database = getDatabase(app);
  

  
// Initialize Firebase Authentication
const auth = getAuth(app);

// Sign in using email and password
const signInWithEmail = async () => {
const email = "taayam14@gmail.com"; // User email
const password = "S1dangjuli"; // User password

try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log("User signed in: ", user);

  // Now you can interact with the Firebase Realtime Database using `database`
  // For example, accessing data:
  // const userRef = ref(database, 'path/to/data');
  // onValue(userRef, snapshot => {
  //   console.log(snapshot.val());
  // });

  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

// Call the signIn function (you can call this in the appropriate lifecycle method)
signInWithEmail();
  export { database };
  
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQ-BbBQ6P_aresZO-nQYm5UlL0U9G0I78",
  authDomain: "visroment-assess.firebaseapp.com",
  projectId: "visroment-assess",
  storageBucket: "visroment-assess.firebasestorage.app",
  messagingSenderId: "492908927542",
  appId: "1:492908927542:web:fe529c3207532ba8411697",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signUp = document.getElementById("signup");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const name = document.getElementById("name").value;
  const auth = getAuth();
  const db = getFirestore(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const userData = {
        email: email,
        name: name,
      }
      showMessage("Sign up successful!", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
            window.location.href = "signup.html";
        })
        .catch((error) => {
          console.error("Error adding user data: ", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        showMessage("Email already in use. Please try another email.");
        console.error("Error signing up: ", errorCode, errorMessage);
        alert("Sign up failed: " + errorMessage);
      } else {
        showMessage("unable to create user", "signUpMessage");
      }
    });
});

const signIn = document.getElementById("signin");

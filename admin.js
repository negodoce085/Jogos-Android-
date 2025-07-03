import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoSsX3c__n6b4wrr7CQ660LGCXooAhtrk",
  authDomain: "jogosandroid-17706.firebaseapp.com",
  projectId: "jogosandroid-17706",
  storageBucket: "jogosandroid-17706.firebasestorage.app",
  messagingSenderId: "459781747366",
  appId: "1:459781747366:web:f90c9276a61cc03d487a67",
  measurementId: "G-HKSBXSLDDF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Erro no login: " + error.message);
  }
};

window.logout = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("adminPanel").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("logoutArea").classList.remove("hidden");
    document.getElementById("userEmail").textContent = user.email;
  } else {
    document.getElementById("adminPanel").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("logoutArea").classList.add("hidden");
  }
});

document.getElementById("addGameBtn").addEventListener("click", async () => {
  const title = document.getElementById("newTitle").value;
  const category = document.getElementById("newCategory").value;
  const image = document.getElementById("newImage").value;
  const download = document.getElementById("newLink").value;

  if (title && category && image && download) {
    await addDoc(collection(db, "jogos"), {
      title,
      category,
      image,
      download,
      rating: 0
    });
    alert("Jogo adicionado com sucesso!");
    document.getElementById("newTitle").value = "";
    document.getElementById("newCategory").value = "";
    document.getElementById("newImage").value = "";
    document.getElementById("newLink").value = "";
  }
});

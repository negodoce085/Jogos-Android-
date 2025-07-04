import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
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
let jogosRefs = [];

async function fetchGames() {
  const querySnapshot = await getDocs(collection(db, "jogos"));
  const games = [];
  jogosRefs = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    games.push({ ...data, id: docSnap.id });
    jogosRefs.push(docSnap.ref);
  });
  displayGames(games);
}

function displayGames(games) {
  const container = document.getElementById("gamesContainer");
  const search = document.getElementById("search").value.toLowerCase();
  container.innerHTML = "";
  games
    .filter(game => game.title.toLowerCase().includes(search))
    .forEach((game) => {
      const rating = game.rating || 0;
      const div = document.createElement("div");
      div.className = "bg-white dark:bg-gray-800 p-4 rounded shadow";
      div.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover rounded mb-2">
        <h2 class="text-xl font-semibold">${game.title}</h2>
        <p class="text-sm text-gray-500 capitalize">${game.category}</p>
        <div class="flex text-yellow-400 my-2">
          ${[1,2,3,4,5].map(star => `
            <i class="fas fa-star${star <= rating ? '' : '-o'} cursor-pointer" onclick="rateGame('${game.id}', ${star})"></i>
          `).join('')}
        </div>
        <a href="${game.download}" class="block bg-blue-600 text-white text-center px-3 py-2 rounded hover:bg-blue-800">⬇️ Baixar APK</a>
      `;
      container.appendChild(div);
    });
}

window.rateGame = async (gameId, star) => {
  const ref = jogosRefs.find(r => r.id === gameId);
  if (ref) {
    await updateDoc(ref, { rating: star });
    fetchGames();
  }
};

window.searchGames = () => fetchGames();
window.onload = () => {
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
    fetchGames();
  });
};

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

document.getElementById("addGameBtn").addEventListener("click", async () => {
  const title = document.getElementById("newTitle").value;
  const category = document.getElementById("newCategory").value;
  const image = document.getElementById("newImage").value;
  const download = document.getElementById("newLink").value;

  if (title && category && image && download) {
    await addDoc(collection(db, "jogos"), { title, category, image, download, rating: 0 });
    document.getElementById("newTitle").value = "";
    document.getElementById("newCategory").value = "";
    document.getElementById("newImage").value = "";
    document.getElementById("newLink").value = "";
    fetchGames();
  }
};

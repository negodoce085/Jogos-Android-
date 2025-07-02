let games = [
  { title: "Corrida Maluca", category: "corrida", image: "jogo1.jpg", rating: 3, download: "#" },
  { title: "Puzzle Master", category: "puzzle", image: "jogo2.jpg", rating: 4, download: "#" },
  { title: "Batalha Espacial", category: "ação", image: "jogo3.jpg", rating: 5, download: "#" },
  { title: "Desafio Mental", category: "puzzle", image: "jogo4.jpg", rating: 2, download: "#" }
];

let currentCategory = "todos";

function displayGames() {
  const container = document.getElementById("gamesContainer");
  const search = document.getElementById("search").value.toLowerCase();
  container.innerHTML = "";

  games
    .filter(game =>
      (currentCategory === "todos" || game.category === currentCategory) &&
      game.title.toLowerCase().includes(search)
    )
    .forEach((game, index) => {
      const div = document.createElement("div");
      div.className = "bg-white dark:bg-gray-800 p-4 rounded shadow";
      div.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover rounded mb-2">
        <h2 class="text-xl font-semibold">${game.title}</h2>
        <p class="text-sm text-gray-500 capitalize mb-1">${game.category}</p>
        <div class="flex text-yellow-400 mb-2">
          ${[1,2,3,4,5].map(star => `
            <i class="fas fa-star${star <= game.rating ? '' : '-o'} cursor-pointer" onclick="rateGame(${index}, ${star})"></i>
          `).join('')}
        </div>
        <a href="${game.download}" class="block text-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-800">⬇️ Baixar APK</a>
      `;
      container.appendChild(div);
    });
}

function filterCategory(cat) {
  currentCategory = cat;
  displayGames();
}

function searchGames() {
  displayGames();
}

function rateGame(index, rating) {
  games[index].rating = rating;
  displayGames();
}

function addGame() {
  const title = document.getElementById("newTitle").value;
  const category = document.getElementById("newCategory").value;
  const image = document.getElementById("newImage").value;
  const link = document.getElementById("newLink").value;
  if (title && category && image) {
    games.push({ title, category, image, rating: 0, download: link || "#" });
    displayGames();
    document.getElementById("newTitle").value = "";
    document.getElementById("newCategory").value = "";
    document.getElementById("newImage").value = "";
    document.getElementById("newLink").value = "";
  }
}

window.onload = displayGames;

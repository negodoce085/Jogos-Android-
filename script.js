const games = [
  { title: "Corrida Maluca", category: "corrida", image: "jogo1.jpg" },
  { title: "Puzzle Master", category: "puzzle", image: "jogo2.jpg" },
  { title: "Batalha Espacial", category: "ação", image: "jogo3.jpg" },
  { title: "Desafio Mental", category: "puzzle", image: "jogo4.jpg" },
];

let currentCategory = "todos";

function displayGames() {
  const container = document.getElementById("gamesContainer");
  const search = document.getElementById("search").value.toLowerCase();
  container.innerHTML = "";

  const filteredGames = games.filter(game =>
    (currentCategory === "todos" || game.category === currentCategory) &&
    game.title.toLowerCase().includes(search)
  );

  filteredGames.forEach(game => {
    const div = document.createElement("div");
    div.className = "bg-white dark:bg-gray-800 p-4 rounded shadow";
    div.innerHTML = `
      <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover rounded mb-2">
      <h2 class="text-xl font-semibold">${game.title}</h2>
      <p class="text-sm text-gray-500 capitalize">${game.category}</p>
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

window.onload = displayGames;

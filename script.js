const jogos = [
  {
    nome: "Corrida Extrema",
    categoria: "Corrida",
    imagem: "jogo1.jpg",
    descricao: "Participe de corridas emocionantes com gráficos incríveis.",
  },
  {
    nome: "Guerra Espacial",
    categoria: "Ação",
    imagem: "jogo2.jpg",
    descricao: "Lute contra invasores alienígenas em batalhas épicas.",
  },
  {
    nome: "Desafio Mental",
    categoria: "Quebra-cabeça",
    imagem: "jogo3.jpg",
    descricao: "Exercite sua mente com desafios e enigmas complexos.",
  },
  {
    nome: "Campeonato de Futebol",
    categoria: "Esporte",
    imagem: "jogo4.jpg",
    descricao: "Participe de campeonatos emocionantes e vença seu time rival.",
  },
];

function renderizarJogos(lista) {
  const container = document.getElementById("gamesContainer");
  container.innerHTML = "";
  lista.forEach((jogo) => {
    container.innerHTML += `
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow p-5 hover:-translate-y-1 transition-transform">
        <div class="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-2">
          <i class="fas fa-tag"></i> ${jogo.categoria}
        </div>
        <h2 class="text-xl font-semibold text-primary mb-2">${jogo.nome}</h2>
        <img src="${jogo.imagem}" alt="${jogo.nome}" class="rounded-lg mb-4" />
        <p class="text-sm mb-4">${jogo.descricao}</p>
        <a class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold inline-block text-center" href="#">Baixar APK</a>
      </div>
    `;
  });
}

function filtrarJogos() {
  const termo = document.getElementById("searchInput").value.toLowerCase();
  const filtrados = jogos.filter(
    (jogo) =>
      jogo.nome.toLowerCase().includes(termo) ||
      jogo.categoria.toLowerCase().includes(termo)
  );
  renderizarJogos(filtrados);
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

renderizarJogos(jogos);

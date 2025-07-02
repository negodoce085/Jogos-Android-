fetch('games.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('gamesContainer');
    games.forEach(game => {
      const div = document.createElement('div');
      div.className = 'game';
      div.innerHTML = `
        <h2>${game.titulo}</h2>
        <img src="${game.imagem}" alt="${game.titulo}">
        <p>${game.descricao}</p>
        <a class="download-button" href="${game.link}" target="_blank">Baixar APK</a>
      `;
      container.appendChild(div);
    });
  });
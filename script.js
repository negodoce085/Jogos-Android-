
document.getElementById('searchInput').addEventListener('input', function () {
  const term = this.value.toLowerCase();
  const games = document.querySelectorAll('#gamesContainer .relative');
  games.forEach((game) => {
    const title = game.querySelector('h2').textContent.toLowerCase();
    const category = game.querySelector('div').textContent.toLowerCase();
    game.style.display = title.includes(term) || category.includes(term) ? '' : 'none';
  });
});

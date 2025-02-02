import ViewFilm from '../Views/film';
import setupLanguageSelector from './utils/language-selector';
import setupListManagement from './utils/list-management-film';

const text = {
  'fr-FR': {
    addWatchlist: 'Ajouter à la Watchlist',
    removeWatchlist: 'Retirer de la watchlist'
  },
  'en-US': {
    addWatchlist: 'Add to watchlist',
    removeWatchlist: 'Remove from watchlist'
  },
  'de-DE': {
    addWatchlist: 'Zur Watchlist hinzufügen',
    removeWatchlist: 'Aus der Watchlist entfernen'
  },
  'es-ES': {
    addWatchlist: 'Añadir a la Watchlist',
    removeWatchlist: 'Quitar de la Watchlist'
  }
};

const Film = class Film {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;

    this.run();
  }

  setupWatchlistButton() {
    const watchlistBtn = document.querySelector('.watchlist-btn');
    const currentLang = localStorage.getItem('language') || 'fr-FR';

    if (watchlistBtn) {
      watchlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
        if (!lists.watchlist) {
          lists.watchlist = [];
        }

        const index = lists.watchlist.findIndex((f) => f.id === this.Film.id);
        if (index === -1) {
          lists.watchlist.push(this.Film);
          watchlistBtn.textContent = text[currentLang].removeWatchlist;
          watchlistBtn.classList.remove('btn-success');
          watchlistBtn.classList.add('btn-danger');
        } else {
          lists.watchlist.splice(index, 1);
          watchlistBtn.textContent = text[currentLang].addWatchlist;
          watchlistBtn.classList.remove('btn-danger');
          watchlistBtn.classList.add('btn-success');
        }

        localStorage.setItem('filmLists', JSON.stringify(lists));
      });
    }
  }

  async render() {
    if (!this.Film) return;

    this.el.innerHTML = ViewFilm(this.Film);

    setupLanguageSelector();
    setupListManagement(this.Film, () => this.render());
    this.setupWatchlistButton();
  }

  async run() {
    const { id } = this.params;

    const url = `https://api.themoviedb.org/3/movie/${id}?language=${localStorage.getItem('language')}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tmdb_token')}`
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      this.Film = data;
      console.log('Données du film :', this.Film);
      this.render();
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }
};

export default Film;

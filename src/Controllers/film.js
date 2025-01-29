import ViewFilm from '../Views/film';
import { showModal, promptModal } from '../Views/film/modal';

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

  setupLanguageSelector() {
    const languageItems = document.querySelectorAll('[data-lang]');
    const languageButton = document.querySelector('#languageSelector');

    languageItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const { lang } = e.target.dataset;
        localStorage.setItem('language', lang);
        languageButton.textContent = e.target.textContent;
        this.currentLang = lang;
        window.location.reload();
      });
    });
  }

  async setupListManagement() {
    document.querySelectorAll('.create-list').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const film = this.Film;

        const listName = await promptModal('Enter list name:');
        if (listName && film) {
          const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
          lists[listName] = [film];
          localStorage.setItem('filmLists', JSON.stringify(lists));
          await showModal('List created and film added!');
          this.render();
        }
      });
    });

    document.querySelectorAll('.add-to-list').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const { list } = e.target.dataset;
        const film = this.Film;

        if (film) {
          const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
          if (!lists[list].some((f) => f.id === film.id)) {
            lists[list].push(film);
            localStorage.setItem('filmLists', JSON.stringify(lists));
            await showModal('Film added to list!');
          } else {
            await showModal('Film already in list!');
          }
        }
      });
    });
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

  render() {
    const {
      title,
      release_date: releaseDate,
      poster_path: posterPath,
      origin_country: originCountry,
      overview,
      tagline,
      id
    } = this.Film;
    this.el.innerHTML = `
      <div class="container-fluid">
        ${ViewFilm(title, releaseDate, posterPath, originCountry, overview, tagline, id)}
      </div>
    `;

    this.setupLanguageSelector();
    this.setupListManagement();
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

    const response = await fetch(url, options);
    const data = await response.json();
    this.Film = data;
    this.render();
  }
};

export default Film;

import ViewFilm from '../Views/film';
// import ListsFilms from './lists-films';

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

  setupListManagement() {
    document.querySelectorAll('.create-list').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // const { filmId } = e.target.closest('.dropdown-menu').dataset;
        // Use this.Film instead of this.Films.find
        const film = this.Film;

        const listName = prompt('Enter list name:');
        if (listName && film) {
          try {
            const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
            lists[listName] = [film];
            localStorage.setItem('filmLists', JSON.stringify(lists));
            alert('List created and film added!');
            this.render();
          } catch (error) {
            console.error('Error creating list:', error);
            alert(error.message);
          }
        }
      });
    });

    document.querySelectorAll('.add-to-list').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const { list } = e.target.dataset;
        // Use this.Film directly
        const film = this.Film;

        if (film) {
          try {
            const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
            if (!lists[list].some((f) => f.id === film.id)) {
              lists[list].push(film);
              localStorage.setItem('filmLists', JSON.stringify(lists));
              alert('Film added to list!');
            } else {
              alert('Film already in list!');
            }
          } catch (error) {
            console.error('Error adding to list:', error);
            alert(error.message);
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

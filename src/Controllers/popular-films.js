import ViewNav from '../Views/popular-films/nav';
import ViewFilms from '../Views/popular-films';
import ViewNumberPage from '../Views/popular-films/nav-page';
// import ControllerListsFilms from './lists-films';

const PopularFilms = class PopularFilms {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.currentLang = localStorage.getItem('language');
    this.params = params;
    this.Films = [];

    if (!this.params.page) {
      window.location.href = '/popular-films?page=1';
      return;
    }

    this.run();
  }

  onKeyPress() {
    const elSearchInput = document.querySelector('input[type="search"]');
    const elPageNumber = document.querySelector('#pageNumber');
    const currentPage = parseInt(this.params.page, 10);

    const navigateToPage = (newPage) => {
      if (newPage < 1) return;
      elPageNumber.textContent = newPage;
      window.location.href = `/popular-films?page=${newPage}`;
    };

    document.querySelector('#nextPage').addEventListener('click', (event) => {
      event.preventDefault();
      navigateToPage(currentPage + 1);
    });

    document.querySelector('#previousPage').addEventListener('click', (event) => {
      event.preventDefault();
      navigateToPage(currentPage - 1);
    });

    elSearchInput.addEventListener('keyup', async (event) => {
      const value = event.target.value.toLowerCase();
      if (!value) {
        this.el.querySelector('#Films').innerHTML = ViewFilms(this.Films);
        return;
      }

      try {
        this.el.querySelector('#Films').innerHTML = '<div class="loading">Searching...</div>';
        const results = await this.searchMovies(value);
        this.el.querySelector('#Films').innerHTML = ViewFilms(results);
      } catch (error) {
        this.el.querySelector('#Films').innerHTML = '<div class="error">Search failed. Please try again.</div>';
        console.error('Search error:', error);
      }
    });
  }

  async searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tmdb_token')}`
      }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  }

  setupLanguageSelector() {
    const languageItems = document.querySelectorAll('[data-lang]');
    const languageButton = document.querySelector('#languageSelector');

    languageItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const { lang } = event.target.dataset;
        localStorage.setItem('language', lang);
        languageButton.textContent = event.target.textContent;
        this.currentLang = lang;
        window.location.reload();
      });
    });
  }

  setupListManagement() {
    document.querySelectorAll('.create-list').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const { filmId } = e.target.closest('.dropdown-menu').dataset;
        const film = this.Films.find((f) => f.id.toString() === filmId);

        const listName = prompt('Enter list name:');
        if (listName && film) {
          try {
            const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
            lists[listName] = [film]; // Initialize list with current film
            localStorage.setItem('filmLists', JSON.stringify(lists));
            alert('List created and film added!');
            this.render();
          } catch (error) {
            alert(error.message);
          }
        }
      });
    });

    document.querySelectorAll('.add-to-list').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const { list } = e.target.dataset;
        const { filmId } = e.target.closest('.dropdown-menu').dataset;

        const film = this.Films.find((f) => f.id.toString() === filmId);
        if (film) {
          try {
            const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
            if (!lists[list].some((f) => f.id === film.id)) {
              lists[list].push(film);
              localStorage.setItem('filmLists', JSON.stringify(lists));
              alert('Film added to list!');
            }
          } catch (error) {
            alert(error.message);
          }
        }
      });
    });
  }

  render() {
    this.el.innerHTML = `
      ${ViewNav()}
      <div id="Films" class="container-fluid">
        ${ViewFilms(this.Films)}
      </div>
      ${ViewNumberPage(this.params.page)}
    `;

    this.setupLanguageSelector();
    this.setupListManagement();
    this.onKeyPress();
  }

  async run() {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${localStorage.getItem('language')}&page=${this.params.page}&sort_by=popularity.desc`;
    // const url = `https://api.themoviedb.org/3/movie/popular?language=${localStorage.getItem('language')}&page=${this.params.page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tmdb_token')}`
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log('data : ', data);
    this.Films = data.results;

    console.log('this.Films: ', this.Films);
    this.render();
  }
};

export default PopularFilms;

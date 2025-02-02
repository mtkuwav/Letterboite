import ViewNav from '../Views/popular-films/nav';
import ViewFilms from '../Views/popular-films';
import ViewNumberPage from '../Views/popular-films/nav-page';
import setupLanguageSelector from './utils/language-selector';
import setupListManagement from './utils/list-management-popular-films';

const text = {
  'fr-FR': {
    activateAdult: 'Films pour adultes : activé',
    deactivateAdult: 'Films pour adultes : désactivé'
  },
  'en-US': {
    activateAdult: 'Adult movies : On',
    deactivateAdult: 'Adult movies : Off'
  },
  'de-DE': {
    activateAdult: 'Filme für Erwachsene: aktiviert',
    deactivateAdult: 'Filme für Erwachsene: deaktiviert'
  },
  'es-ES': {
    activateAdult: 'Películas para adultos: habilitadas',
    deactivateAdult: 'Películas para adultos: discapacitados'
  }
};

const PopularFilms = class PopularFilms {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.currentLang = localStorage.getItem('language');
    this.params = params;
    this.Films = [];

    if (!localStorage.getItem('adult')) {
      localStorage.setItem('adult', 'false');
    }

    if (!this.params.page) {
      window.location.href = '/popular-films?page=1';
      return;
    }

    this.run();
  }

  setupAdultFilter() {
    const toggleBtn = document.querySelector('.toggle-adult');
    const currentLang = localStorage.getItem('language') || 'fr-FR';
    const isAdultEnabled = localStorage.getItem('adult') === 'true';
    const currentUrl = new URL(window.location.href);

    if (toggleBtn) {
      // Sync button state with localStorage
      if (isAdultEnabled) {
        toggleBtn.textContent = text[currentLang].deactivateAdult;
        toggleBtn.classList.remove('btn-success');
        toggleBtn.classList.add('btn-danger');
        currentUrl.searchParams.set('include_adult', 'true');
      } else {
        toggleBtn.textContent = text[currentLang].activateAdult;
        toggleBtn.classList.remove('btn-danger');
        toggleBtn.classList.add('btn-success');
        currentUrl.searchParams.set('include_adult', 'false');
      }

      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newAdultState = !isAdultEnabled;
        localStorage.setItem('adult', newAdultState);
        currentUrl.searchParams.set('include_adult', newAdultState);
        window.location.href = currentUrl.toString();
      });
    }
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
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=${localStorage.getItem('adult')}`;
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

  async render() {
    this.el.innerHTML = `
      ${ViewNav()}
      <div id="Films" class="container-fluid">
        ${ViewFilms(this.Films)}
      </div>
      ${ViewNumberPage(this.params.page)}
    `;

    setupLanguageSelector();
    this.setupAdultFilter();

    setupListManagement(this.Films, () => this.render());

    this.onKeyPress();
  }

  async run() {
    const isAdultEnabled = localStorage.getItem('adult') === 'true';
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=${isAdultEnabled}&include_video=false&language=${localStorage.getItem('language')}&page=${this.params.page}&sort_by=popularity.desc`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tmdb_token')}`
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    this.Films = data.results;

    this.render();
  }
};

export default PopularFilms;

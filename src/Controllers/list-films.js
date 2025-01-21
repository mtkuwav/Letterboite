import ViewNav from '../Views/list-films/nav';
import ViewFilms from '../Views/list-films';
import ViewNumberPage from '../Views/list-films/nav-page';

const ListFilms = class ListFilms {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.currentLang = localStorage.getItem('language');
    this.params = params;
    this.Films = [];

    if (!this.params.page) {
      window.location.href = '/list-films?page=1';
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
      window.location.href = `/list-films?page=${newPage}`;
    };

    document.querySelector('#nextPage').addEventListener('click', (event) => {
      event.preventDefault();
      navigateToPage(currentPage + 1);
    });

    document.querySelector('#previousPage').addEventListener('click', (event) => {
      event.preventDefault();
      navigateToPage(currentPage - 1);
    });

    elSearchInput.addEventListener('keyup', (event) => {
      const value = event.target.value.toLowerCase();
      const filteredFilms = this.Films.filter((film) => film.title
        .toLowerCase()
        .includes(value));
      this.el.querySelector('#Films').innerHTML = ViewFilms(filteredFilms);
    });
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

  render() {
    this.el.innerHTML = `
      ${ViewNav()}
      <div id="Films" class="container-fluid">
        ${ViewFilms(this.Films)}
      </div>
      ${ViewNumberPage(this.params.page)}
    `;

    this.setupLanguageSelector();
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

export default ListFilms;

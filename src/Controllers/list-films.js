import ViewNav from '../Views/list-films/nav';
import ViewFilms from '../Views/list-films';

const ListFilms = class ListFilms {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.currentLang = localStorage.getItem('language');
    this.params = params;
    this.Films = [];

    this.run();
  }

  onKeyPress() {
    const elSearchInput = document.querySelector('input[type="search"]');

    elSearchInput.addEventListener('keyup', (event) => {
      const value = event.target.value.toLocaleLowerCase();

      const Films = this.Films.filter(
        (user) => user.name.first.toLocaleLowerCase().search(value) >= 0
      );

      const elContainer = this.el.querySelector('#Films');
      elContainer.innerHTML = ViewFilms(Films);
    });
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

  render() {
    this.el.innerHTML = `
      ${ViewNav()}
      <div id="Films" class="container-fluid">
        ${ViewFilms(this.Films)}
      </div>
    `;

    this.setupLanguageSelector();
  }

  async run() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=${localStorage.getItem('language')}`;
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

    console.log('this.Films: ', this.Films);
    this.render();
  }
};

export default ListFilms;

import ViewFilm from '../Views/film';

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

  render() {
    const {
      title,
      release_date: releaseDate,
      poster_path: posterPath,
      origin_country: originCountry,
      overview,
      tagline
    } = this.Film;
    this.el.innerHTML = `
      <div class="container-fluid">
        ${ViewFilm(title, releaseDate, posterPath, originCountry, overview, tagline)}
      </div>
    `;

    this.setupLanguageSelector();
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

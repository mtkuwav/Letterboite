import ViewFilm from '../Views/film';

const Film = class Film {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;

    console.log('hello');

    this.run();
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
    return `
      <div class="container-fluid">
        ${ViewFilm(title, releaseDate, posterPath, originCountry, overview, tagline)}
      </div>
    `;
  }

  async run() {
    const { id } = this.params;

    console.log(id);

    const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
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
      this.el.innerHTML = this.render();
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }
};

export default Film;

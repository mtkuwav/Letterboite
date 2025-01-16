import ViewNav from '../Views/list-films/nav';
import ViewFilms from '../Views/list-films';

const ListFilms = class ListFilms {
  constructor(params) {
    this.el = document.querySelector('#app');
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

  render() {
    return `
      ${ViewNav()}
      <div id="Films" class="container-fluid">
        ${ViewFilms(this.Films)}
      </div>
    `;
  }

  async run() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
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
    this.el.innerHTML = this.render();
  }
};

export default ListFilms;

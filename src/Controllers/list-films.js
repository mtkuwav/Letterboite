import axios from 'axios';

import ViewNav from '../Views/list-films/nav';
import ViewUsers from '../Views/list-films';

const apiKey = document.querySelector('#token');
const url = 'https://api.themoviedb.org/3/movie/popular';

const ListUsers = class ListUsers {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;
    this.users = [];

    this.run();
  }

  onKeyPress() {
    const elSearchInput = document.querySelector('input[type="search"]');

    elSearchInput.addEventListener('keyup', (event) => {
      const value = event.target.value.toLocaleLowerCase();

      const users = this.users.filter(
        (user) => user.name.first.toLocaleLowerCase().search(value) >= 0
      );

      const elContainer = this.el.querySelector('#users');
      elContainer.innerHTML = ViewUsers(users);
    });
  }

  render() {
    return `
      ${ViewNav()}
      <div id="users" class="container-fluid">
        ${ViewUsers(this.users)}
      </div>
    `;
  }

  async run() {
    try {
      const response = await axios.get(url, {
        params: {
          api_key: apiKey,
          language: 'fr-FR',
          page: '1'
        }
      });

      this.users = response.data.results;
      this.el.innerHTML = this.render();
      this.onKeyPress();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
    }
  }
};

export default ListUsers;

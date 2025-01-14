import axios from 'axios';

import ViewNav from '../Views/list-users/nav';
import ViewUsers from '../Views/list-users';

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

  run() {
    axios
      .get('https://randomuser.me/api/', {
        params: {
          results: this.params.results
        }
      })
      .then((res) => {
        const { data } = res;

        this.users = data.results;

        this.el.innerHTML = this.render();
        this.onKeyPress();
      });
  }
};

export default ListUsers;

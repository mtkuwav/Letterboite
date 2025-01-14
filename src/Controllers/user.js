import ViewUser from '../Views/user';

const User = class User {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;

    this.run();
  }

  render() {
    const { first, last, picture } = this.params;

    return `
      <div class="container-fluid">
        ${ViewUser(first, last, picture)}
      </div>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default User;

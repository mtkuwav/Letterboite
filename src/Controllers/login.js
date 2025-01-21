import axios from 'axios';

import ViewForm from '../Views/login/login';

const LoginUser = class LoginUser {
  constructor() {
    this.el = document.querySelector('#app');

    const token = localStorage.getItem('tmdb_token');
    if (token) {
      window.location.href = '/list-films';
      return;
    }

    this.render();
  }

  render() {
    this.el.innerHTML = `
    <div class="container-fluid">
      ${ViewForm()}
    </div>
    `;
    this.run();
  }

  async validateToken(token) {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      });
      return response.status === 200;
    } catch (error) {
      alert(`Token validation failed: ${error.message}. Try with another.`);
      return false;
    }
  }

  run() {
    const form = document.querySelector('form');
    const input = document.querySelector('#token');

    if (!form || !input) {
      console.error('Form elements not found');
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = input.value;

      const isValid = await this.validateToken(token);

      if (isValid) {
        localStorage.setItem('tmdb_token', token);
        window.location.href = '/list-films?page=1';
      } else {
        input.classList.add('is-invalid');
        const feedback = document.querySelector('.invalid-feedback');
        if (feedback) feedback.remove();
        input.insertAdjacentHTML(
          'afterend',
          '<div class="invalid-feedback">Token invalide</div>'
        );
      }
    });
  }
};

export default LoginUser;

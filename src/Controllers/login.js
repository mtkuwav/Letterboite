import ViewForm from '../Views/login/login';

const LoginUser = class LoginUser {
  constructor() {
    this.el = document.querySelector('#app');

    const token = localStorage.getItem('tmdb_token');
    if (token) {
      window.location.href = '/popular-films';
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
    const url = 'https://api.themoviedb.org/3/authentication';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status_message || 'Authentication failed');
      }

      return response.status === 200;
    } catch (error) {
      console.error('Token validation failed:', error);
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
        window.location.href = '/popular-films';
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

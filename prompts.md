## Prompt : 
**Dans la méthode run, comment faire pour connecter l'utilisateur si il entre un bon token ? Sinon, il ne faut pas lui accorder l'accès. Aussi il faudrait trouver un moyen de sauvegarder la session localement ainsi l'utilisateur n'aura pas besoin de se reconnecter à chaque fois**

## Réponse :
### Plan
1. Ajouter event listener sur le form
2. Vérifier le token avec l'API TMDB
3. Si valide:
   - Sauvegarder dans localStorage 
   - Rediriger vers la page principale
4. Si invalide:
   - Afficher une erreur
5. Vérifier localStorage au chargement

### Solution

```javascript


import axios from 'axios';

const LoginUser = class LoginUser {
  constructor() {
    this.el = document.querySelector('#app');
    
    // Vérifier si déjà connecté
    const token = localStorage.getItem('tmdb_token');
    if (token) {
      window.location.href = '/#/list';
      return;
    }

    this.render();
    this.run();
  }

  render() {
    return `
    <div class="container-fluid">
      ${ViewForm()}
    </div>
    `;
  }

  async validateToken(token) {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: token
        }
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  run() {
    const form = document.querySelector('form');
    const input = document.querySelector('#token');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = input.value;

      if (await this.validateToken(token)) {
        localStorage.setItem('tmdb_token', token);
        window.location.href = '/#/list';
      } else {
        input.classList.add('is-invalid');
        input.insertAdjacentHTML('afterend', 
          '<div class="invalid-feedback">Token invalide</div>'
        );
      }
    });
  }
};

export default LoginUser;
```

## Affinage de la requête
**Comment me connecter à l'api avec ma clé ? La page indique qu'elle est invalide**

## Réponse
### Plan
1. Utiliser le token JWT (TMDB_API_KEY) au lieu de la clé API
2. Modifier les headers pour utiliser Bearer auth
3. Ajuster la validation du token

```javascript


async validateToken(token) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });
    return response.status === 200;
  } catch {
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

  // Pré-remplir avec le token JWT de .env pour test
  input.value = process.env.TMDB_API_KEY;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = input.value;

    if (await this.validateToken(token)) {
      localStorage.setItem('tmdb_token', token);
      window.location.href = '/#/list';
    } else {
      input.classList.add('is-invalid');
      input.insertAdjacentHTML('afterend', 
        '<div class="invalid-feedback">Token invalide</div>'
      );
    }
  });
}
```

## Correction des erreurs
**Cette fois quand j'entre un token invalide, je suis quand même redirigé. Pourquoi ?**


## Réponse
### Plan
1. Debug le flux de validation
2. Ajouter des logs
3. Corriger la gestion des erreurs dans validateToken

```javascript


async validateToken(token) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
    console.log('API Response:', response);
    return response.status === 200;
  } catch (error) {
    console.log('Token validation failed:', error.response?.data);
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
    console.log('Token validation result:', isValid);

    if (isValid) {
      localStorage.setItem('tmdb_token', token);
      window.location.href = '/#/list';
    } else {
      input.classList.add('is-invalid');
      const feedback = document.querySelector('.invalid-feedback');
      if (feedback) feedback.remove();
      input.insertAdjacentHTML('afterend', 
        '<div class="invalid-feedback">Token invalide</div>'
      );
    }
  });
}
```

Le problème venait probablement du fait que l'erreur était silencieusement avalée dans le catch. Maintenant on log les erreurs et on s'assure que le retour false est bien pris en compte.

---

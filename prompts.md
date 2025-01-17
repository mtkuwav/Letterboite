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
___

## Prompt :
**J'aimerais faire en sorte que lorsque l'on clique sur le bouton "voir plus" quand on est sur /list-user, cela amène l'utilisateur vers une page contenant les infos détaillées par du film en question. J'arrive bien à récupérer l'ID puisqu'il s'affiche dans l'url, mais lorsque j'y accède j'ai une page blanche et je ne vois aucun log dans la console. J'imagine que je ne suis pas bien redirigé, comment puis-je corriger cela ?**


## Réponse
### Plan
1. Corriger les routes dans src/index.js
2. Ajuster le lien dans la vue des films
3. Corriger le Controller Film pour afficher les détails

### Solution

1. Corriger src/index.js


```javascript
const routes = [{
  url: '/login',
  controller: ControllerLogin
}, {
  url: '/list-films',
  controller: ControllerListFilms
}, {
  url: '/film',  // Remove #
  controller: ControllerFilm
}];
```

2. Ajuster src/Views/list-films/index.js


```javascript
return (`
  <div class="col-2 mt-4" id="Films">
    <div class="card">
      <img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card-img-top" alt="poster">
      <div class="card-body text-center">
        <h5 class="card-title">${title}</h5>
        <p>Date de sortie: ${new Date(releaseDate).toLocaleDateString('fr')}</p>
        <a
          href="/film?id=${id}"
          class="btn btn-primary"
        >Voir plus</a>
      </div>
    </div>
  </div>
`);
```

3. Corriger src/Controllers/film.js


```javascript
render() {
  const { title, release_date: releaseDate, poster_path: posterPath } = this.Film;
  return `
    <div class="container-fluid">
      ${ViewFilm(title, releaseDate, posterPath)}
    </div>
  `;
}

async run() {
  const { id } = this.params;
  
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
    this.el.innerHTML = this.render();
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}
```

Les changements clés:
- Suppression des # dans les URLs
- Correction du traitement des données dans le controller Film
- Meilleure gestion des erreurs
- Correction du render pour utiliser les bonnes propriétés du film
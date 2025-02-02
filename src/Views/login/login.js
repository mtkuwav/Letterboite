const translations = {
  'fr-FR': {
    login: 'Connexion',
    token: 'Jeton',
    enterToken: 'Entrez votre jeton',
    submit: 'Valider'
  },
  'en-US': {
    login: 'Login',
    token: 'Token',
    enterToken: 'Enter your token',
    submit: 'Submit'
  },
  'de-DE': {
    login: 'Anmelden',
    token: 'Token',
    enterToken: 'Geben Sie Ihren Token ein',
    submit: 'Bestätigen'
  },
  'es-ES': {
    login: 'Iniciar sesión',
    token: 'Token',
    enterToken: 'Ingrese su token',
    submit: 'Enviar'
  }
};

const languageMap = {
  'fr-FR': '🇫🇷 Français',
  'en-US': '🇺🇸 English',
  'de-DE': '🇩🇪 Deutsch',
  'es-ES': '🇪🇸 Español'
};

export default () => {
  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];
  const langText = languageMap[currentLang] || languageMap['fr-FR'];

  return `
  <div class="container">
  <nav class="navbar navbar-expand-lg text-light bg-dark border-bottom border-body">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand text-light" href="/popular-films">Letterboîte</a>
      </div>
      <div class="dropdown">
        <button 
          class="btn btn-secondary dropdown-toggle" 
          type="button" 
          id="languageSelector" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          ${langText}
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageSelector">
          <li><a class="dropdown-item" href="" data-lang="fr-FR">🇫🇷 Français</a></li>
          <li><a class="dropdown-item" href="" data-lang="en-US">🇺🇸 English</a></li>
          <li><a class="dropdown-item" href="" data-lang="de-DE">🇩🇪 Deutsch</a></li>
          <li><a class="dropdown-item" href="" data-lang="es-ES">🇪🇸 Español</a></li>
        </ul>
      </div>
    </div>
    </div>
  </nav>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h3>${text.login}</h3>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="token">${text.token}</label>
                <input type="text" class="form-control" id="token" placeholder="${text.enterToken}">
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">${text.submit}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};

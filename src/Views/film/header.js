export default () => {
  const languageMap = {
    'fr-FR': '🇫🇷 Français',
    'en-US': '🇺🇸 English',
    'de-DE': '🇩🇪 Deutsch',
    'es-ES': '🇪🇸 Español'
  };

  const translations = {
    'fr-FR': {
      seeLists: 'Voir vos listes'
    },
    'en-US': {
      seeLists: 'See your lists'
    },
    'de-DE': {
      seeLists: 'Ihre Listen ansehen'
    },
    'es-ES': {
      seeLists: 'Ver tus listas'
    }
  };

  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const langText = languageMap[currentLang] || languageMap['fr-FR'];
  const text = translations[currentLang];

  return `
  <nav class="navbar navbar-expand-lg text-light bg-dark border-bottom border-body">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand text-light" href="/popular-films">Letterboîte</a>
      </div>
      <a href="/lists-films"><button type="button" class="btn btn-success">${text.seeLists}</button></a>
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
`;
};

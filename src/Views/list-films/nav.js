export default () => {
  const currentLang = localStorage.getItem('language') || 'fr';
  const langText = currentLang === 'fr' ? 'Français' : 'English';

  return `
  <nav class="navbar navbar-expand-lg text-light bg-dark border-bottom border-body">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand text-light" href="#">Letterboîte</a>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        </form>
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
          <li><a class="dropdown-item" href="" data-lang="fr-FR">Français</a></li>
          <li><a class="dropdown-item" href="" data-lang="en-US">English</a></li>
        </ul>
      </div>
    </div>
    </div>
  </nav>
`;
};

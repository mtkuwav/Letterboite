import ViewHeader from './header';

const translations = {
  'fr-FR': {
    info: 'Infos !',
    releaseDate: 'Date de sortie',
    summary: 'Résumé',
    originCountry: 'Pays d\'origine',
    website: 'Site web',
    budget: 'Budget',
    revenue: 'Revenus',
    vote: 'Note',
    back: 'Retour',
    addList: 'Ajouter à une liste',
    createList: 'Créer une nouvelle liste',
    addWatchlist: 'Ajouter à la Watchlist',
    removeWatchlist: 'Retirer de la watchlist'
  },
  'en-US': {
    info: 'Info!',
    releaseDate: 'Release date',
    summary: 'Summary',
    originCountry: 'Origin country',
    website: 'Website',
    budget: 'Budget',
    revenue: 'Revenue',
    vote: 'Note',
    back: 'Back',
    addList: 'Add to list',
    createList: 'Create a new list',
    addWatchlist: 'Add to watchlist',
    removeWatchlist: 'Remove from watchlist'
  },
  'de-DE': {
    info: 'Info!',
    releaseDate: 'Veröffentlichungsdatum',
    summary: 'Zusammenfassung',
    originCountry: 'Herkunftsland',
    website: 'Webseite',
    budget: 'Budget',
    revenue: 'Einkommen',
    vote: 'Notiz',
    back: 'Zurück',
    addList: 'Zur Liste hinzufügen',
    createList: 'Erstellen einer neuen Liste',
    addWatchlist: 'Zur Watchlist hinzufügen',
    removeWatchlist: 'Aus der Watchlist entfernen'
  },
  'es-ES': {
    info: '¡Información!',
    releaseDate: 'Fecha de lanzamiento',
    summary: 'Resumen',
    originCountry: 'País de origen',
    website: 'Sitio web',
    budget: 'Presupuesto',
    revenue: 'Ingreso',
    vote: 'Nota',
    back: 'Volver',
    addList: 'Añadir a la lista',
    createList: 'Crear una nueva lista',
    addWatchlist: 'Añadir a la Watchlist',
    removeWatchlist: 'Quitar de la Watchlist'
  }
};

const ViewFilm = (film) => {
  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];
  const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');

  const watchlist = lists.watchlist || [];
  const isInWatchlist = watchlist.some((f) => f.id === film.id);
  const watchlistBtnClass = isInWatchlist ? 'btn-danger' : 'btn-success';
  const watchlistBtnText = isInWatchlist ? text.removeWatchlist : text.addWatchlist;

  return `
    ${ViewHeader()}
    <div class="container py-5">
      <div class="row g-4">
        <!-- Poster Column -->
        <div class="col-md-4">
          <div class="position-relative">
            <img 
              src="https://image.tmdb.org/t/p/w500${film.poster_path}"
              class="img-fluid rounded shadow-lg hover-scale"
              alt="${film.title}"
            >
          </div>
        </div>

        <!-- Info Column -->
        <div class="col-md-8">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/popular-films?page=1" class="text-decoration-none">
                  <i class="fas fa-arrow-left me-2"></i>${text.back}
                </a>
              </li>
            </ol>
          </nav>

          <h1 class="display-4 mb-4 fw-bold">${film.title}</h1>
          
          <div class="mb-4">
            <span class="badge bg-primary me-2">
              <i class="fas fa-star me-1"></i>${film.vote_average.toFixed(1)}
            </span>
            <span class="text-muted">
              <i class="far fa-calendar me-1"></i>${new Date(film.release_date).toLocaleDateString(currentLang)}
            </span>
          </div>

          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <h5 class="card-title mb-3">
                <i class="fas fa-info-circle me-2"></i>${text.summary}
              </h5>
              <p class="card-text lead">${film.overview || 'No overview available.'}</p>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-sm-6">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">
                    <i class="fas fa-globe me-2"></i>${text.originCountry}
                  </h6>
                  <p class="card-text">${film.production_countries.map((country) => country.name).join(', ') || '-'}</p>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">
                    <i class="fas fa-link me-2"></i>${text.website}
                  </h6>
                  <p class="card-text">
                    ${film.homepage ? `<a href="${film.homepage}" target="_blank" class="text-decoration-none">${film.homepage}</a>` : '-'}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">
                    <i class="fas fa-money-bill me-2"></i>${text.budget}
                  </h6>
                  <p class="card-text">${film.budget.toLocaleString(currentLang, { style: 'currency', currency: 'USD' })}</p>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">
                    <i class="fas fa-chart-line me-2"></i>${text.revenue}
                  </h6>
                  <p class="card-text">${film.revenue.toLocaleString(currentLang, { style: 'currency', currency: 'USD' })}</p>
                </div>
              </div>
            </div>
          </div>
          <button class="btn ${watchlistBtnClass} watchlist-btn w-100 mt-4">
              <i class="fas fa-bookmark me-2"></i>${watchlistBtnText}
          </button>
          <div class="dropdown w-100 mt-2">
                <button class="btn btn-primary dropdown-toggle w-100 shadow-sm" type="button" data-bs-toggle="dropdown">
                  <i class="fas fa-list me-2"></i>${text.addList}
                </button>
                <ul class="dropdown-menu dropdown-menu-end w-100" data-film-id="${film.id}">
                  ${Object.keys(lists).map((listName) => `
                    <li>
                      <button class="dropdown-item add-to-list" data-list="${listName}">
                        ${listName}
                      </button>
                    </li>
                  `).join('')}
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button class="dropdown-item create-list">
                      <i class="fas fa-plus-circle me-2"></i>${text.createList}
                    </button>
                  </li>
                </ul>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ViewFilm;

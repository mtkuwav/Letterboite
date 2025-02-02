const translations = {
  'fr-FR': {
    releaseDate: 'Date de sortie',
    viewDetails: 'Voir plus',
    addList: 'Ajouter à une liste',
    createList: 'Créer une nouvelle liste',
    addWatchlist: 'Ajouter à la Watchlist'
  },
  'en-US': {
    releaseDate: 'Release date',
    viewDetails: 'See more',
    addList: 'Add to list',
    createList: 'Create a new list',
    addWatchlist: 'Add to watchlist'
  },
  'de-DE': {
    releaseDate: 'Veröffentlichungsdatum',
    viewDetails: 'Mehr erfahren',
    addList: 'Zur Liste hinzufügen',
    createList: 'Erstellen einer neuen Liste',
    addWatchlist: 'Zur Watchlist hinzufügen'
  },
  'es-ES': {
    releaseDate: 'Fecha de lanzamiento',
    viewDetails: 'Ver más',
    addList: 'Añadir a la lista',
    createList: 'Crear una nueva lista',
    addWatchlist: 'Añadir a la Watchlist'
  }
};

const ViewFilms = (films) => {
  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];
  const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');

  return `
    <div class="row g-4">
      ${films.map((film) => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card position-relative cards">
            <!-- Dropdown Menu -->
            <div class="dropdown position-absolute end-0 m-2 z-index-1">
              <button 
                class="btn btn-secondary btn-sm dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ${text.addList}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" data-film-id="${film.id}">
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
                    ${text.createList}
                  </button>
                </li>
              </ul>
            </div>

            <!-- Film Card Content -->
            <a href="/film?id=${film.id}">
              <img 
                src="https://image.tmdb.org/t/p/w500${film.poster_path}" 
                class="card-img-top" 
                alt="${film.title}"
              >
              <div class="card-body text-center">
                <h5 class="card-title">${film.title}</h5>
                <p>${text.releaseDate}: ${new Date(film.release_date).toLocaleDateString(currentLang)}</p>
                <button class="btn btn-primary">
                  ${text.viewDetails}
                </button>
              </div>
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

export default ViewFilms;

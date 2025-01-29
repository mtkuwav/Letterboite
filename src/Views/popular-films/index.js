const translations = {
  'fr-FR': {
    releaseDate: 'Date de sortie',
    viewDetails: 'Voir plus',
    addList: 'Ajouter à une liste',
    addWatchlist: 'Ajouter à la Watchlist'
  },
  'en-US': {
    releaseDate: 'Release date',
    viewDetails: 'See more',
    addList: 'Add to list',
    addWatchlist: 'Add to watchlist'
  },
  'de-DE': {
    releaseDate: 'Veröffentlichungsdatum',
    viewDetails: 'Mehr erfahren',
    addList: 'Zur Liste hinzufügen',
    addWatchlist: 'Zur Watchlist hinzufügen'
  },
  'es-ES': {
    releaseDate: 'Fecha de lanzamiento',
    viewDetails: 'Ver más',
    addList: 'Añadir a la lista',
    addWatchlist: 'Añadir a la Watchlist'
  }
};

const film = (data) => {
  const {
    title,
    poster_path: posterPath,
    release_date: releaseDate,
    id
  } = data;

  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];

  const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');

  return (`
    <div class="col-3 mt-4" id="Films">
      <div class="cards">
        <div class="card">
          <div class="dropdown position-absolute end-0 m-2">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
              ${text.addList}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" data-film-id="${id}">
              ${Object.keys(lists).map((listName) => `
                <li>
                  <button class="dropdown-item add-to-list" data-list="${listName}">
                    ${listName}
                  </button>
                </li>
              `).join('')}
              <li><hr class="dropdown-divider"></li>
              <li>
                <button class="dropdown-item create-list">Create new list</button>
              </li>
            </ul>
          </div>
          <a href="/film?id=${id}">
            <img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card-img-top" alt="poster">
            <div class="card-body text-center">
              <h5 class="card-title">${title}</h5>
              <p>${text.releaseDate} : ${new Date(releaseDate).toLocaleDateString(localStorage.getItem('language'))}</p>
              <a href="/film?id=${id}" class="btn btn-primary">
                ${text.viewDetails}
              </a>
            </div>
          </a>
        </div>
      </div>
    </div>
  `);
};

export default (datas) => `
  <div class="row">
    ${datas.map((data) => (film(data))).join('')}
  </div>
`;

import ViewHeader from './header';

const translations = {
  'fr-FR': {
    info: 'Infos !',
    releaseDate: 'Date de sortie',
    summary: 'Résumé',
    originCountry: 'Pays d\'origine',
    back: 'Retour',
    addList: 'Ajouter à une liste',
    addWatchlist: 'Ajouter à la Watchlist'
  },
  'en-US': {
    info: 'Info!',
    releaseDate: 'Release date',
    summary: 'Summary',
    originCountry: 'Origin country',
    back: 'Back',
    addList: 'Add to list',
    addWatchlist: 'Add to watchlist'
  },
  'de-DE': {
    info: 'Info!',
    releaseDate: 'Veröffentlichungsdatum',
    summary: 'Zusammenfassung',
    originCountry: 'Herkunftsland',
    back: 'Zurück',
    addList: 'Zur Liste hinzufügen',
    addWatchlist: 'Zur Watchlist hinzufügen'
  },
  'es-ES': {
    info: '¡Información!',
    releaseDate: 'Fecha de lanzamiento',
    summary: 'Resumen',
    originCountry: 'País de origen',
    back: 'Volver',
    addList: 'Añadir a la lista',
    addWatchlist: 'Añadir a la Watchlist'
  }
};

export default (title, releaseDate, posterPath, originCountry, overview, tagline, id) => {
  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];

  const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');

  return `
    ${ViewHeader(title)}
    <div class="p-5 mb-4 bg-body-tertiary rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">${text.info}</h1>
        <img src="https://image.tmdb.org/t/p/original${posterPath}" class="card-img-top" alt="poster">
        <ul class="list-group">
          ${releaseDate ? `<li class="list-group-item">${text.releaseDate} : ${new Date(releaseDate).toLocaleDateString(currentLang)}</li>` : ''}
          ${overview ? `<li class="list-group-item">${text.summary} : ${overview}</li>` : ''}
          ${originCountry ? `<li class="list-group-item">${text.originCountry} : ${originCountry}</li>` : ''}
          ${tagline ? `<li class="list-group-item text-body-emphasis">"${tagline}"</li>` : ''}
        </ul>
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
        <a
          href="/popular-films"
          class="btn btn-primary btn-lg w-100 mt-3"
        >${text.back}</a>
      </div>
    </div>
  `;
};

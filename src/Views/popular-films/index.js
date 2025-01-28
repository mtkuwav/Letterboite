const translations = {
  'fr-FR': {
    releaseDate: 'Date de sortie',
    viewDetails: 'Voir plus'
  },
  'en-US': {
    releaseDate: 'Release date',
    viewDetails: 'See more'
  },
  'de-DE': {
    releaseDate: 'Veröffentlichungsdatum',
    viewDetails: 'Mehr erfahren'
  },
  'es-ES': {
    releaseDate: 'Fecha de lanzamiento',
    viewDetails: 'Ver más'
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

  return (`
    <div class="col-3 mt-4" id="Films">
      <div class="cards">
        <div class="card">
          <a href="/film?id=${id}">
            <img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card-img-top" alt="poster">
            <div class="card-body text-center">
              <h5 class="card-title">${title}</h5>
              <p>${text.releaseDate} : ${new Date(releaseDate).toLocaleDateString(localStorage.getItem('language'))}</p>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="dropdownMenu${id}" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false">
                  Add to list
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu${id}" data-film-id="${id}">
                  <li><a class="dropdown-item create-list" href="#">Create new list</a></li>
                  <li><hr class="dropdown-divider"></li>
                  ${Object.keys(JSON.parse(localStorage.getItem('filmLists') || '{}')).map((listName) => `
                    <li><a class="dropdown-item add-to-list" data-list="${listName}" href="#">${listName}</a></li>
                  `).join('')}
              </ul>
              </div>
              <a href="/film?id=${id}" class="btn btn-primary">${text.viewDetails}</a>
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

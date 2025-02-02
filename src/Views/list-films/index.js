import ViewHeader from './header';

const translations = {
  'fr-FR': {
    myLists: 'Mes listes',
    createList: 'Créer une nouvelle liste',
    delete: 'Supprimer',
    films: 'films'
  },
  'en-US': {
    myLists: 'My Lists',
    createList: 'Create New List',
    delete: 'Delete',
    films: 'films'
  },
  'de-DE': {
    myLists: 'Meine Listen',
    createList: 'Neue Liste erstellen',
    delete: 'Löschen',
    films: 'Filme'
  },
  'es-ES': {
    myLists: 'Mis Listas',
    createList: 'Crear Nueva Lista',
    delete: 'Eliminar',
    films: 'películas'
  }
};

const ViewLists = (lists) => {
  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];

  return `
    ${ViewHeader()}
    <div class="container py-4">
      <div class="row">
        <div class="col-12 mb-4">
          <h2 class="display-4 mb-3">${text.myLists}</h2>
          <button id="addList" class="btn btn-primary btn-lg shadow-sm">
            <i class="fas fa-plus-circle me-2"></i>${text.createList}
          </button>
        </div>
        
        ${Object.entries(lists).map(([listName, films]) => `
          <div class="col-md-4 mb-4">
            <div class="card shadow-sm hover-shadow">
              <div class="card-header bg-light d-flex justify-content-between align-items-center py-3">
                <h5 class="mb-0 fw-bold text-primary">${listName}</h5>
                <button 
                  class="btn btn-outline-danger btn-sm delete-list" 
                  data-list-name="${listName}"
                >
                  <i class="fas fa-trash-alt me-1"></i>${text.delete}
                </button>
              </div>
              <div class="card-body">
                <p class="text-muted mb-3">
                  <i class="fas fa-film me-2"></i>${films.length} ${text.films}
                </p>
                <div class="list-group list-group-flush custom-scrollbar" 
                    style="max-height: 300px; overflow-y: auto;">
                  ${films.map((film) => `
                    <a href="/film?id=${film.id}" 
                      class="list-group-item list-group-item-action d-flex align-items-center">
                      <img src="https://image.tmdb.org/t/p/w45${film.poster_path}" 
                        class="me-2 rounded" 
                        alt="${film.title}"
                        onerror="this.src='placeholder.jpg'"
                      >
                      <span class="text-truncate">${film.title}</span>
                    </a>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

export default ViewLists;

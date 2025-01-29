import ViewHeader from './header';

const ViewLists = (lists) => `
  ${ViewHeader()}
  <div class="row">
    <div class="col-12 mb-4">
      <h2>My Lists</h2>
      <button id="addList" class="btn btn-primary">Create New List</button>
    </div>
    
    ${Object.entries(lists).map(([listName, films]) => `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">${listName}</h5>
            <button 
              class="btn btn-danger btn-sm delete-list" 
              data-list-name="${listName}"
            >
              Delete
            </button>
          </div>
          <div class="card-body">
            <p>${films.length} films</p>
            <div class="list-group list-group-flush" style="max-height: 300px; overflow-y: auto;">
              ${films.map((film) => `
                <a href="/film?id=${film.id}" class="list-group-item list-group-item-action">
                  ${film.title}
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
`;

export default ViewLists;

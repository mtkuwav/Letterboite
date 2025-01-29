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
            <ul class="list-group">
              ${films.slice(0, 3).map((film) => `
                <li class="list-group-item">${film.title}</li>
              `).join('')}
            </ul>
            ${films.length > 3 ? `
              <p class="mt-2 text-muted">And ${films.length - 3} more...</p>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('')}
  </div>
`;

export default ViewLists;

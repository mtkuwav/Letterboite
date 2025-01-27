

const ListsFilms = class ListsFilms {
  constructor() {
    this.el = document.querySelector('#app');
    this.lists = getAllLists();
    this.render();
    this.run();
  }

  initializeStorage() {
    if (!localStorage.getItem('filmLists')) {
      localStorage.setItem('filmLists', JSON.stringify({}));
    }
  }

  createList(listName) {
    const lists = this.getAllLists();
    if (lists[listName]) {
      throw new Error('List already exists');
    }
    lists[listName] = [];
    this.saveLists(lists);
    return lists[listName];
  }

  addFilmToList(listName, film) {
    const lists = this.getAllLists();
    if (!lists[listName]) {
      throw new Error('List does not exist');
    }
    // Check if film already exists in list
    const filmExists = lists[listName].some(f => f.id === film.id);
    if (!filmExists) {
      lists[listName].push(film);
      this.saveLists(lists);
    }
  }

  removeFilmFromList(listName, filmId) {
    const lists = this.getAllLists();
    if (!lists[listName]) {
      throw new Error('List does not exist');
    }
    lists[listName] = lists[listName].filter(film => film.id !== filmId);
    this.saveLists(lists);
  }

  deleteList(listName) {
    const lists = this.getAllLists();
    if (!lists[listName]) {
      throw new Error('List does not exist');
    }
    delete lists[listName];
    this.saveLists(lists);
  }

  getList(listName) {
    const lists = this.getAllLists();
    return lists[listName] || [];
  }

  getAllLists() {
    return JSON.parse(localStorage.getItem('filmLists'));
  }

  saveLists(lists) {
    localStorage.setItem('filmLists', JSON.stringify(lists));
  }

  render() {
    this.el.innerHTML = `
      <div class="container-fluid">
        ${ViewLists(this.lists)}
      </div>
    `;
  }

  run() {
    // Add list button functionality
    const addListBtn = document.querySelector('#addList');
    if (addListBtn) {
      addListBtn.addEventListener('click', () => {
        const listName = prompt('Enter list name:');
        if (listName) {
          try {
            createList(listName);
            this.lists = getAllLists();
            this.render();
          } catch (error) {
            alert(error.message);
          }
        }
      });
    }

    document.querySelectorAll('.delete-list').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const { listName } = e.target.dataset;
        if (confirm(`Delete list "${listName}"?`)) {
          deleteList(listName);
          this.lists = getAllLists();
          this.render();
        }
      });
    });
  }
}

export default ListsFilms;
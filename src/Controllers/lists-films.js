import ViewListsFilms from '../Views/list-films/index';

const ListsFilms = class ListsFilms {
  constructor() {
    this.el = document.querySelector('#app');
    this.initializeStorage();
    this.lists = this.getAllLists();
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
    const filmExists = lists[listName].some((f) => f.id === film.id);
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
    lists[listName] = lists[listName].filter((film) => film.id !== filmId);
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
    return JSON.parse(localStorage.getItem('filmLists') || '{}');
  }

  saveLists(lists) {
    localStorage.setItem('filmLists', JSON.stringify(lists));
  }

  setupEventListeners() {
    this.el.addEventListener('click', (e) => {
      if (e.target.matches('#addList')) {
        const listName = prompt('Enter list name:');
        if (listName) {
          try {
            this.createList(listName);
            this.lists = this.getAllLists();
            this.render();
          } catch (error) {
            alert(error.message);
          }
        }
      }

      if (e.target.matches('.delete-list')) {
        const { listName } = e.target.dataset;
        if (window.confirm(`Delete list "${listName}"?`)) {
          this.deleteList(listName);
          this.lists = this.getAllLists();
          this.render();
        }
      }
    });
  }

  render() {
    this.el.innerHTML = `
      <div class="container-fluid">
        ${ViewListsFilms(this.lists)}
      </div>
    `;
  }

  run() {
    this.setupEventListeners();
  }
};

export default ListsFilms;

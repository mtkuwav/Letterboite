const setupListManagement = (film, render) => {
  console.log('Setting up list management for film:', film);

  // Create new list
  document.querySelectorAll('.create-list').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Creating list for film:', film);
      try {
        const listName = prompt('Nom de la liste:');
        if (listName) {
          const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
          lists[listName] = [film]; // Using passed film object directly
          localStorage.setItem('filmLists', JSON.stringify(lists));
          alert('Liste créée et film ajouté!');
          if (render) render();
        }
      } catch (error) {
        console.error('Error creating list:', error);
      }
    });
  });

  // Add to existing list
  document.querySelectorAll('.add-to-list').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const listName = e.target.dataset.list;
      console.log('Adding film to list:', listName, 'Film:', film);
      try {
        const lists = JSON.parse(localStorage.getItem('filmLists') || '{}');
        if (!lists[listName]) {
          lists[listName] = [];
        }
        if (!lists[listName].some((f) => f.id === film.id)) {
          lists[listName].push(film); // Using passed film object directly
          localStorage.setItem('filmLists', JSON.stringify(lists));
          alert('Film ajouté à la liste!');
        }
      } catch (error) {
        console.error('Error adding to list:', error);
      }
    });
  });
};

export default setupListManagement;

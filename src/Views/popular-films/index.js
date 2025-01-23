const film = (data) => {
  const {
    title,
    poster_path: posterPath,
    release_date: releaseDate,
    id
  } = data;

  return (`
    <div class="col-3 mt-4" id="Films">
      <div class="card">
        <img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card-img-top" alt="poster">
        <div class="card-body text-center">
          <h5 class="card-title">${title}</h5>
          <p>Date de sortie: ${new Date(releaseDate).toLocaleDateString('fr')}</p>
          <a
            href="/film?id=${id}"
            class="btn btn-primary"
          >Voir plus</a>
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

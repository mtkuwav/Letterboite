import ViewHeader from './header';

export default (title, releaseDate, posterPath) => `
  ${ViewHeader(title)}
  <div class="p-5 mb-4 bg-body-tertiary rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Infos !</h1>
      <img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card-img-top" alt="poster">
      <ul class="list-group">
        <li class="list-group-item">Date de sortie : ${new Date(releaseDate).toLocaleDateString('fr')}</li>
        <li class="list-group-item">caca</li>
        <li class="list-group-item">boudin</li>
      </ul>
      <button class="btn btn-primary btn-lg" type="button">Example button</button>
    </div>
  </div>
`;

import ViewHeader from './header';

export default (title, releaseDate, posterPath, originCountry, overview, tagline) => `
  ${ViewHeader(title)}
  <div class="p-5 mb-4 bg-body-tertiary rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Infos !</h1>
      <img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card-img-top" alt="poster">
      <ul class="list-group">
        <li class="list-group-item">Date de sortie : ${new Date(releaseDate).toLocaleDateString('fr')}</li>
        <li class="list-group-item">Résumé : ${overview}</li>
        <li class="list-group-item">Pays d'origine : ${originCountry}</li>
        <li class="list-group-item text-body-emphasis">"${tagline}"</li>
      </ul>
      <a
        href="/list-films"
        class="btn btn-primary btn-lg w-100 mt-3"
      >Retour</a>
    </div>
  </div>
`;

import ViewHeader from './header';

const translations = {
  'fr-FR': {
    info: 'Infos !',
    releaseDate: 'Date de sortie',
    summary: 'Résumé',
    originCountry: 'Pays d\'origine',
    back: 'Retour'
  },
  'en-US': {
    info: 'Info!',
    releaseDate: 'Release date',
    summary: 'Summary',
    originCountry: 'Origin country',
    back: 'Back'
  },
  'de-DE': {
    info: 'Info!',
    releaseDate: 'Veröffentlichungsdatum',
    summary: 'Zusammenfassung',
    originCountry: 'Herkunftsland',
    back: 'Zurück'
  },
  'es-ES': {
    info: '¡Información!',
    releaseDate: 'Fecha de lanzamiento',
    summary: 'Resumen',
    originCountry: 'País de origen',
    back: 'Volver'
  }
};

export default (title, releaseDate, posterPath, originCountry, overview, tagline) => {
  const currentLang = localStorage.getItem('language') || 'fr-FR';
  const text = translations[currentLang];

  return `
    ${ViewHeader(title)}
    <div class="p-5 mb-4 bg-body-tertiary rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">${text.info}</h1>
        <img src="https://image.tmdb.org/t/p/original${posterPath}" class="card-img-top" alt="poster">
        <ul class="list-group">
          ${releaseDate ? `<li class="list-group-item">${text.releaseDate} : ${new Date(releaseDate).toLocaleDateString(currentLang)}</li>` : ''}
          ${overview ? `<li class="list-group-item">${text.summary} : ${overview}</li>` : ''}
          ${originCountry ? `<li class="list-group-item">${text.originCountry} : ${originCountry}</li>` : ''}
          ${tagline ? `<li class="list-group-item text-body-emphasis">"${tagline}"</li>` : ''}
        </ul>
        <a
          href="/popular-films"
          class="btn btn-primary btn-lg w-100 mt-3"
        >${text.back}</a>
      </div>
    </div>
  `;
};

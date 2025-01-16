const user = (data) => {
  const {
    title,
    poster_path: { poster }
  } = data;

  return (`
    <div class="col-2 mt-4" id="Films">
      <div class="card">
        <img src="https://image.tmdb.org/t/p/w500/${poster}" class="card-img-top" alt="poster">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
        </div>
      </div>
    </div>
  `);
};

export default (datas) => `
  <div class="row">
    ${datas.map((data) => (user(data))).join('')}
  </div>
`;

export default (currentPage) => `
  <div class="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><button class="page-link" id="previousPage">Previous</button></li>
            <li class="page-item page-link" id="pageNumber">${currentPage}</li>
            <li class="page-item"><button class="page-link" id="nextPage">Next</button></li>
          </ul>
        </nav>
      </div>
  `;

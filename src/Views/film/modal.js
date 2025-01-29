import { Modal } from 'bootstrap';

export const createModal = (title, message, type = 'alert') => {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.setAttribute('tabindex', '-1');

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
          ${type === 'prompt' ? '<input type="text" class="form-control" id="modalInput">' : ''}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary modal-confirm">Confirm</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const modalInstance = new Modal(modal);

  return new Promise((resolve) => {
    modal.addEventListener('hidden.bs.modal', () => {
      modal.remove();
      resolve(null);
    });

    modal.querySelector('.modal-confirm').addEventListener('click', () => {
      const value = type === 'prompt' ? modal.querySelector('#modalInput').value : true;
      modalInstance.hide();
      resolve(value);
    });

    modalInstance.show();
  });
};

export const showModal = (message) => createModal('Information', message, 'alert');
export const promptModal = (message) => createModal('Input Required', message, 'prompt');

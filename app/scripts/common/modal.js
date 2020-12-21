/* eslint-disable */
import { freeze, unfreeze } from '../../blocks/js-functions/freeze';

export default () => {
  const modalsWrapp = document.querySelector('.modals');
  const modalTarget = document.querySelectorAll('[modal-target]');
  const allModals = document.querySelectorAll('[modal-name]');
  const modalClose = document.querySelector('.modals .close');
  const closeTargetArr = [modalClose, modalsWrapp];

  if (!modalsWrapp) return;

  [].forEach.call(modalTarget, btn => {
    [].forEach.call(allModals, modal => {
      btn.onclick = () => {
        if (btn.getAttribute('modal-target') == modal.getAttribute('modal-name')) {
          modalsWrapp.classList.add('is-active');
          modal.classList.add('is-active');
          freeze();
        }
      };
    });
  });

  [].forEach.call(closeTargetArr, trg => {
    trg.onclick = (e) => {
      if (e.target !== trg) return;

      if (e.target === trg) {
        modalsWrapp.classList.remove('is-active');
        unfreeze();
      }

      [].forEach.call(allModals, modal => {
        modal.classList.remove('is-active');
      })
    };
  });
};
/* eslint-enable */

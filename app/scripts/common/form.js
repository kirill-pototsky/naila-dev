/* eslint-disable */
import Inputmask from "inputmask";
import { freeze, unfreeze } from '../../blocks/js-functions/freeze';

export default () => {
  const modalsWrapp = document.querySelector('.modals');
  const allModals = document.querySelectorAll('[modal-name]');
  const thanks = document.querySelector('.modal-thanks');

  $(document).ready(function() {

    var inputPfone = document.querySelectorAll("form input");

    var im = new Inputmask("+375 (99) 999-99-99");
    [].forEach.call(inputPfone, el => {
      im.mask(el);
    })

    //E-mail Ajax Send
    $(".form").submit(function() {
      const th = $(this);
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: th.serialize()
      }).done(function() {
        freeze();

        [modalsWrapp, ...allModals].forEach(e => e.classList.remove('is-active'));
        thanks.classList.add('is-active');

        setTimeout(function() {
          thanks.classList.remove('is-active');
          th.trigger("reset");

          unfreeze();
        }, 2000);
      });
      return false;
    });

  });
}
/* eslint-enable */

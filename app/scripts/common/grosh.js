/* eslint-disable */
export default () => {
  (function () {
    $("#isTariff, #createBill, #requestFIO, #requestAddress, #requestPhone, #requestEmail").on('change', function () {
            if ($(this).is(':checked')) {
                $(this).attr('value', 'true');
      $('#' + $(this).attr('id') + '_hidden').prop( "disabled", true );
            } else {
                $(this).attr('value', 'false');
      $('#' + $(this).attr('id') + '_hidden').prop( "disabled", false );
            }
        });
    $("#isTariff, #createBill, #requestFIO, #requestAddress, #requestPhone, #requestEmail").trigger('change');
    })();
}

/* eslint-enable */

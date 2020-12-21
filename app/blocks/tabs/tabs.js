export default () => {
  // data-tab-target - вешается на таб
  // data-tab и tab-group  - на содержимое таба
  // tab-group должен быть одинаковый у всех табов одной группы (в одном контейнере, например)

  $(document).on('click', '[data-tab-target]', function(e) {
    e.preventDefault();

    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');

    const targetTab = $(this).data('tab-target');
    const tab = $(document).find(`[data-tab="${targetTab}"]`);
    const tabGroup = tab.data('tab-group');

    $(document)
      .find(`[data-tab-group="${tabGroup}"]`)
      .hide()
      .removeClass('active');

    tab.show(0, function() {
      $(this).addClass('active');
    });
  });
};

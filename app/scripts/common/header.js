export default () => {
  const el = $('.header');

  if (!el.length) return;

  const delta = 5;
  let lastScrollTop = 0;

  const scrollListener = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop) {
      el.addClass('scrolled');
    } else {
      el.removeClass('scrolled').addClass('minified');
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  };

  scrollListener();
  window.addEventListener('scroll', scrollListener, false);
};

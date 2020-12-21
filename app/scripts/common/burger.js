import { freeze, unfreeze } from '../../blocks/js-functions/freeze';

export default () => {
  const openNavMobile = document.querySelector('.open-nav');
  const closeNavMobile = document.querySelector('.nav-mobile .close');
  const navMobile = document.querySelector('.nav-mobile');

  if (!navMobile) return;

  [].forEach.call([openNavMobile, closeNavMobile], el => {
    el.onclick = () => {
      navMobile.classList.contains('is-active') ? unfreeze() : freeze();
      navMobile.classList.toggle('is-active');
    };
  });
};

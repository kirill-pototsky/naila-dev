export default () => {
  window.addEventListener('load', function() {
    document.querySelector('body').classList.add('is-loaded');
  });
};

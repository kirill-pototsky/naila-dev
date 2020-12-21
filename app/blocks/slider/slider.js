/* eslint-disable */
import Swiper from 'swiper';

Number.isNaN = Number.isNaN || function(value) {
  return typeof value === 'number' && isNaN(value);
};

// example of use
export default () => {
  const introSlider = new Swiper('.js-intro-slider', {
    speed: 500,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 1.6,
        spaceBetween: 0,
      },
      320: {
        spaceBetween: 25,
        slidesPerView: 1,
      },
    },
  });

  const schoolSlider = new Swiper('.js-school-slider', {
    speed: 500,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 25,
        pagination: {
          clickable: true,
          type: 'fraction',
        },
      },
      480: {
        spaceBetween: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
        pagination: {
          clickable: true,
          type: 'bullets',
        },
      },
      1280: {
        slidesPerView: 4,
      },
    },
  });
};
/* eslint-enable */

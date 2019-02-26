
// import Swiper from './swiper';
// import Swiper from 'swiper';

 var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    speed: 900,
    loop: true,
    simulateTouch: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
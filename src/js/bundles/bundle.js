
$(document).ready(function () {

  $(".btnComprarScroll").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      });
      return false;
    }
  });

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
});



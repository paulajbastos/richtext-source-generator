export default function template() {
  console.log("template JS loaded");

  // $(window).load(function () { // On load
  //   fullHeightSlider();
  // });
  // $(window).resize(function () { // On resize
  //   fullHeightSlider();
  // });
  // function fullHeightSlider() {
  //   $('.faixa-beneficios').attr('id', 'faixaBeneficios');
  //   document.getElementById("sliderPrincipal").style.height = ($(window).height() - ($('#headerBar').height() + $('#faixaBeneficios').height()) + 'px');
  // };

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

    var mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      loop: true,
      // loopedSlides: parseInt(widget.carouselTotalItens()),
      // slidesPerView: parseInt(widget.carouselTotalItens()),
      // slidesPerGroup: parseInt(widget.carouselTotalItens()),
      speed: 1000,
      // spaceBetween: parseInt(widget.carouselSpaceItens()),
      // navigation: {
      //   nextEl: widget.carouselHasArrows() ? '#carouselRecomendationInstance-' + i + ' .swiper-button-next.btn-next-' + i : '',
      //   prevEl: widget.carouselHasArrows() ? '#carouselRecomendationInstance-' + i + ' .swiper-button-prev.btn-prev-' + i : ''
      // },
      // pagination: {
      //   type: widget.carouselHasBullets() ? 'bullets' : '',
      //   dynamicBullets: widget.carouselHasBullets() ? true : '',
      //   clickable: widget.carouselHasBullets() ? true : '',
      //   el: widget.carouselHasBullets() ? '#carouselRecomendationInstance-' + i + ' .swiper-pagination.pagination-' + i : ''
      // }
    });
  });
}

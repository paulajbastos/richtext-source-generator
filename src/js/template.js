// import 'slick-carousel';
// import 'slick-carousel/slick/slick';

export default function template() {
  console.log("template JS loaded");

  $(window).load(function () { // On load
    fullHeightSlider();
  });
  $(window).resize(function () { // On resize
    fullHeightSlider();
  });
  function fullHeightSlider() {
    $('.faixa-beneficios').attr('id', 'faixaBeneficios');
    document.getElementById("sliderPrincipal").style.height = ($(window).height() - ($('#headerBar').height() + $('#faixaBeneficios').height()) + 'px');
  };

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

    $(".Modern-Slider").slick({
      autoplay: true,
      autoplaySpeed:5000,
      speed:500,
      dots: false,
      slidesToShow:1,
      slidesToScroll:1,
      pauseOnHover:false,
      respondTo:'min',
      cssEase:'linear',
      prevArrow:'<button class="PrevArrow"></button>',
      nextArrow:'<button class="NextArrow"></button>',
      customPaging : function(slider, i) {
      var thumbnail = $(slider.$slides[i]).data('thumbnail');
      return '<a href="javascript:void(0)"><img src="'+thumbnail+'"></a>';},
    });
  });
}

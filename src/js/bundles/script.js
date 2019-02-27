(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYnVuZGxlcy9idW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWTs7QUFFNUIsSUFBRSxtQkFBRixFQUF1QixFQUF2QixDQUEwQixPQUExQixFQUFtQyxVQUFVLEtBQVYsRUFBaUI7QUFDbEQsUUFBSSxLQUFLLElBQUwsS0FBYyxFQUFsQixFQUFzQjtBQUNwQixZQUFNLGNBQU47QUFDQSxVQUFJLE9BQU8sS0FBSyxJQUFoQjtBQUNBLFFBQUUsWUFBRixFQUFnQixPQUFoQixDQUF3QjtBQUN0QixtQkFBVyxFQUFFLElBQUYsRUFBUSxNQUFSLEdBQWlCO0FBRE4sT0FBeEI7QUFHQSxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBVEQ7O0FBV0EsTUFBSSxTQUFTLElBQUksTUFBSixDQUFXLG1CQUFYLEVBQWdDO0FBQzNDLG1CQUFlLENBRDRCO0FBRTNDLFdBQU8sR0FGb0M7QUFHM0MsVUFBTSxJQUhxQztBQUkzQyxtQkFBZSxJQUo0QjtBQUszQyxjQUFVO0FBQ1IsYUFBTyxJQURDO0FBRVIsNEJBQXNCO0FBRmQsS0FMaUM7QUFTM0MsZ0JBQVk7QUFDVixVQUFJLG9CQURNO0FBRVYsaUJBQVcsS0FGRDtBQUdWLHNCQUFnQjtBQUhOLEtBVCtCO0FBYzNDLGdCQUFZO0FBQ1YsY0FBUSxxQkFERTtBQUVWLGNBQVE7QUFGRTtBQWQrQixHQUFoQyxDQUFiO0FBbUJELENBaENEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgJChcIi5idG5Db21wcmFyU2Nyb2xsXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICh0aGlzLmhhc2ggIT09IFwiXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgaGFzaCA9IHRoaXMuaGFzaDtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKGhhc2gpLm9mZnNldCgpLnRvcFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBzcGVlZDogOTAwLFxuICAgIGxvb3A6IHRydWUsXG4gICAgc2ltdWxhdGVUb3VjaDogdHJ1ZSxcbiAgICBhdXRvcGxheToge1xuICAgICAgZGVsYXk6IDMwMDAsXG4gICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXG4gICAgfSxcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgICAgZHluYW1pY0J1bGxldHM6IHRydWUsXG4gICAgfSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG4gIH0pO1xufSk7XG5cblxuIl19

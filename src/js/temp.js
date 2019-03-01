(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  // var tel = document.getElementById('InputTelefone');
  // var telMask = new Inputmask('(99)99999-9999');
  // telMask.mask(tel);

  // var cpf = document.getElementById('InputCPF');
  // var cpfMask = new Inputmask('999.999.999-99');
  // cpfMask.mask(cpf);
}); // import Inputmask from "inputmask";

(0, _template2.default)();

},{"./template":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;
// import Inputmask from "inputmask";

function template() {
  console.log("template JS loaded");

  var landing = {
    isValidName: false,
    isValidEmail: false,
    isValidCPF: false,
    isValidCelular: false,
    isValidSelect: false,
    cpfMask: 0,

    init: function init() {

      var tel = document.getElementById('InputTelefone');
      $(tel).inputmask("(99)99999-9999"); //static mask

      // var telMask = new Inputmask('(99)99999-9999');
      // telMask.mask(tel);

      // var cpf = document.getElementById('InputCPF');
      // landing.cpfMask = new Inputmask('999.999.999-99');
      // Inputmask('999.999.999-99', {
      // }).mask(cpf);


      /*
      , {
        positionCaretOnClick: "radixFocus",
        greedy: false,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        numericInput: true,
      }
      */

      // Inputmask("(.999){+|1},00", {
      //   positionCaretOnClick: "radixFocus",
      //   radixPoint: ",",
      //   _radixDance: true,
      //   numericInput: true,
      //   placeholder: "0",
      //   definitions: {
      //     "0": {
      //       validator: "[0-9\uFF11-\uFF19]"
      //     }
      //   }
      // }).mask(selector);

      $('#submit').on('click', function () {
        sendForm();
      });

      var select1 = $('#Estado'),
          select2 = $('#Loja'),
          options = select2.find('option');

      select1.on('change', function () {
        select2.html(options.filter('[UFdata="' + this.value + '"]'));
      }).trigger('change');
    },
    validateCPF: function validateCPF(cpf) {
      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11) return false;
      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }
      }if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
          soma += numeros.charAt(10 - i) * i;
        }resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) {
          soma += numeros.charAt(11 - i) * i;
        }resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;
        return true;
      } else return false;
    },
    rsvValidateEmail: function rsvValidateEmail(email) {
      var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return expr.test(email);
    },
    verificaField: function verificaField(nome, email, cpf, tel, estado, isSubmitted, type) {

      console.log('verificaField');

      if ($(nome).val() == '' || $(nome).val().length < 2) {
        // globals.rsvShowFormFeedback('error', _containerNome);
        landing.isValidName = false;
      } else {
        if ($(nome).val().length < 2 && type !== 'focusout') {
          // globals.rsvShowFormFeedback('focusin', _containerNome);
          landing.isValidName = false;
        } else if ($(nome).val().length < 2 && type == 'focusout') {
          // globals.rsvShowFormFeedback('error', _containerNome);
          landing.isValidName = false;
        } else {
          // globals.rsvShowFormFeedback('success', _containerNome);
          landing.isValidName = true;
        }
      }

      console.log('verificaField landing.isValidName', landing.isValidName);

      if (!landing.rsvValidateEmail($(email).val())) {
        if (isSubmitted) {
          // landing.rsvShowFormFeedback('error', _container);
          landing.isValidEmail = false;
        } else {
          if ($(email).val().length > 0 && type !== 'focusout') {
            // landing.rsvShowFormFeedback('focusin', _container);
          } else if ($(email).val().length > 0 && type == 'focusout') {
            // landing.rsvShowFormFeedback('error', _container);
          } else {
              // landing.rsvShowFormFeedback('error', _container);
            }
          landing.isValidEmail = false;
        }
      } else {
        if (landing.rsvValidateEmail($(email).val())) {
          // landing.rsvShowFormFeedback('success', _container);
          landing.isValidEmail = true;
        }
      }

      console.log('verificaField landing.isValidEmail', landing.isValidEmail);

      // if ($(selector).inputmask("isComplete")){
      //bundle.jsif ($(cpf).mask('isComplete')) {
      if (landing.cpfMask.mask('isComplete')) {
        var _cpfVal = $(cpf).val().replace(/\D/g, '');
        if (!landing.validateCPF(_cpfVal)) {
          // landing.rsvShowFormFeedback('error', _container);
          landing.isValidCPF = false;
        } else {
          // landing.rsvShowFormFeedback('success', _container);
          landing.isValidCPF = true;
        }
      } else {
        // landing.rsvShowFormFeedback('error', _container);
        landing.isValidCPF = false;
      }

      console.log('verificaField landing.isValidCPF', landing.isValidCPF);

      // if (field === 'formHebraicaNomeField') {
      //   if ($(_field).val() == '' || $(_field).val().length < 2) {
      //     // landing.rsvShowFormFeedback('error', _container);
      //     landing.isValidName(false);
      //   } else {
      //     if ($(_field).val().length < 2 && type !== 'focusout') {
      //       // landing.rsvShowFormFeedback('focusin', _container);
      //       landing.isValidName(false);
      //     } else if ($(_field).val().length < 2 && type == 'focusout') {
      //       // landing.rsvShowFormFeedback('error', _container);
      //       landing.isValidName(false);
      //     } else {
      //       // landing.rsvShowFormFeedback('success', _container);
      //       landing.isValidName(true);
      //     }
      //   }
      // }

      // if (field === 'formHebraicaCelularField') {
      //   if ($('#formHebraicaCelularField').inputmask('isComplete')) {
      //     if ($(_field).val().length < 10 && type !== 'focusout') {
      //       // landing.rsvShowFormFeedback('error', _container);
      //       landing.isValidCelular(false);
      //     } else if ($(_field).val().length < 10 && type == 'focusout') {
      //       // landing.rsvShowFormFeedback('error', _container);
      //       landing.isValidCelular(false);
      //     } else {
      //       // landing.rsvShowFormFeedback('success', _container);
      //       landing.isValidCelular(true);
      //     }
      //   } else {
      //     // landing.rsvShowFormFeedback('error', _container);
      //     landing.isValidCelular(false);
      //   }
      // }

      // if (landing.isValidName() && landing.isValidEmail() && landing.isValidCPF() && landing.isValidCelular()) {
      //   if (isSubmitted) {
      //     landing.send();
      //     landing.submitToContantList($('#formHebraicaEmailField').val(), false);
      //     return;
      //   }
      // }
      if (landing.isValidName && landing.isValidEmail) {
        if (isSubmitted) {
          console.log('validou');
          // landing.send();
          // landing.submitToContantList($('#formHebraicaEmailField').val(), false);
          return;
        }
      }

      return true;
    }
  };

  landing.init();

  function sendForm() {
    console.log('sendForm');

    var nome = '#InputNome';
    var email = '#InputEmail';
    var cpf = '#InputCPF';
    var tel = '#InputTelefone';
    var estado = '#Estado';

    landing.verificaField(nome, email, cpf, tel, estado, true, 'keyup');
  }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYnVuZGxlLmpzIiwic3JjL2pzL3RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQTs7Ozs7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFVO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDRCxDQVJELEUsQ0FIQTs7QUFZQTs7Ozs7Ozs7a0JDVndCLFE7QUFGeEI7O0FBRWUsU0FBUyxRQUFULEdBQW9CO0FBQ2pDLFVBQVEsR0FBUixDQUFZLG9CQUFaOztBQUVBLE1BQUksVUFBVTtBQUNaLGlCQUFhLEtBREQ7QUFFWixrQkFBYyxLQUZGO0FBR1osZ0JBQVksS0FIQTtBQUlaLG9CQUFnQixLQUpKO0FBS1osbUJBQWUsS0FMSDtBQU1aLGFBQVMsQ0FORzs7QUFRWixVQUFNLGdCQUFZOztBQUVoQixVQUFJLE1BQU0sU0FBUyxjQUFULENBQXdCLGVBQXhCLENBQVY7QUFDQSxRQUFFLEdBQUYsRUFBTyxTQUFQLENBQWlCLGdCQUFqQixFQUhnQixDQUdxQjs7QUFFckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBRSxTQUFGLEVBQWEsRUFBYixDQUFnQixPQUFoQixFQUF5QixZQUFXO0FBQ2xDO0FBQ0QsT0FGRDs7QUFNQSxVQUFJLFVBQVUsRUFBRSxTQUFGLENBQWQ7QUFBQSxVQUNBLFVBQVUsRUFBRSxPQUFGLENBRFY7QUFBQSxVQUVBLFVBQVUsUUFBUSxJQUFSLENBQWEsUUFBYixDQUZWOztBQUlBLGNBQVEsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBWTtBQUMvQixnQkFBUSxJQUFSLENBQWEsUUFBUSxNQUFSLENBQWUsY0FBYyxLQUFLLEtBQW5CLEdBQTJC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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJLFFBQVEsV0FBUixJQUF1QixRQUFRLFlBQW5DLEVBQWlEO0FBQy9DLFlBQUksV0FBSixFQUFpQjtBQUNmLGtCQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPLElBQVA7QUFDRDtBQW5OVyxHQUFkOztBQXVOQSxVQUFRLElBQVI7O0FBR0EsV0FBUyxRQUFULEdBQW9CO0FBQ2xCLFlBQVEsR0FBUixDQUFZLFVBQVo7O0FBRUEsUUFBSSxPQUFPLFlBQVg7QUFDQSxRQUFJLFFBQVEsYUFBWjtBQUNBLFFBQUksTUFBTSxXQUFWO0FBQ0EsUUFBSSxNQUFNLGdCQUFWO0FBQ0EsUUFBSSxTQUFTLFNBQWI7O0FBRUEsWUFBUSxhQUFSLENBQXNCLElBQXRCLEVBQTRCLEtBQTVCLEVBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLEVBQTZDLE1BQTdDLEVBQXFELElBQXJELEVBQTJELE9BQTNEO0FBRUQ7QUFFRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCBJbnB1dG1hc2sgZnJvbSBcImlucHV0bWFza1wiO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAvLyB2YXIgdGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0lucHV0VGVsZWZvbmUnKTtcbiAgLy8gdmFyIHRlbE1hc2sgPSBuZXcgSW5wdXRtYXNrKCcoOTkpOTk5OTktOTk5OScpO1xuICAvLyB0ZWxNYXNrLm1hc2sodGVsKTtcblxuICAvLyB2YXIgY3BmID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0lucHV0Q1BGJyk7XG4gIC8vIHZhciBjcGZNYXNrID0gbmV3IElucHV0bWFzaygnOTk5Ljk5OS45OTktOTknKTtcbiAgLy8gY3BmTWFzay5tYXNrKGNwZik7XG59KTtcbnRlbXBsYXRlKCk7XG4iLCIvLyBpbXBvcnQgSW5wdXRtYXNrIGZyb20gXCJpbnB1dG1hc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gIGNvbnNvbGUubG9nKFwidGVtcGxhdGUgSlMgbG9hZGVkXCIpO1xuXG4gIHZhciBsYW5kaW5nID0ge1xuICAgIGlzVmFsaWROYW1lOiBmYWxzZSxcbiAgICBpc1ZhbGlkRW1haWw6IGZhbHNlLFxuICAgIGlzVmFsaWRDUEY6IGZhbHNlLFxuICAgIGlzVmFsaWRDZWx1bGFyOiBmYWxzZSxcbiAgICBpc1ZhbGlkU2VsZWN0OiBmYWxzZSxcbiAgICBjcGZNYXNrOiAwLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgdGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0lucHV0VGVsZWZvbmUnKTtcbiAgICAgICQodGVsKS5pbnB1dG1hc2soXCIoOTkpOTk5OTktOTk5OVwiKTsgIC8vc3RhdGljIG1hc2tcblxuICAgICAgLy8gdmFyIHRlbE1hc2sgPSBuZXcgSW5wdXRtYXNrKCcoOTkpOTk5OTktOTk5OScpO1xuICAgICAgLy8gdGVsTWFzay5tYXNrKHRlbCk7XG5cbiAgICAgIC8vIHZhciBjcGYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnSW5wdXRDUEYnKTtcbiAgICAgIC8vIGxhbmRpbmcuY3BmTWFzayA9IG5ldyBJbnB1dG1hc2soJzk5OS45OTkuOTk5LTk5Jyk7XG4gICAgICAvLyBJbnB1dG1hc2soJzk5OS45OTkuOTk5LTk5Jywge1xuICAgICAgLy8gfSkubWFzayhjcGYpO1xuXG5cblxuICAgICAgLypcbiAgICAgICwge1xuICAgICAgICBwb3NpdGlvbkNhcmV0T25DbGljazogXCJyYWRpeEZvY3VzXCIsXG4gICAgICAgIGdyZWVkeTogZmFsc2UsXG4gICAgICAgIHNob3dNYXNrT25Ib3ZlcjogZmFsc2UsXG4gICAgICAgIHNob3dNYXNrT25Gb2N1czogZmFsc2UsXG4gICAgICAgIG51bWVyaWNJbnB1dDogdHJ1ZSxcbiAgICAgIH1cbiAgICAgICovXG5cbiAgICAgIC8vIElucHV0bWFzayhcIiguOTk5KXsrfDF9LDAwXCIsIHtcbiAgICAgIC8vICAgcG9zaXRpb25DYXJldE9uQ2xpY2s6IFwicmFkaXhGb2N1c1wiLFxuICAgICAgLy8gICByYWRpeFBvaW50OiBcIixcIixcbiAgICAgIC8vICAgX3JhZGl4RGFuY2U6IHRydWUsXG4gICAgICAvLyAgIG51bWVyaWNJbnB1dDogdHJ1ZSxcbiAgICAgIC8vICAgcGxhY2Vob2xkZXI6IFwiMFwiLFxuICAgICAgLy8gICBkZWZpbml0aW9uczoge1xuICAgICAgLy8gICAgIFwiMFwiOiB7XG4gICAgICAvLyAgICAgICB2YWxpZGF0b3I6IFwiWzAtOVxcdUZGMTEtXFx1RkYxOV1cIlxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSkubWFzayhzZWxlY3Rvcik7XG5cbiAgICAgICQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VuZEZvcm0oKTtcbiAgICAgIH0pO1xuXG5cblxuICAgICAgdmFyIHNlbGVjdDEgPSAkKCcjRXN0YWRvJyksXG4gICAgICBzZWxlY3QyID0gJCgnI0xvamEnKSxcbiAgICAgIG9wdGlvbnMgPSBzZWxlY3QyLmZpbmQoJ29wdGlvbicpO1xuXG4gICAgICBzZWxlY3QxLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGVjdDIuaHRtbChvcHRpb25zLmZpbHRlcignW1VGZGF0YT1cIicgKyB0aGlzLnZhbHVlICsgJ1wiXScpKTtcbiAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDUEY6IGZ1bmN0aW9uIChjcGYpIHtcbiAgICAgIHZhciBudW1lcm9zLCBkaWdpdG9zLCBzb21hLCBpLCByZXN1bHRhZG8sIGRpZ2l0b3NfaWd1YWlzO1xuICAgICAgZGlnaXRvc19pZ3VhaXMgPSAxO1xuICAgICAgaWYgKGNwZi5sZW5ndGggPCAxMSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNwZi5sZW5ndGggLSAxOyBpKyspXG4gICAgICAgIGlmIChjcGYuY2hhckF0KGkpICE9IGNwZi5jaGFyQXQoaSArIDEpKSB7XG4gICAgICAgICAgZGlnaXRvc19pZ3VhaXMgPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBpZiAoIWRpZ2l0b3NfaWd1YWlzKSB7XG4gICAgICAgIG51bWVyb3MgPSBjcGYuc3Vic3RyaW5nKDAsIDkpO1xuICAgICAgICBkaWdpdG9zID0gY3BmLnN1YnN0cmluZyg5KTtcbiAgICAgICAgc29tYSA9IDA7XG4gICAgICAgIGZvciAoaSA9IDEwOyBpID4gMTsgaS0tKVxuICAgICAgICAgIHNvbWEgKz0gbnVtZXJvcy5jaGFyQXQoMTAgLSBpKSAqIGk7XG4gICAgICAgIHJlc3VsdGFkbyA9IHNvbWEgJSAxMSA8IDIgPyAwIDogMTEgLSBzb21hICUgMTE7XG4gICAgICAgIGlmIChyZXN1bHRhZG8gIT0gZGlnaXRvcy5jaGFyQXQoMCkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBudW1lcm9zID0gY3BmLnN1YnN0cmluZygwLCAxMCk7XG4gICAgICAgIHNvbWEgPSAwO1xuICAgICAgICBmb3IgKGkgPSAxMTsgaSA+IDE7IGktLSlcbiAgICAgICAgICBzb21hICs9IG51bWVyb3MuY2hhckF0KDExIC0gaSkgKiBpO1xuICAgICAgICByZXN1bHRhZG8gPSBzb21hICUgMTEgPCAyID8gMCA6IDExIC0gc29tYSAlIDExO1xuICAgICAgICBpZiAocmVzdWx0YWRvICE9IGRpZ2l0b3MuY2hhckF0KDEpKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHJzdlZhbGlkYXRlRW1haWw6IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgICAgdmFyIGV4cHIgPSAvXihbXFx3LVxcLl0rKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLil8KChbXFx3LV0rXFwuKSspKShbYS16QS1aXXsyLDR9fFswLTldezEsM30pKFxcXT8pJC87XG4gICAgICByZXR1cm4gZXhwci50ZXN0KGVtYWlsKTtcbiAgICB9LFxuICAgIHZlcmlmaWNhRmllbGQ6IGZ1bmN0aW9uIChub21lLCBlbWFpbCwgY3BmLCB0ZWwsIGVzdGFkbywgaXNTdWJtaXR0ZWQsIHR5cGUsKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKCd2ZXJpZmljYUZpZWxkJyk7XG5cbiAgICAgIGlmICgkKG5vbWUpLnZhbCgpID09ICcnIHx8ICQobm9tZSkudmFsKCkubGVuZ3RoIDwgMikge1xuICAgICAgICAvLyBnbG9iYWxzLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lck5vbWUpO1xuICAgICAgICBsYW5kaW5nLmlzVmFsaWROYW1lID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoJChub21lKS52YWwoKS5sZW5ndGggPCAyICYmIHR5cGUgIT09ICdmb2N1c291dCcpIHtcbiAgICAgICAgICAvLyBnbG9iYWxzLnJzdlNob3dGb3JtRmVlZGJhY2soJ2ZvY3VzaW4nLCBfY29udGFpbmVyTm9tZSk7XG4gICAgICAgICAgbGFuZGluZy5pc1ZhbGlkTmFtZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKCQobm9tZSkudmFsKCkubGVuZ3RoIDwgMiAmJiB0eXBlID09ICdmb2N1c291dCcpIHtcbiAgICAgICAgICAvLyBnbG9iYWxzLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lck5vbWUpO1xuICAgICAgICAgIGxhbmRpbmcuaXNWYWxpZE5hbWUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBnbG9iYWxzLnJzdlNob3dGb3JtRmVlZGJhY2soJ3N1Y2Nlc3MnLCBfY29udGFpbmVyTm9tZSk7XG4gICAgICAgICAgbGFuZGluZy5pc1ZhbGlkTmFtZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ3ZlcmlmaWNhRmllbGQgbGFuZGluZy5pc1ZhbGlkTmFtZScsIGxhbmRpbmcuaXNWYWxpZE5hbWUpO1xuXG4gICAgICBpZiAoIWxhbmRpbmcucnN2VmFsaWRhdGVFbWFpbCgkKGVtYWlsKS52YWwoKSkpIHtcbiAgICAgICAgaWYgKGlzU3VibWl0dGVkKSB7XG4gICAgICAgICAgLy8gbGFuZGluZy5yc3ZTaG93Rm9ybUZlZWRiYWNrKCdlcnJvcicsIF9jb250YWluZXIpO1xuICAgICAgICAgIGxhbmRpbmcuaXNWYWxpZEVtYWlsID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoJChlbWFpbCkudmFsKCkubGVuZ3RoID4gMCAmJiB0eXBlICE9PSAnZm9jdXNvdXQnKSB7XG4gICAgICAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ2ZvY3VzaW4nLCBfY29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCQoZW1haWwpLnZhbCgpLmxlbmd0aCA+IDAgJiYgdHlwZSA9PSAnZm9jdXNvdXQnKSB7XG4gICAgICAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGxhbmRpbmcucnN2U2hvd0Zvcm1GZWVkYmFjaygnZXJyb3InLCBfY29udGFpbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFuZGluZy5pc1ZhbGlkRW1haWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxhbmRpbmcucnN2VmFsaWRhdGVFbWFpbCgkKGVtYWlsKS52YWwoKSkpIHtcbiAgICAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ3N1Y2Nlc3MnLCBfY29udGFpbmVyKTtcbiAgICAgICAgICBsYW5kaW5nLmlzVmFsaWRFbWFpbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ3ZlcmlmaWNhRmllbGQgbGFuZGluZy5pc1ZhbGlkRW1haWwnLCBsYW5kaW5nLmlzVmFsaWRFbWFpbCk7XG5cbiAgICAgIC8vIGlmICgkKHNlbGVjdG9yKS5pbnB1dG1hc2soXCJpc0NvbXBsZXRlXCIpKXtcbiAgICAgIC8vYnVuZGxlLmpzaWYgKCQoY3BmKS5tYXNrKCdpc0NvbXBsZXRlJykpIHtcbiAgICAgIGlmIChsYW5kaW5nLmNwZk1hc2subWFzaygnaXNDb21wbGV0ZScpKSB7XG4gICAgICAgIHZhciBfY3BmVmFsID0gJChjcGYpLnZhbCgpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICAgIGlmICghbGFuZGluZy52YWxpZGF0ZUNQRihfY3BmVmFsKSkge1xuICAgICAgICAgIC8vIGxhbmRpbmcucnN2U2hvd0Zvcm1GZWVkYmFjaygnZXJyb3InLCBfY29udGFpbmVyKTtcbiAgICAgICAgICBsYW5kaW5nLmlzVmFsaWRDUEYgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ3N1Y2Nlc3MnLCBfY29udGFpbmVyKTtcbiAgICAgICAgICBsYW5kaW5nLmlzVmFsaWRDUEYgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lcik7XG4gICAgICAgIGxhbmRpbmcuaXNWYWxpZENQRiA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygndmVyaWZpY2FGaWVsZCBsYW5kaW5nLmlzVmFsaWRDUEYnLCBsYW5kaW5nLmlzVmFsaWRDUEYpO1xuXG4gICAgICAvLyBpZiAoZmllbGQgPT09ICdmb3JtSGVicmFpY2FOb21lRmllbGQnKSB7XG4gICAgICAvLyAgIGlmICgkKF9maWVsZCkudmFsKCkgPT0gJycgfHwgJChfZmllbGQpLnZhbCgpLmxlbmd0aCA8IDIpIHtcbiAgICAgIC8vICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lcik7XG4gICAgICAvLyAgICAgbGFuZGluZy5pc1ZhbGlkTmFtZShmYWxzZSk7XG4gICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgaWYgKCQoX2ZpZWxkKS52YWwoKS5sZW5ndGggPCAyICYmIHR5cGUgIT09ICdmb2N1c291dCcpIHtcbiAgICAgIC8vICAgICAgIC8vIGxhbmRpbmcucnN2U2hvd0Zvcm1GZWVkYmFjaygnZm9jdXNpbicsIF9jb250YWluZXIpO1xuICAgICAgLy8gICAgICAgbGFuZGluZy5pc1ZhbGlkTmFtZShmYWxzZSk7XG4gICAgICAvLyAgICAgfSBlbHNlIGlmICgkKF9maWVsZCkudmFsKCkubGVuZ3RoIDwgMiAmJiB0eXBlID09ICdmb2N1c291dCcpIHtcbiAgICAgIC8vICAgICAgIC8vIGxhbmRpbmcucnN2U2hvd0Zvcm1GZWVkYmFjaygnZXJyb3InLCBfY29udGFpbmVyKTtcbiAgICAgIC8vICAgICAgIGxhbmRpbmcuaXNWYWxpZE5hbWUoZmFsc2UpO1xuICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ3N1Y2Nlc3MnLCBfY29udGFpbmVyKTtcbiAgICAgIC8vICAgICAgIGxhbmRpbmcuaXNWYWxpZE5hbWUodHJ1ZSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG5cbiAgICAgIC8vIGlmIChmaWVsZCA9PT0gJ2Zvcm1IZWJyYWljYUNlbHVsYXJGaWVsZCcpIHtcbiAgICAgIC8vICAgaWYgKCQoJyNmb3JtSGVicmFpY2FDZWx1bGFyRmllbGQnKS5pbnB1dG1hc2soJ2lzQ29tcGxldGUnKSkge1xuICAgICAgLy8gICAgIGlmICgkKF9maWVsZCkudmFsKCkubGVuZ3RoIDwgMTAgJiYgdHlwZSAhPT0gJ2ZvY3Vzb3V0Jykge1xuICAgICAgLy8gICAgICAgLy8gbGFuZGluZy5yc3ZTaG93Rm9ybUZlZWRiYWNrKCdlcnJvcicsIF9jb250YWluZXIpO1xuICAgICAgLy8gICAgICAgbGFuZGluZy5pc1ZhbGlkQ2VsdWxhcihmYWxzZSk7XG4gICAgICAvLyAgICAgfSBlbHNlIGlmICgkKF9maWVsZCkudmFsKCkubGVuZ3RoIDwgMTAgJiYgdHlwZSA9PSAnZm9jdXNvdXQnKSB7XG4gICAgICAvLyAgICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lcik7XG4gICAgICAvLyAgICAgICBsYW5kaW5nLmlzVmFsaWRDZWx1bGFyKGZhbHNlKTtcbiAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgLy8gbGFuZGluZy5yc3ZTaG93Rm9ybUZlZWRiYWNrKCdzdWNjZXNzJywgX2NvbnRhaW5lcik7XG4gICAgICAvLyAgICAgICBsYW5kaW5nLmlzVmFsaWRDZWx1bGFyKHRydWUpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAvLyBsYW5kaW5nLnJzdlNob3dGb3JtRmVlZGJhY2soJ2Vycm9yJywgX2NvbnRhaW5lcik7XG4gICAgICAvLyAgICAgbGFuZGluZy5pc1ZhbGlkQ2VsdWxhcihmYWxzZSk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cblxuICAgICAgLy8gaWYgKGxhbmRpbmcuaXNWYWxpZE5hbWUoKSAmJiBsYW5kaW5nLmlzVmFsaWRFbWFpbCgpICYmIGxhbmRpbmcuaXNWYWxpZENQRigpICYmIGxhbmRpbmcuaXNWYWxpZENlbHVsYXIoKSkge1xuICAgICAgLy8gICBpZiAoaXNTdWJtaXR0ZWQpIHtcbiAgICAgIC8vICAgICBsYW5kaW5nLnNlbmQoKTtcbiAgICAgIC8vICAgICBsYW5kaW5nLnN1Ym1pdFRvQ29udGFudExpc3QoJCgnI2Zvcm1IZWJyYWljYUVtYWlsRmllbGQnKS52YWwoKSwgZmFsc2UpO1xuICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuICAgICAgaWYgKGxhbmRpbmcuaXNWYWxpZE5hbWUgJiYgbGFuZGluZy5pc1ZhbGlkRW1haWwpIHtcbiAgICAgICAgaWYgKGlzU3VibWl0dGVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkb3UnKTtcbiAgICAgICAgICAvLyBsYW5kaW5nLnNlbmQoKTtcbiAgICAgICAgICAvLyBsYW5kaW5nLnN1Ym1pdFRvQ29udGFudExpc3QoJCgnI2Zvcm1IZWJyYWljYUVtYWlsRmllbGQnKS52YWwoKSwgZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuXG4gIGxhbmRpbmcuaW5pdCgpO1xuXG5cbiAgZnVuY3Rpb24gc2VuZEZvcm0oKSB7XG4gICAgY29uc29sZS5sb2coJ3NlbmRGb3JtJyk7XG5cbiAgICB2YXIgbm9tZSA9ICcjSW5wdXROb21lJztcbiAgICB2YXIgZW1haWwgPSAnI0lucHV0RW1haWwnO1xuICAgIHZhciBjcGYgPSAnI0lucHV0Q1BGJztcbiAgICB2YXIgdGVsID0gJyNJbnB1dFRlbGVmb25lJztcbiAgICB2YXIgZXN0YWRvID0gJyNFc3RhZG8nO1xuXG4gICAgbGFuZGluZy52ZXJpZmljYUZpZWxkKG5vbWUsIGVtYWlsLCBjcGYsIHRlbCwgZXN0YWRvLCB0cnVlLCAna2V5dXAnKTtcblxuICB9XG5cbn1cbiJdfQ==

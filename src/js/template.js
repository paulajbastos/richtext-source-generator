export default function template() {
  var landing = {
    isValidName: false,
    isValidEmail: false,
    isValidCPF: false,
    isValidCelular: false,
    isValidSelect: false,
    init: function () {

      // var phone = document.getElementById('fieldPhone');
      // $(phone).inputmask('(99) 99999-9999');
      // var cpf = document.getElementById('fieldCpf');
      // $(cpf).inputmask('999.999.999-99');

      $('#submit').on('click', function() {
        sendForm();
      });

      var selectEstado = $('#selectEstado'),
      selectLoja = $('#selectLoja'),
      options = selectLoja.find('option');

      selectEstado.on('change', function () {
        selectLoja.html(options.filter('[UFdata="' + this.value + '"]'));
      }).trigger('change');

      /* FORM ------------------------------- START */
      landing.rsvFloatLabelInit();
      landing.showFormFeedbackRealTime('#form');
      /* FORM ------------------------------- /
      END --------------END--------------- END */
      
    },
    rsvFloatLabelInit: function () {
      $('.rsv-form .form-input').on('input', function () {
        var $field = $(this).closest('.form-item');
        if (this.value) {
          $field.addClass('field--not-empty');
        } else {
          $field.removeClass('field--not-empty');
        }
      });
    },
    validateCPF: function (cpf) {
      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11)
        return false;
      for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }
      if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
          soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
          return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
          soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
          return false;
        return true;
      }
      else
        return false;
    },
    rsvValidateEmail: function (email) {
      var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return expr.test(email);
    },
    showFormFeedbackRealTime: function (form) {
      // console.log('showFormFeedbackRealTime');
      $(form).find('input').each(function (i, elem) {
        var _field = $(elem).attr('id');

        // console.log('showFormFeedbackRealTime', form);
        // console.log('elem', elem);
        // console.log('_field', _field);

        $(elem).parent().parent().removeClass('-error');

        $(elem).keyup(function (e) {
          var isSubmited = e.keyCode == 13 ? true : false;
          landing.verificaFields(_field, '', '', '', '', '', isSubmited, 'keyup');
          return false;
        });

        $(elem).focusout(function (e) {
          landing.verificaFields(_field, '', '', '', '', '', false, 'focusout');
          return false;
        });
      });

      $(form).find('select').each(function (i, elem) {
        var _field = $(elem).attr('id');

        // console.log('showFormFeedbackRealTime', form);
        // console.log('elem', elem);
        // console.log('_field', _field);

        $(elem).parent().parent().removeClass('-error');

        $(elem).keyup(function (e) {
          var isSubmited = e.keyCode == 13 ? true : false;
          landing.verificaFields(_field, '', '', '', '', '', isSubmited, 'keyup');
          return false;
        });

        $(elem).focusout(function (e) {
          landing.verificaFields(_field, '', '', '', '', '', false, 'focusout');
          return false;
        });
      });
    },
    rsvShowFormFeedback: function (type, target) {
      switch(true) {
        case type === 'error':
          $(target).addClass('-error').removeClass('-success').removeClass('-focus');
          $(target).find('.msg-block').fadeIn('fast');
          break;
        case type === 'success':
          $(target).addClass('-success').removeClass('-error').removeClass('-focus');
          $(target).find('.msg-block').fadeOut('fast');
          break;
        case type === 'focusin':
          $(target).addClass('-focus');
          $(target).removeClass('-success').removeClass('-error');
          $(target).find('.msg-block').fadeOut('fast');
          break;
        case type === 'reset':
          $(target).removeClass('-success').removeClass('-error').removeClass('-focus');
          $(target).find('.msg-block').fadeOut('fast');
          break;
      }
    },
    verificaFields: function (fieldItem, fieldName, fieldEmail, fieldCpf, fieldPhone, selectEstado, isSubmitted, type) {
      
      // console.log('verificaFields', fieldItem, fieldName, fieldEmail, fieldCpf, fieldPhone)
      //if(fieldName != '' && fieldEmail != '' && fieldCpf != '' && fieldPhone != '' && selectEstado != '') {
      if(fieldName != '' && fieldEmail != '' && fieldCpf != '' && fieldPhone != '') {
        var _fieldName = '#' + fieldName;
        var _fieldCpf = '#' + fieldCpf;
        var _fieldEmail = '#' + fieldEmail;
        var _fieldPhone = '#' + fieldPhone;
        var _selectEstado = '#' + selectEstado;
      }
      
      var _name = '';
      if(fieldItem === 'fieldName') {
        _name = '#' + fieldItem;
      } else {
        _name = _fieldName;
      }

      var _email = '';
      if(fieldItem === 'fieldEmail') {
        _email = '#' + fieldItem;
      } else {
        _email = _fieldEmail;
      }

      var _cpf = '';
      if(fieldItem === 'fieldCpf') {
        _cpf = '#' + fieldItem;
      } else {
        _cpf = _fieldCpf;
      }

      var _phone = '';
      if(fieldItem === 'fieldPhone') {
        _phone = '#' + fieldItem;
      } else {
        _phone = _fieldPhone;
      }

      var _estado = '';
      if(fieldItem === 'selectEstado') {
        _estado = '#' + fieldItem;
      } else {
        _estado = _selectEstado;
      }

      if(_name != undefined) {
        var _container = $(_name).closest('.form-group.-group-input');
        if ($(_name).val() == '' || $(_name).val().length < 2) {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidName = false;
        } else {
          if ($(_name).val().length < 2 && type !== 'focusout') {
            landing.rsvShowFormFeedback('focusin', _container);
            landing.isValidName = false;
          } else if ($(_name).val().length < 2 && type == 'focusout') {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidName = false;
          } else {
            landing.rsvShowFormFeedback('success', _container);
            landing.isValidName = true;
          }
        }
      }
      
      if(_email !== undefined) {
        var _container = $(_email).closest('.form-group.-group-input');
        if (!landing.rsvValidateEmail($(_email).val())) {
          if (isSubmitted) {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidEmail = false
          } else {
            if ($(_email).val().length > 0 && type !== 'focusout') {
              landing.rsvShowFormFeedback('focusin', _container);
            } else if ($(_email).val().length > 0 && type == 'focusout') {
              landing.rsvShowFormFeedback('error', _container);
            } else {
              landing.rsvShowFormFeedback('error', _container);
            }
            landing.isValidEmail = false;
          }
        } else {
          if (landing.rsvValidateEmail($(_email).val())) {
            landing.rsvShowFormFeedback('success', _container);
            landing.isValidEmail = true;
          }
        }
      }
      
      if(_cpf != undefined) {
        var _container = $(_cpf).closest('.form-group.-group-input');
        if ($(_cpf).inputmask('isComplete')) {
          var _cpfVal = $(_cpf).val().replace(/\D/g, '');
          if (!landing.validateCPF(_cpfVal)) {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidCPF = false
          } else {
            landing.rsvShowFormFeedback('success', _container);
            landing.isValidCPF = true
          }
        }else {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidCPF = false;
        }
      }
      
      if(_phone != undefined) {
        var _container = $(_phone).closest('.form-group.-group-input');
        if ($(_phone).inputmask('isComplete')) {
          if ($(_phone).val().length < 10 && type !== 'focusout') {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidCelular = false;
          } else if ($(_phone).val().length < 10 && type == 'focusout') {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidCelular = false;
          } else {
            landing.rsvShowFormFeedback('success', _container);
            landing.isValidCelular = true;
          }
        } else {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidCelular = false;
        }
      }

     if(_estado != undefined) {
        var _container = $(_estado).closest('.form-group.-group-input');
        if ($(_estado).val() == null) {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidSelect = false;
        } else {
          landing.rsvShowFormFeedback('success', _container);
          landing.isValidSelect = true;
        }
      }

      if (landing.isValidName && landing.isValidEmail && landing.isValidCPF && landing.isValidCelular) {
        if (isSubmitted) {
          console.log('validou');
          // landing.send();
          // landing.submitToContantList($('#formHebraicaEmailField').val(), false);
          return;
        }
      }
      return true;
    }

  }

  landing.init();

  function sendForm() {
    console.log('sendForm');

    var _fieldName = 'fieldName';
    var _fieldEmail = 'fieldEmail';
    var _fieldCpf = 'fieldCpf';
    var _fieldPhone = 'fieldPhone';
    var _selectEstado = 'selectEstado';
   
    landing.verificaFields('', _fieldName, _fieldEmail, _fieldCpf, _fieldPhone, _selectEstado, true, 'keyup');
  }

}





// import VMasker from "vanilla-masker"; // esta via CDN - ambos dando erro no OCC

// export default function template() {
//   var landing = {
//     isValidName: false,
//     isValidEmail: false,
//     isValidCPF: false,
//     isValidCelular: false,
//     isValidSelect: false,
//     init: function () {

//       var tel = document.getElementById('InputTelefone');
//       $(tel).inputmask("(99) 99999-9999");  //static mask

//       $('#submit').on('click', function() {
//         sendForm();
//       });

//       var select1 = $('#Estado'),
//       select2 = $('#Loja'),
//       options = select2.find('option');

//       select1.on('change', function () {
//         select2.html(options.filter('[UFdata="' + this.value + '"]'));
//       }).trigger('change');
//     },
//     validateCPF: function (cpf) {
//       var numeros, digitos, soma, i, resultado, digitos_iguais;
//       digitos_iguais = 1;
//       if (cpf.length < 11)
//         return false;
//       for (i = 0; i < cpf.length - 1; i++)
//         if (cpf.charAt(i) != cpf.charAt(i + 1)) {
//           digitos_iguais = 0;
//           break;
//         }
//       if (!digitos_iguais) {
//         numeros = cpf.substring(0, 9);
//         digitos = cpf.substring(9);
//         soma = 0;
//         for (i = 10; i > 1; i--)
//           soma += numeros.charAt(10 - i) * i;
//         resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//         if (resultado != digitos.charAt(0))
//           return false;
//         numeros = cpf.substring(0, 10);
//         soma = 0;
//         for (i = 11; i > 1; i--)
//           soma += numeros.charAt(11 - i) * i;
//         resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//         if (resultado != digitos.charAt(1))
//           return false;
//         return true;
//       }
//       else
//         return false;
//     },
//     rsvValidateEmail: function (email) {
//       var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//       return expr.test(email);
//     },    
//     rsvShowFormFeedback: function(field, content) {
//       var _msg = "Preencha todos os campos";

//       switch (field) {
//         case 'nome':
//           _msg = "Preencha Nome";
//           break;
//         case 'email':
//           _msg = "Preencha E-mail";
//           break;
//         case 'cpf':
//           _msg = "Preencha CPF";
//           break;
//         case 'tel':
//           _msg = "Preencha Celular ex: 21999999999";
//           break;
//         case 'estado':
//           _msg = "Preencha Estado e Cidade";
//           break;


//         default:
//           _msg = "Preencha todos os campos";
//           break;
//       }

//       $('.errorMsg').html(_msg);
//       if(field == 'estado') {
//         $('#Loja').css('border-bottom', '1px solid red');
//       }
//       $(content).css('border-bottom', '1px solid red');

//     },
//     verificaField: function (nome, email, cpf, tel, estado, isSubmitted, type) {

//       if ($(nome).val() == '' || $(nome).val().length < 2) {
//         landing.rsvShowFormFeedback('nome', nome);
//         landing.isValidName = false;
//       } else {
//         if ($(nome).val().length < 2 && type !== 'focusout') {
//           landing.rsvShowFormFeedback('nome', nome);
//           landing.isValidName = false;
//         } else if ($(nome).val().length < 2 && type == 'focusout') {
//           landing.rsvShowFormFeedback('nome', nome);
//           landing.isValidName = false;
//         } else {
//           // landing.rsvShowFormFeedback('success', _containerNome);
//           landing.isValidName = true;
//         }
//       }

//       if (!landing.rsvValidateEmail($(email).val())) {
//         if (isSubmitted) {
//           landing.rsvShowFormFeedback('nome', email);
//           landing.isValidEmail = false
//         } else {
//           if ($(email).val().length > 0 && type !== 'focusout') {
//             // landing.rsvShowFormFeedback('focusin', _container);
//           } else if ($(email).val().length > 0 && type == 'focusout') {
//             landing.rsvShowFormFeedback('nome', email);
//           } else {
//             landing.rsvShowFormFeedback('nome', email);
//           }
//           landing.isValidEmail = false;
//         }
//       } else {
//         if (landing.rsvValidateEmail($(email).val())) {
//           // landing.rsvShowFormFeedback('success', _container);
//           landing.isValidEmail = true;
//         }
//       }

//       var _cpfVal = $(cpf).val().replace(/\D/g, '');
//       if (!landing.validateCPF(_cpfVal)) {
//         landing.rsvShowFormFeedback('cpf', cpf);
//         landing.isValidCPF = false;
//       } else {
//         // landing.rsvShowFormFeedback('success', _container);
//         landing.isValidCPF = true;
//       }

//       if ($(tel).val().length < 15 && type !== 'focusout') {
//         landing.rsvShowFormFeedback('tel', tel);
//         landing.isValidCelular = false;
//       } else if ($(tel).val().length < 15 && type == 'focusout') {
//         landing.rsvShowFormFeedback('tel', tel);
//         landing.isValidCelular = false;
//       } else {
//         // landing.rsvShowFormFeedback('success', _container);
//         landing.isValidCelular = true;
//       }

//       if ($(estado).val() == null) {
//         landing.rsvShowFormFeedback('estado', estado);
//         landing.isValidSelect = false;
//       } else {
//         // landing.rsvShowFormFeedback('success', _containerNome);
//         landing.isValidSelect = true;
//       }

//       if (landing.isValidName && landing.isValidEmail && landing.isValidCPF && landing.isValidCelular && landing.isValidSelect) {
//         if (isSubmitted) {
//           console.log('validou');
//           $('.errorMsg').html('');
//           // landing.send();
//           // landing.submitToContantList($('#formHebraicaEmailField').val(), false);
//           return;
//         }
//       }

//       return true;
//     }
//   }


//   landing.init();


//   function sendForm() {
//     console.log('sendForm');

//     var nome = '#InputNome';
//     var email = '#InputEmail';
//     var cpf = '#InputCpf';
//     var tel = '#InputTelefone';
//     var estado = '#Estado';

//     landing.verificaField(nome, email, cpf, tel, estado, true, 'keyup');

//   }

// }

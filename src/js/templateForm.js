export default function templateForm() {
  var landing = {
    isValidName: false,
    isValidEmail: false,
    isValidCPF: false,
    isValidPhone: false,
    isValidSelectEstado: false,
    isValidSelectLoja: false,
    daySelected: '',
    init: function () {
      /* FORM ------------------------------- START */

      // Set Masks
      var phone = document.getElementById('fieldPhone');
      var cpf = document.getElementById('fieldCpf');
      var intervalId = setInterval(function () {
        if (phone !== undefined && cpf !== undefined) {
          $(phone).inputmask('(99) 99999-9999');
          $(cpf).inputmask('999.999.999-99');
          clearInterval(intervalId);
        }
      }, 300);

      // Send Form
      $('#submit').on('click', function () {
        landing.sendForm();
      });

      // Selects Estado and Loja
      var selectEstado = $('#selectEstado'),
        selectLoja = $('#selectLoja'),
        options = selectLoja.find('option');

      $(selectLoja).addClass('placeholder');

      selectEstado.on('change', function () {
        if ($(this).val() == null) {
          $(this).addClass('placeholder');
        } else {
          $(this).removeClass('placeholder');
          $(selectLoja).removeClass('placeholder');
        }
        selectLoja.html(options.filter('[UFdata="' + this.value + '"]'));
        landing.daySelected = $('#selectLoja option:selected').attr('lojaData');
      }).trigger('change');

      selectLoja.on('change', function () {
        var optionSelected = $("option:selected", this);
        landing.daySelected = optionSelected.attr('lojaData');
      });

      // Init Float Laber
      landing.rsvFloatLabelInit();

      // Init Feedback UI
      landing.showFeedbackInRealTime('#form');

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
    rsvValidateEmail: function (email) {
      var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return expr.test(email);
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
    showFeedbackInRealTime: function (form) {

      $(form).find('input').each(function (i, elem) {
        var _field = $(elem).attr('id');

        $(elem).parent().parent().removeClass('-error');

        var isSubmited = false;
        var _return = true;
        $(elem).keyup(function (e) {
          isSubmited = e.keyCode === 13 ? true : false;
          if (_field == 'fieldCpf') {
            if ($('#fieldCpf').inputmask('isComplete')) {
              landing.verifyRequiredFields(_field, '', '', '', '', '', '', isSubmited, 'keyup');
              _return = false;
            }
          }
          else if (_field == 'fieldPhone') {
            if ($('#fieldPhone').inputmask('isComplete')) {
              landing.verifyRequiredFields(_field, '', '', '', '', '', '', isSubmited, 'keyup');
              _return = false;
            }
          } else {
            landing.verifyRequiredFields(_field, '', '', '', '', '', '', isSubmited, 'keyup');
            _return = false;
          }

          return _return;
        });

        $(elem).focusout(function (e) {
          landing.verifyRequiredFields(_field, '', '', '', '', '', '', false, 'focusout');
          return false;
        });
      });

      $(form).find('select').each(function (i, elem) {
        var _field = $(elem).attr('id');
        $(elem).parent().parent().removeClass('-error');
        $(elem).on('change', function () {
          landing.verifyRequiredFields(_field, '', '', '', '', '', '', false, 'keyup');
        });

      });
    },
    rsvShowFormFeedback: function (type, target) {
      switch (true) {
        case type === 'error':
          $(target).addClass('-error').removeClass('-success').removeClass('-focus');
          $('.msg-block').fadeIn();
          break;
        case type === 'success':
          $(target).addClass('-success').removeClass('-error').removeClass('-focus');
          $('.msg-block').fadeOut();
          break;
        case type === 'focusin':
          $(target).addClass('-focus');
          $(target).removeClass('-success').removeClass('-error');
          $('.msg-block').fadeOut();

          break;
        case type === 'reset':
          $(target).removeClass('-success').removeClass('-error').removeClass('-focus');
          $('.msg-block').fadeOut();
          break;
      }
    },
    verifyRequiredFields: function (fieldItem, fieldName, fieldEmail, fieldCpf, fieldPhone, selectEstado, selectLoja, isSubmitted, type) {

      if (fieldName != '' && fieldEmail != '' && fieldCpf != '' && fieldPhone != '') {
        var _fieldName = '#' + fieldName;
        var _fieldCpf = '#' + fieldCpf;
        var _fieldEmail = '#' + fieldEmail;
        var _fieldPhone = '#' + fieldPhone;
        var _selectEstado = '#' + selectEstado;
        var _selectLoja = '#' + selectLoja;
      }

      // Get name
      var _name = '';
      if (fieldItem === 'fieldName') {
        _name = '#' + fieldItem;
      } else {
        _name = _fieldName;
      }

      // Get E-mail
      var _email = '';
      if (fieldItem === 'fieldEmail') {
        _email = '#' + fieldItem;
      } else {
        _email = _fieldEmail;
      }

      // Get CPF
      var _cpf = '';
      if (fieldItem === 'fieldCpf') {
        _cpf = '#' + fieldItem;
      } else {
        _cpf = _fieldCpf;
      }

      // Get Phone
      var _phone = '';
      if (fieldItem === 'fieldPhone') {
        _phone = '#' + fieldItem;
      } else {
        _phone = _fieldPhone;
      }

      // Get Estado
      var _estado = '';
      if (fieldItem === 'selectEstado') {
        _estado = '#' + fieldItem;
      } else {
        _estado = _selectEstado;
      }

      // Get Loja
      var _loja = '';
      if (fieldItem === 'selectLoja') {
        _loja = '#' + fieldItem;
      } else {
        _loja = _selectLoja;
      }

      // Validate Name
      if (_name != undefined) {
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

      // Validate E-mail
      if (_email !== undefined) {
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

      // Validate CPF
      if (_cpf != undefined) {
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
        } else {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidCPF = false;
        }
      }

      // Validate Phone
      if (_phone != undefined) {
        var _container = $(_phone).closest('.form-group.-group-input');
        if ($(_phone).inputmask('isComplete')) {
          if ($(_phone).val().length < 10 && type !== 'focusout') {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidPhone = false;
          } else if ($(_phone).val().length < 10 && type == 'focusout') {
            landing.rsvShowFormFeedback('error', _container);
            landing.isValidPhone = false;
          } else {
            landing.rsvShowFormFeedback('success', _container);
            landing.isValidPhone = true;
          }
        } else {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidPhone = false;
        }
      }

      // Validate Estado
      if (_estado != undefined) {
        var _container = $(_estado).closest('.form-group.-group-input');
        if ($(_estado).val() == null) {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidSelectEstado = false;
        } else {
          landing.rsvShowFormFeedback('success', _container);
          landing.isValidSelectEstado = true;

          //ON CHANGE ESTADO validate Loja
          var _containerLoja = $('#selectLoja').closest('.form-group.-group-input');
          landing.rsvShowFormFeedback('success', _containerLoja);
          landing.isValidSelectLoja = true;

        }
      }

      // Validate Loja
      if (_loja != undefined) {
        var _container = $(_loja).closest('.form-group.-group-input');
        if ($(_loja).val() == null) {
          landing.rsvShowFormFeedback('error', _container);
          landing.isValidSelectLoja = false;
        } else {
          landing.rsvShowFormFeedback('success', _container);
          landing.isValidSelectLoja = true;
        }
      }

      // Check All Required Validations and SUBIMIT if isSubmitted = true
      if (landing.isValidName && landing.isValidEmail && landing.isValidCPF && landing.isValidPhone && landing.isValidSelectEstado && landing.isValidSelectLoja) {
        var _loader = document.querySelector('.rsv-loader-square');
        var _bt = document.querySelector('.bt-submit');

        console.log('isSubmitted', isSubmitted);

        if (isSubmitted) {

          $(_loader).fadeIn();
          $(_bt).fadeOut();

          console.log('validou');
          //Fake URL
          var _url = 'https://jsonplaceholder.typicode.com/posts';
          // _url = 'https://chamaeva.com/xx/acao_inv2019.php';
          jQuery.ajax({
            type: 'POST',
            dataType: 'text',
            url: _url,
            data: {
              nome: $(_name).val(),
              email: $(_email).val(),
              cpf: $(_cpf).val(),
              tel: $(_phone).val(),
              estado: $(_estado).val(),
              loja: $('#selectLoja').val(),
            },
            success: function (data) {
              // console.log('success', data);
              $('#jsNome').html($(_name).val());
              $('#jsLoja').html($('#selectLoja').val());
              $('#jsDia').html(landing.daySelected);

              $(_name).val('');
              $(_email).val('');
              $(_cpf).val('');
              $(_phone).val('');
              $(_estado).val(null);
              $('#selectLoja').val(null);

              $('#formResponse').fadeIn().css('display', 'flex');
              $('#form').fadeOut();

              $(_loader).fadeOut();
              $(_bt).fadeIn();
            },
            error: function (error) {
              console.log(error);
              alert("Tente novamente mais tarde!");
            }
          });
          return;
        }
      } else {
        // console.log('Nao validou');
      }
      return true;
    },
    sendForm: function () {
      // console.log('sendForm');
      var _fieldName = 'fieldName';
      var _fieldEmail = 'fieldEmail';
      var _fieldCpf = 'fieldCpf';
      var _fieldPhone = 'fieldPhone';
      var _selectEstado = 'selectEstado';
      var _selectLoja = 'selectLoja';

      landing.verifyRequiredFields('', _fieldName, _fieldEmail, _fieldCpf, _fieldPhone, _selectEstado, _selectLoja, true, 'keyup');
    }
  }
  landing.init();
}
// import Inputmask from "jquery.inputmask";
import Inputmask from "inputmask";


export default function template() {
  console.log("template JS loaded");

  var select1 = $( '#Estado' ),
  select2 = $( '#Loja' ),
    options = select2.find( 'option' );

	select1.on( 'change', function() {
		select2.html( options.filter( '[UFdata="' + this.value + '"]' ) );
	} ).trigger( 'change' );

  // var landing = {
  //   isValidName: false,
  //   isValidEmail: false,
  //   isValidCPF: false,
  //   isValidCelular: false,
  //   isValidSelect: false,
  //   cpfMask: 0,

  //   init: function () {

  //     var tel = document.getElementById('InputTelefone');
  //     var telMask = new Inputmask('(99)99999-9999');
  //     telMask.mask(tel);

  //     var cpf = document.getElementById('InputCPF');
  //     landing.cpfMask = new Inputmask('999.999.999-99');
  //     landing.cpfMask.mask(cpf);

  //     $('#submit').on('click', function() {
  //       sendForm();
  //     });



  //     var select1 = $('#Estado'),
  //     select2 = $('#Loja'),
  //     options = select2.find('option');

  //     select1.on('change', function () {
  //       select2.html(options.filter('[UFdata="' + this.value + '"]'));
  //     }).trigger('change');
  //   },
  //   validateCPF: function (cpf) {
  //     var numeros, digitos, soma, i, resultado, digitos_iguais;
  //     digitos_iguais = 1;
  //     if (cpf.length < 11)
  //       return false;
  //     for (i = 0; i < cpf.length - 1; i++)
  //       if (cpf.charAt(i) != cpf.charAt(i + 1)) {
  //         digitos_iguais = 0;
  //         break;
  //       }
  //     if (!digitos_iguais) {
  //       numeros = cpf.substring(0, 9);
  //       digitos = cpf.substring(9);
  //       soma = 0;
  //       for (i = 10; i > 1; i--)
  //         soma += numeros.charAt(10 - i) * i;
  //       resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  //       if (resultado != digitos.charAt(0))
  //         return false;
  //       numeros = cpf.substring(0, 10);
  //       soma = 0;
  //       for (i = 11; i > 1; i--)
  //         soma += numeros.charAt(11 - i) * i;
  //       resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  //       if (resultado != digitos.charAt(1))
  //         return false;
  //       return true;
  //     }
  //     else
  //       return false;
  //   },
  //   rsvValidateEmail: function (email) {
  //     var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  //     return expr.test(email);
  //   },
  //   verificaField: function (nome, email, cpf, tel, estado, isSubmitted, type,) {

  //     console.log('verificaField');

  //     if ($(nome).val() == '' || $(nome).val().length < 2) {
  //       // globals.rsvShowFormFeedback('error', _containerNome);
  //       landing.isValidName = false;
  //     } else {
  //       if ($(nome).val().length < 2 && type !== 'focusout') {
  //         // globals.rsvShowFormFeedback('focusin', _containerNome);
  //         landing.isValidName = false;
  //       } else if ($(nome).val().length < 2 && type == 'focusout') {
  //         // globals.rsvShowFormFeedback('error', _containerNome);
  //         landing.isValidName = false;
  //       } else {
  //         // globals.rsvShowFormFeedback('success', _containerNome);
  //         landing.isValidName = true;
  //       }
  //     }

  //     console.log('verificaField landing.isValidName', landing.isValidName);

  //     if (!landing.rsvValidateEmail($(email).val())) {
  //       if (isSubmitted) {
  //         // landing.rsvShowFormFeedback('error', _container);
  //         landing.isValidEmail = false
  //       } else {
  //         if ($(email).val().length > 0 && type !== 'focusout') {
  //           // landing.rsvShowFormFeedback('focusin', _container);
  //         } else if ($(email).val().length > 0 && type == 'focusout') {
  //           // landing.rsvShowFormFeedback('error', _container);
  //         } else {
  //           // landing.rsvShowFormFeedback('error', _container);
  //         }
  //         landing.isValidEmail = false;
  //       }
  //     } else {
  //       if (landing.rsvValidateEmail($(email).val())) {
  //         // landing.rsvShowFormFeedback('success', _container);
  //         landing.isValidEmail = true;
  //       }
  //     }

  //     console.log('verificaField landing.isValidEmail', landing.isValidEmail);

  //     // if ($(selector).inputmask("isComplete")){
  //     //bundle.jsif ($(cpf).mask('isComplete')) {
  //     if (landing.cpfMask.mask('isComplete')) {
  //       var _cpfVal = $(cpf).val().replace(/\D/g, '');
  //       if (!landing.validateCPF(_cpfVal)) {
  //         // landing.rsvShowFormFeedback('error', _container);
  //         landing.isValidCPF = false;
  //       } else {
  //         // landing.rsvShowFormFeedback('success', _container);
  //         landing.isValidCPF = true;
  //       }
  //     } else {
  //       // landing.rsvShowFormFeedback('error', _container);
  //       landing.isValidCPF = false;
  //     }

  //     console.log('verificaField landing.isValidCPF', landing.isValidCPF);

  //     // if (field === 'formHebraicaNomeField') {
  //     //   if ($(_field).val() == '' || $(_field).val().length < 2) {
  //     //     // landing.rsvShowFormFeedback('error', _container);
  //     //     landing.isValidName(false);
  //     //   } else {
  //     //     if ($(_field).val().length < 2 && type !== 'focusout') {
  //     //       // landing.rsvShowFormFeedback('focusin', _container);
  //     //       landing.isValidName(false);
  //     //     } else if ($(_field).val().length < 2 && type == 'focusout') {
  //     //       // landing.rsvShowFormFeedback('error', _container);
  //     //       landing.isValidName(false);
  //     //     } else {
  //     //       // landing.rsvShowFormFeedback('success', _container);
  //     //       landing.isValidName(true);
  //     //     }
  //     //   }
  //     // }

  //     // if (field === 'formHebraicaCelularField') {
  //     //   if ($('#formHebraicaCelularField').inputmask('isComplete')) {
  //     //     if ($(_field).val().length < 10 && type !== 'focusout') {
  //     //       // landing.rsvShowFormFeedback('error', _container);
  //     //       landing.isValidCelular(false);
  //     //     } else if ($(_field).val().length < 10 && type == 'focusout') {
  //     //       // landing.rsvShowFormFeedback('error', _container);
  //     //       landing.isValidCelular(false);
  //     //     } else {
  //     //       // landing.rsvShowFormFeedback('success', _container);
  //     //       landing.isValidCelular(true);
  //     //     }
  //     //   } else {
  //     //     // landing.rsvShowFormFeedback('error', _container);
  //     //     landing.isValidCelular(false);
  //     //   }
  //     // }

  //     // if (landing.isValidName() && landing.isValidEmail() && landing.isValidCPF() && landing.isValidCelular()) {
  //     //   if (isSubmitted) {
  //     //     landing.send();
  //     //     landing.submitToContantList($('#formHebraicaEmailField').val(), false);
  //     //     return;
  //     //   }
  //     // }
  //     if (landing.isValidName && landing.isValidEmail) {
  //       if (isSubmitted) {
  //         console.log('validou');
  //         // landing.send();
  //         // landing.submitToContantList($('#formHebraicaEmailField').val(), false);
  //         return;
  //       }
  //     }

  //     return true;
  //   }
  // }


  // landing.init();


  // function sendForm() {
  //   console.log('sendForm');

  //   var nome = '#InputNome';
  //   var email = '#InputEmail';
  //   var cpf = '#InputCPF';
  //   var tel = '#InputTelefone';
  //   var estado = '#Estado';

  //   landing.verificaField(nome, email, cpf, tel, estado, true, 'keyup');

  // }

}

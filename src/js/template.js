export default function template() {
  console.log("template JS loaded");

  jQuery.ajax({
    type: 'GET',
    url: 'https://api-prd.reservapto.com.br/occ-physicalstore-subscribe/store',
    headers: {
      'Authorization': 'Basic b2NjOjkxcjQjQG5yeDE3I0BydXQwY2MzIw'
    },
    success: function (data) {
      console.log(data);
    }
  });

  var select1 = $( '#Estado' ),
  select2 = $( '#Loja' ),
    options = select2.find( 'option' );

  select1.on( 'change', function() {
    select2.html( options.filter( '[UFdata="' + this.value + '"]' ) );
  } ).trigger( 'change' );


}

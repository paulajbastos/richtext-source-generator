export default function template() {
  console.log("template JS loaded");

  var select1 = $( '#Estado' ),
  select2 = $( '#Loja' ),
    options = select2.find( 'option' );

  select1.on( 'change', function() {
    select2.html( options.filter( '[UFdata="' + this.value + '"]' ) );
  } ).trigger( 'change' );


}

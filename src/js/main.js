
function isFunction(f, name) {
  // console.log(`${name} is constructable: ${isConstructor(f)}`);
  return isConstructor(f);
}

function isConstructor(f) {
  try {
    new f();
  } catch (err) {
    if (err.message.indexOf('is not a constructor') >= 0) {
      return false;
    }
  }
  return true;
}

var interval = setInterval(function(){
  // console.log('Instafeed', Instafeed)
  if (isFunction(Instafeed, 'Instafeed')) {
    var galleryFeed = new Instafeed({
      get: "user",
      userId: 21260786,
      accessToken: "21260786.1677ed0.a7b40f3e04994d888db2ec6b3b51d2f3",
      resolution: "standard_resolution",
      useHttp: "true",
      limit: 4,
      target: "instafeedReserva",
      template: '<a href="{{link}}" title="{{caption}}" target="_blank" id="{{id}}" style="background-image: url({{image}})"></a>',
    });
    galleryFeed.run();
    clearInterval(interval);
  }
}, 3000);

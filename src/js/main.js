let bt = document.getElementById('btSend');

bt.onclick = function() {

  // "data": "{\n    \"appointment\" : \"2019-12-20-15-30\"\n}"
  // "data": JSON.stringify(data)
  var data = {
    "appointment" : "2019-12-20-15-30"
  };

  var settings = {
    "url": "http://localhost:8080/api/calendar-update",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": JSON.stringify(data, false)
  }

  jQuery.ajax(settings).success(function (response) {
    console.log(response);
  }).error(function (err) {
    console.log(err);
  });
};

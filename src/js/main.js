let bt = document.getElementById('btSend');

bt.onclick = function() {

  // "data": "{\n    \"appointment\" : \"2019-12-20-15-30\"\n}"
  var data = {
    "id": "5ddbd612a11d000e1748019f",
    "appointment": [
      {
        "hour": "16-00"
      }
    ]
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

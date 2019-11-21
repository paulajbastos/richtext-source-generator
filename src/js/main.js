// import template from './template';
// template();

// let app = {
//   checkCalendarOption: function(date) {
//     console.log('date', date)
//   };
// }


let bt = document.getElementById('btSend');

bt.onclick = function() { 
    console.log('2019-12-20-15-30');
    let date = '2019-12-20-15-30';
    let id = '5dd5dd691d8f655b98ef6d41';
    const url = `/localhost:8080/api/calendar/${id}`;
    console.log('url', url);


    jQuery.ajax({
        url: `/localhost:8080/api/calendar/`,
        type: 'GET',
        //data: {"available": false},
        success: function(result) {
            //Do something with the result
            console.log('result');
        } 
    });
};

// bt.onclick(function () {
//     console.log('2019-12-20-15-30');
// })

//  function checkCalendarOption (date) {
//     console.log('date', date)
//   };
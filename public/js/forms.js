// text area
$(document).ready(function(){
  $('#textarea1').trigger('autoresize');
});

// datepicker
let day = new Date();
let nextDay = new Date(day);
nextDay.setDate(day.getDate()+1);

$(document).ready(function(){
  $('.datepicker').datepicker({
    minDate: new Date(),
    defaultDate: nextDay,
    setDefaultDate: true,
    autoClose: true,
    format: "yyyy-mm-dd"
  });
});

// timepicker
$(document).ready(function(){
  $('.timepicker').timepicker({
    autoClose: true,
    twelveHour: false
  });
});

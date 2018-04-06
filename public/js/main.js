$(document).ready(function(){
  $('.sidenav').sidenav();

  // error Flash
  const alertsError = $(".alerts_error");
  for (alert=0; alert<alertsError.length; alert++) {
    M.toast({html: alertsError[alert].textContent, classes: "pink darken-4"});
  }

  // success Flash
  const alertsSuccess = $(".alerts_success");
  for (alert=0; alert<alertsSuccess.length; alert++) {
    M.toast({html: alertsSuccess[alert].textContent, classes: "light-green darken-4"});
  }

});

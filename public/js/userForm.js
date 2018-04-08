// what to do when we recieve the request
const responseHandler = function() {
  // console.log("success");
  console.log("response:", this.responseText);
  if (this.responseText == "not valid") {
    $("#helper-email").text("Invalid email format").css("color", "red");
    $("#submit-btn").attr("disabled", true);
  } else if (this.responseText == "true") {
    $("#helper-email").text("Email accepted").css("color", "#795548");
    $("#submit-btn").attr("disabled", false);
  } else if (this.responseText == "false") {
    $("#helper-email").text("Email not available").css("color", "red");
    $("#submit-btn").attr("disabled", true);
  }

};

const requestFailed = function(){
  console.log("error");
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

const checkEmail = (email) => {
  console.log(email);
  // ajax test
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);

  request.open("POST", "/users/checkEmail");
  //Send the proper header information along with the request
  request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  // send the request
  request.send(JSON.stringify({ email }));
}

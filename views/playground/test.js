console.log("linked");

var input = document.getElementById("myinput");

// Show label but insert value into the input:
new Awesomplete(input, {
	list: [
		{ label: "Belarus", value: "BY" },
		{ label: "China", value: "CN" },
		{ label: "United States", value: "US" },
    { label: "BINANCE/BITCOIN", value: "BNBBTC" }
	]
});

$(".autocomplete").autocomplete({
  data: {
    "Apple": null,
    "Microsoft": null,
    "Google": ''
  }
})

// what to do when we recieve the request
const responseHandler = function() {
  // console.log("success");
  console.log("response:", this.responseText);
  $("#priceData").text("TEST");
};

const requestFailed = function(){
  console.log("error");
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

const getBinance = (endpoint) => {
  // ajax test
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);

  request.open("GET", endpoint);
  //Send the proper header information along with the request
  request.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
  // send the request
  request.send();
}

getBinance("https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT");

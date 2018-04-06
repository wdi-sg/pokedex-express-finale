$(".autocomplete").autocomplete({
  data: {
    "Binance": null,
    "Bitcoin": null,
    "Ethereum": null
  }
})

const responseFetchTicker = function(){
  // console.log("response:", this.responseText);
  let rawData = this.responseText;
  // console.log(rawData)
  let jsonData = JSON.parse(rawData);
  // console.log(jsonData);
  // $("#priceData").empty();
  $("#symbol-value").text(jsonData["symbol"]);
  $("#price-value").text(jsonData["lastPrice"]);
  $("#change-value").text(jsonData["priceChangePercent"]);
  $("#24h-value").text(jsonData["highPrice"]);
  $("#24l-value").text(jsonData["lowPrice"]);
  $("#abschange-value").text(jsonData["priceChange"]);
  // for (key in jsonData) {
  //   $('#priceData').append(`<div>${key}: ${jsonData[key]}</div>`);
  // }
  // $("#priceData").text(jsonData);
  // let data = {};
  // let priceData = {};
  // for (i=0; i<jsonData.length; i++){
  //   data[jsonData[i].symbol] = null;
  //   priceData[jsonData[i].symbol] = jsonData[i].price;
  // }
  // $(".autocomplete").autocomplete({
  //   data,
  //   minLength: 2,
  //   onAutocomplete: function(val) {
  //    console.log(val);
  //    binancePublicAPI("/crypto/fetchTicker");
  //  }
  // })
};

const fetchTicker = (ticker) => {
  // ajax test
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseFetchTicker);
  request.addEventListener("error", requestFailed);
  request.open("POST", "/crypto/fetchTicker");
  //Send the proper header information along with the request
  request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  // send the request
  request.send(JSON.stringify({ ticker }));
}

// what to do when we recieve the request
const responseHandler = function(){
  // console.log("response:", this.responseText);
  let rawData = this.responseText;
  let jsonData = JSON.parse(rawData);
  let data = {};
  let priceData = {};
  for (i=0; i<jsonData.length; i++){
    data[jsonData[i].symbol] = null;
    priceData[jsonData[i].symbol] = jsonData[i].price;
  }
  $(".autocomplete").autocomplete({
    data,
    minLength: 2,
    onAutocomplete: function(val) {
     console.log(val);
     fetchTicker(val);
   }
  })
};

const requestFailed = function(){
  console.log("error");
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

const fetchTickers = () => {
  // ajax test
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", requestFailed);
  request.open("POST", "/crypto/fetchTickers");
  //Send the proper header information along with the request
  request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  // send the request
  request.send();
}

fetchTickers();

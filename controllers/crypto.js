const request = require('request');
const base = 'https://api.binance.com/api/';

const publicCall = (url, data, callback, method = "GET") => {
  // console.log("in call", url);
  if (!data) data = {};
  let opt = {
    url,
    qs: data,
    method,
    timeout: 60000,
    agent: false,
    headers: {
      'User-Agent': 'Mozilla/4.0 (compatible; Node Binance API)',
      'Content-type': 'application/x-www-form-urlencoded'
    }
  };
  request(opt, (error, response, body) => {
    if ( !callback ) return;

    if ( error )
        return callback( error, {});

    if ( response && response.statusCode !== 200 )
        return callback( response, {} );
    return callback( null, JSON.parse(body) );
  });
};

//     HTTP 4XX return codes are used for for malformed requests; the issue is on the sender's side.
// HTTP 429 return code is used when breaking a request rate limit.
// HTTP 418 return code is used when an IP has been auto-banned for continuing to send requests after receiving 429 codes.
// HTTP 5XX return codes are used for internal errors; the issue is on Binance's side.
// HTTP 504 return code is used when the API successfully sent the message but not get a response within the timeout period. It is important to NOT treat this as a failure; the execution status is UNKNOWN and could have been a success.

const fetchTickers = (req, res) => {
  console.log("in controller");
  publicCall(base+'v3/ticker/price', "", (err, results) => {
    console.log(err);
    // console.log("status code", err.statusCode)
    // console.log(results);
    res.send(results);
  })
}

const fetchTicker = (req, res) => {
  console.log("in controller");
  // console.log(req.body.ticker);
  publicCall(base+`v1/ticker/24hr?symbol=${req.body.ticker}`, "", (err, results) => {
    console.log(err);
    // console.log("status code", err.statusCode)
    // console.log(results);
    res.send(results);
  })
}

module.exports = {
  fetchTickers,
  fetchTicker
}

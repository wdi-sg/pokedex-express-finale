// we will need to store the hello.js file in the public folder

// app.use(express.static(__dirname + '/public'));
// use the above line in the index.js to let your app use files in the public folder


// *** hello is declared in your nodeJS files

// const hello = (req, res) => {

//     const foo = {
//       "hello" : "there",
//       "byebye" : "here"
//     }

//     res.send(foo);

//   }


window.onload = () => {

	var ajaxUrl = "/users/hello";

	// what to do when we recieve the request
	var responseHandler = function() {
	  console.log("response text", this.responseText);
	  console.log("status text", this.statusText);
	  console.log("status code", this.status);

	  // JSON parse the responseText
	  var helloText = JSON.parse(this.responseText);

	  // use DOM to call the input element
	  var email = document.getElementsByTagName('input')[0];

	  // set the input value to the helloText.hello 
	  email.value = helloText.hello;
	};

	// make a new request
	var request = new XMLHttpRequest();

	// listen for the request response
	request.addEventListener("load", responseHandler);

	// ready the system by calling open, and specifying the url
	request.open("GET", ajaxUrl);

	// send the request
	request.send();

}
let pinArray = document.querySelectorAll(".pin");
for(let i=0;i<pinArray.length;i++){
	pinArray[i].addEventListener('click',sendPinReq);
}

function sendPinReq(){
	let pokemonId=this.id;
	let http = new XMLHttpRequest();
	let url = '/pokemon/pin';
	let params='pokemonId='+pokemonId;
	http.open("POST",url,true);

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.addEventListener('load',getPinRes);
	// http.addEventListener('error',errorHandle);
	// http.onreadystatechange= getPinRes;
	http.send(params);
}

function getPinRes(){
	var resp = JSON.parse(this.responseText);
	if(resp.status=="added"){
		document.getElementById(parseInt(resp.id)).style.color="red";
		document.getElementById(parseInt(resp.id)).innerHTML="Added";
	}
}

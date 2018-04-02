let pinArray = document.querySelectorAll(".pin");
for(let i=0;i<pinArray.length;i++){
	pinArray[i].addEventListener('click',sendPinReq);
}

function sendPinReq(){

	if(this.dataset.status!="added"){
		let pokemonId=this.id;
		let http = new XMLHttpRequest();
		let url = '/pokemon/pin';
		let params='pokemonId='+pokemonId;
		http.open("POST",url,true);

		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.addEventListener('load',unPin);
		http.send(params);

	}else if(this.dataset.status=="added"){
		let pokemonId = this.id;
		let http = new XMLHttpRequest();
		let url = '/pokemon/pin/remove';
		let params='pokemonId='+pokemonId;
		http.open("DELETE",url,true)
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.addEventListener('load',unPin);
		http.send(params);
	}

}

function setPin(){
	var resp = JSON.parse(this.responseText);
	if(resp.status=="added"){
		document.getElementById(parseInt(resp.id)).style.color="red";
		document.getElementById(parseInt(resp.id)).innerHTML="Added";
		document.getElementById(parseInt(resp.id)).dataset.status="added";
	}
}

function unPin(){
	var resp = JSON.parse(this.responseText);
	if(resp.status=="deleted"){
		let toDeleteNode = document.getElementById('pinnedPokemonBox'+resp.id);
		toDeleteNode.parentNode.removeChild(toDeleteNode);
	}
}
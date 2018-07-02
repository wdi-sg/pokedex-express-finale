const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

const pg = require('pg');
const configs = {
	user: 'elvera',
	host: '127.0.0.1',
	database: 'pokemons',
	port: '5432'
};

const client = new pg.Client(configs);

jsonfile.readFile(FILE, (err,obj)=>{
	client.connect((err) => {
		if (err) {
			console.log('Connection error', err.message);
		}
		console.log('Connected to dB');
		let text = 'INSERT INTO pokemon (name, num, img, weight, height) ' + ' VALUES($1, $2, $3, $4, $5) RETURNING *';
		for (let i=0; i<obj.pokemon.length; i++){
			let values = [obj.pokemon[i].name, obj.pokemon[i].num, obj.pokemon[i].img, obj.pokemon[i].weight, obj.pokemon[i].height];
			client.query(text, values, (err, res) => {
				if (err) {
					console.log("Query error", err.message);
				} else {
					console.log("Entry added " + (i+1));
				}
				if (res.rows[0].id == 151) { client.end() };
			});
		}
	});
});

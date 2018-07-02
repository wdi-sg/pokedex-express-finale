let createPokemonModel = db => {
    const helpers = require("../helpers");
    class Pokemon {

        constructor(id, num, img="", weight="", height="") {
            this.id = id;
            this.num = num;
            this.img = img;
            this.weight = weight;
            this.height = height;
        }

        static create(pokeInfo, userId, errorCallback, successCallback) {
            const queryString = 'INSERT INTO pokemon (name, img, weight, height) VALUES ($1, $2, $3, $4) RETURNING *';
            let values = [pokeInfo.name, pokeInfo.img, pokeInfo.weight, pokeInfo.height];
            db.query(queryString, values, (err, res) => {
                if (err) {
                    errorCallback(err);
                } else {
                    if (res.rows.length > 0) {
                        const queryString2 = 'UPDATE pokemon SET num = $1 WHERE id = $2';
                        let currentPokeId = res.rows[0].id;
                        let currentPokeNum = helpers.generateNum(currentPokeId);
                        let values2 = [currentPokeNum, currentPokeId];
                        db.query(queryString2, values2, (error, result) => {
                            if (err) {
                                errorCallback(error);
                            } else {
                                let currentUserId = userId;
                                const queryString3 = 'INSERT INTO user_pokemon (username_id, pokemon_id) VALUES ($1, $2) RETURNING *';
                                let values3 = [currentUserId, currentPokeId];
                                db.query(queryString3, values3, (errr, ress) => {
                                    if (errr) {
                                        errorCallback(errr);
                                    } else {
                                        successCallback();
                                    }
                                })
                            }
                        })
                    } else {
                        errorCallback("Error creating pokemon!");
                    }
                }
            });
        }

        static read(pokemonId, errorCallback, successCallback) {
            const queryString = 'SELECT * FROM pokemon WHERE id = $1';
            let value = [pokemonId];
            db.query(queryString, value, (err, result) => {
                if (err) {
                    errorCallback(err);
                } else {
                    successCallback(result.rows[0], result.rows.length);
                }
            });
        }

        static update(pokemonId, pokeInfo, errorCallback, successCallback) {
            const queryString = 'UPDATE pokemon SET name = $1, img = $2, height = $3, weight = $4 WHERE id = $5';
            const values = [pokeInfo.name, pokeInfo.img, pokeInfo.height, pokeInfo.weight, pokemonId];
            db.query(queryString, values, (err, result) => {
                if (err) {
                    errorCallback(err);
                } else {
                    successCallback();
                }
            });
        }

        static delete(pokemonId, errorCallback, successCallback) {
            const queryString = 'DELETE FROM pokemon WHERE id = $1';
            const values = [pokemonId];
            db.query(queryString, values, (err, res) => {
                if (err) {
                    errorCallback(err);
                } else {
                    const queryString2 = 'DELETE FROM user_pokemon WHERE pokemon_id = $1';
                    const values2 = [pokemonId];
                    db.query(queryString2, values2, (error, result) => {
                        if (error) {
                            errorCallback(error);
                        } else {
                            successCallback();
                        }
                    })
                }
            });
        }
    }

    return Pokemon;
}

module.exports = createPokemonModel;
/**
 * Pokemon model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a pokemon (be it C, R, U, or D),
 * one or more of the functions here should be called.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
  return {
    all: (callback) => {
      let queryString = 'SELECT * FROM pokemons;';
      pool.query(queryString, (err, res) => {
        callback(res.rows);
      });
    },
    new: (pokemonDetails, callback) => {
      let queryString = 'INSERT INTO pokemons (id,num,name,weight,height,img)'+
        'VALUES ($1,$2,$3,$4,$5,$6);';
      let values = [pokemonDetails.id, pokemonDetails.num, pokemonDetails.name,
      pokemonDetails.weight, pokemonDetails.height, pokemonDetails.img];
      console.log(values);
      pool.query(queryString,values, (err, res) => {
        callback(res);

      });

    },
    show: (pokemonid, callback) => {
      let queryString = 'SELECT * FROM pokemons WHERE pokemons.id='+
        pokemonid + ';';
      pool.query(queryString, (err, res) => {
        callback(res.rows[0]);
      });
    },
    edit: (pokemonid, callback) => {
      let queryString = 'SELECT * FROM pokemons WHERE pokemons.id='+
        pokemonid + ';';
      pool.query(queryString, (err, res) => {
        callback(res.rows[0]);
      });
    },
    update: (pokemonid, pokemonDetails, callback) => {
      let queryString = 'UPDATE pokemons SET (num,name,weight,height,img) = ' +
        '($1,$2,$3,$4,$5) WHERE pokemons.id='+pokemonid+';';
      //console.log(queryString);
      let values = [pokemonDetails.num, pokemonDetails.name,
      pokemonDetails.weight, pokemonDetails.height, pokemonDetails.img];
      //console.log(values);
      pool.query(queryString,values, (err, res) => {
        //console.log(res);
        callback(res);

      });
    },
    destroy: (pokemonid, callback) => {
      let queryString = 'DELETE FROM pokemons WHERE pokemons.id=' + pokemonid + ';';
      pool.query(queryString, (err, res) => {
        callback(res);
      });
    }
  };
};

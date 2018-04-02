/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    updateForm: (id, callback) => {
      const queryString = 'SELECT * from pokemons WHERE id=$1'
      const values =[id];
      dbPool.query(queryString, values, (err, queryResult) =>{
        callback(err, queryResult);
      });
    },

    update: (pokemon, callback) => {
      const queryString = 'UPDATE pokemons SET name = ($1), num = ($2), img = ($3), weight = ($4), height = ($5) WHERE id = ($6)'
      const values = [pokemon.name, pokemon.num, pokemon.img, pokemon.weight, pokemon.height, pokemon.id];
      console.log(pokemon.name)
      dbPool.query(queryString, values, (err, queryResult) =>{
        callback(err, queryResult);
      });
    },

    create: (pokemon, callback) => {
      // set up query
      const queryString = 'INSERT INTO pokemons (name, num, img, weight, height) VALUES ($1, $2, $3, $4, $5)';
      const values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height
      ];

      // execute query
      dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    },

    get: (id, callback) => {
      const values = [id];

      dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  };
};

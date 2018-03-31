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

module.exports = (dbPool) => {
  return {
    create: (pokemon, callback) => {
      const queryString = `INSERT INTO pokemons(name, img, weight, height) VALUES ('${pokemon.name}', '${pokemon.img}', '${pokemon.weight}', '${pokemon.height}') RETURNING id;`;
      dbPool.query(queryString, (error, results) => {
        if (error) {
          callback(error, results.rows[0].id);
        } else {
          const id = results.rows[0].id;
          const num = id.toString().padStart(3, 0);
          const queryString = `UPDATE pokemons SET num = '${num}' WHERE id = '${id}';`;
          dbPool.query(queryString, (error2) => {
            callback(error2);
          })
        }
      })
    },

    details: (id, callback) => {
      const queryString = `SELECT * FROM pokemons WHERE id = ${id};`;
      dbPool.query(queryString, (error, results) => {
        callback(error, results.rows[0]);
      })
    },

    update: (pokemon, callback) => {
      const queryString = `UPDATE pokemons SET name='${pokemon.name}', weight='${pokemon.weight}', height='${pokemon.height}' WHERE id = ${pokemon.id};`;
      console.log(queryString);
      dbPool.query(queryString, (error, results) => {
        callback(error);
      })
    }
  }
}
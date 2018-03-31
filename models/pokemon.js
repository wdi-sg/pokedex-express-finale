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
          callback(error);
        } else {
          const id = results.rows[0].id;
          const num = id.toString().padStart(3, 0);
          const queryString2 = `UPDATE pokemons SET num = '${num}' WHERE id = '${id}';`;

          dbPool.query(queryString2, (error2) => {
            if (error2) {
              callback(error2);
            } else {
              const queryString3 = `INSERT INTO user_pokemon(user_id, pokemon_id) VALUES ('${pokemon.userid}', '${id}');`;
              
              dbPool.query(queryString3, (error3) => {
                callback(error3);
              })
            }
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
      const queryString = `UPDATE pokemons SET name='${pokemon.name}', img='${pokemon.img}', weight='${pokemon.weight}', height='${pokemon.height}' WHERE id = ${pokemon.id};`;
      dbPool.query(queryString, (error, results) => {
        callback(error);
      })
    },

    remove: (id, callback) => {
      const queryString = `DELETE FROM pokemons WHERE id = ${id};`;
      dbPool.query(queryString, (error) => {
        callback(error);
      })
    }
  }
}
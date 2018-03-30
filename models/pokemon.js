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

module.exports = (db) => {
  return {
    get: (id, callback) => {
      db.query(`select * from pokemons where id=${id}`, (err, res) => {
        if (err) console.error("error fetching pokemon", err);
        callback(res.rows[0]);
      })
    },
    create: (data, callback) => {
      db.query(`insert into pokemons (name, img, weight, height) values ('${data.name}', '${data.img}', '${data.weight}', '${data.height}') returning id`, (err, res) => {
        if (err) console.error("error creating pokemon in db");
          let num = res.rows[0].id.toString();
          while (num.length < 3) {
            num = "0" + num;
          }
          // update pokemon
          db.query(`update pokemons set num='${num}' where id=${res.rows[0].id};`, (err2, res2) => {
            if (err2) console.error("error updating pokemon in db");
            callback(true);
          });
      });
    },
    editForm: (id, callback) => {
      db.query(`select * from pokemons where id=${id}`,(err, res) => {
        if (err) console.error("error retriving pokemon data for edit", err);
        callback(res);
      })
    },
    edit: (data, callback) => {
      db.query(`update pokemons set num='${data.num}', name='${data.name}', img='${data.img}', weight='${data.weight}', height='${data.height}' where id=${data.id}
      `, (err, res) => {
        if (err) console.error("error updating pokemon in db")
        callback(res);
      })
    },
    remove: (id, callback) => {
      db.query(`delete from pokemons where id=${id};`, (err, res) => {
        if (err) console.error("error deletng pokemon from db", err);
        callback(res);
      })
    }
  }
}

/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */
const sha256 = require('js-sha256');
const pg = require('pg');

const config = {
  user: 'fupuchu',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
}

const pool = new pg.Pool(config);
/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = function(db){

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const get = (request, response) => {
    let getUser = 'SELECT * FROM trainer'
    pool.query(getUser, (err,res) => {
      if (err) {
        console.log(err);
      } else {
        let trainer = res.rows
        response.status(200).render('home', {trainer: trainer});
      }
    })
  };

  const newuser = (req,response) => {
    let hashbrowns = sha256(req.body.password)
    let insertString = 'INSERT into trainer(first_name, password_hash, email) VALUES ($1,$2,$3)'
    let insertValues = [req.body.first_name, hashbrowns, req.body.email]

    pool.query(insertString, insertValues, (err,res) => {
      if (err) {
        console.log(err);
      } else {
        response.send('Sucess')
      }
    })
  }

  return {
    get: get,
    newuser : newuser
  };
}

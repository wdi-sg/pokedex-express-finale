/**
 * Pokemon controller functions.
 *
 * Each pokemon-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

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

const db = require('../db.js');

module.exports = {
  index: (req, res) => {
    let callback = (data) => {
      let context = {
        data
      };
      res.render('pokemon/index',context);
    };
    db.pokemons.all(callback);

  },
  new: (req, res) => {
    res.render('pokemon/new');
  },
  create: (req, res) => {
    let pokemonDetails = req.body;
    console.log(req);
    let callback = (data) => {
      res.send(data);
    };
    db.pokemons.new(pokemonDetails, callback);
  },
  show: (req, res) => {
    let pokemonid = req.params.id;
    let callback = (data) => {
        res.send(data);
    };
    db.pokemons.show(pokemonid, callback);

  }
};

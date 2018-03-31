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
const newForm = (request, response) => {
  response.render('pokemon/new');
}

const create = (db) => {
  return (request, response) => {
    db.pokemonDB.create(Object.assign(request.body, request.cookies), (error) => {
      if (error) {
        response.end('Oops, something went wrong. Please try again!');
      } else {
        response.redirect(301, '/');
      }
    })
  }
}
const details = (db) => {
  return (request, response) => {
    db.pokemonDB.details({user_id: request.cookies["userid"],
                          pokemon_id: request.params.id
                         }, (error, queryResults) => {
      if (error) {
        response.end('What pokemon is this?');
      } else {
        response.render('pokemon/details', queryResults);
      }
    })
  }
}

const updateForm = (db) => {
  return (request, response) => {
    db.pokemonDB.details(request.params.id, (error, queryResults) => {
      if (error) {
        response.end('What pokemon is this?');
      } else {
        response.render('pokemon/edit', queryResults);
      }
    }
  )}
}

const update = (db) => {
  return (request, response) => {
    db.pokemonDB.update(Object.assign(request.body, request.params), (error) => {
      if (error) {
        response.end("Oops, your changes weren't saved!");
      } else {
        db.pokemonDB.details(request.params.id, (error2, queryResults) => {
          response.render('pokemon/details', queryResults);
        })
      }
    })
  }
}

const remove = (db) => {
  return (request, response) => {
    db.pokemonDB.remove(request.params.id, (error) => {
      if (error) {
        response.end("Oops, something went wrong!");
      } else {
        response.redirect('/');
      }
    })
  }
}
/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

 module.exports = {
  newForm,
  create,
  details,
  updateForm,
  update,
  remove
 }

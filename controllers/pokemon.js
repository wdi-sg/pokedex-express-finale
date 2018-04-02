/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
 const get = (db) => {
  return (request, response) => {
    // use pokemon model method `get` to retrieve pokemon data
    db.pokemon.get(request.params.id, (error, queryResult) => {
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        response.render('pokemon/pokemon', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const updateForm = (db) => {
  return (request, response) => {
    // TODO: Add logic here
    db.pokemon.updateForm(request.params.id, (error, queryResult) =>{
      if (error) {
        console.error('query error: ', error.stack);
      } else {
        response.render('pokemon/edit', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const update = (db) => {
  return (request, response) => {
    db.pokemon.update(request.body, (error, queryResult)=>{
      if (error){
        console.error('query error: ', error.stack);
      } else{
        // response.render('pokemon/edit', { pokemon: queryResult.rows[0] });
        // console.log(queryResult);
        // response.send("Pokemon updated!")
      }
      response.redirect('/');
    });
    // TODO: Add logic here
  };
};

const createForm = (request, response) => {
  response.render('pokemon/new');
};

const create = (db) => {
  return (request, response) => {
    // use pokemon model method `create` to create new pokemon entry in db
    db.pokemon.create(request.body, (error, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)

      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('Pokemon created successfully');
      } else {
        console.log('Pokemon could not be created');
      }

      // redirect to home page after creation
      response.redirect('/');
    });
  };
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
 module.exports = {
  get,
  updateForm,
  update,
  createForm,
  create
};

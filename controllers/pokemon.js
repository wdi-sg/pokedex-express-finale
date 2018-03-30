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
const get = (db) => {
  return (req, res) => {
    db.pokemons.get(req.params.id, (queryRes) => {
      res.render("pokemon/pokemon", {pokemon: queryRes});
    });
  }
}

const createForm = (req, res) => {
  res.render("pokemon/create");
}

const create = (db) => {
  return (req, res) => {
    db.pokemons.create(req.body, (queryRes) => {
      res.redirect("/");
    })
  }
}

const editForm = (db) => {
  return (req, res) => {
    db.pokemons.editForm(req.params.id, (queryRes) => {
      if (queryRes.rows[0] == null){
        res.status(404).send("pokemon not found");
      } else {
        res.render("pokemon/edit", {pokemon: queryRes.rows[0]});
      }
    })
  }
}

const edit = (db) => {
  return (req, res) => {
    db.pokemons.edit(req.body, (queryRes) => {
      res.redirect(`/pokemons/${req.body.id}`);
    })
  }
}

const remove = (db) => {
  return (req, res) => {
    console.log(req.body.id);
    db.pokemons.remove(req.body.id, (queryRes) => {
      console.log(queryRes);
      if (queryRes.rowCount > 0) {
        res.redirect('/');
      } else {
        res.status("404").send("unable to delete pokemon");
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
  get,
  createForm,
  create,
  editForm,
  edit,
  remove
};

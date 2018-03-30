/**
* Routes file.
*
* All routes you want to match in the app should appear here.
* Upon match, a corresponding controller method should be called.
*
* Export as a function using `module.exports`,
* to be imported (using `require(...)`) in `index.js`.
*/

const users = require("./controllers/user");
const pokemons = require("./controllers/pokemon");

module.exports = (app, db) => {

  // USERS
  app.get('/users/create', users.createForm);
  app.post("/users/create", users.create(db));
  app.get("/users/login", users.loginForm);
  app.post("/users/login", users.login(db));
  app.get("/users/logout", users.logout);

  // pokemons
  app.get("/pokemons/edit/:id", pokemons.editForm(db));
  app.put("/pokemons/:id", pokemons.edit(db));
  app.get("/pokemons/create", pokemons.createForm);
  app.post("/pokemons/create", pokemons.create(db));
  app.get("/pokemons/:id", pokemons.get(db));
  app.delete("/pokemons/:id", pokemons.remove(db));



  // Root GET request (it doesn't belong in any controller file)
  app.get('/', (req, res) => {
    res.render("home");
  });

  // Catch all unmatched requests and return 404 not found page
  app.get('*', (req, res) => {
    res.status(404).send("<h1>OUT OF THE WORLD</h1>");
  })
};

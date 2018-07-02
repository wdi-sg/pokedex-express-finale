module.exports = (app, db) => {
  const user = require('./controllers/users.js')(db);
  const artist = require('./controllers/artists.js')(db);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          USER
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/users/new', user.newUser);
  app.post('/users/new', user.createUser);
  app.get('/users/login', user.newUserSession);
  app.post('/users/login', user.loginUser);
  app.get('/users/logout', user.logoutUser);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //         ARTISTS
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/artists', artist.artists);
  app.get('/artists/new', artist.newArtist);
  app.post('/artists/new', artist.createArtist);
};

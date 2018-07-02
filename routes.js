module.exports = (app, db) => {
  const user = require('./controllers/users.js')(db);
  const song = require('./controllers/songs.js')(db);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          USER
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/users/new', user.newUser);
  app.post('/users/new', user.createUser);
  app.get('/users/login', user.newUserSession);
  app.post('/users/login', user.loginUser);
  app.get('/users/logout', user.logoutUser);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //         SONGS
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/songs', song.songs);
  app.get('/songs/new', song.newSong);
  app.post('/songs/new', song.createSong);
  app.get('/songs/:id/edit', song.editSong);
  app.put('/songs/:id/edit', song.updateSong);
  app.delete('/songs/:id/delete', song.deleteSong);
};

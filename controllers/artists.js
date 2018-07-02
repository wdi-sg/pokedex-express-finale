module.exports = function(db) {

  const artists = (req, res) => {
    db.artist.artists( (err, queryResult) => {
      if (err) {
          console.error('Query Error: ', err.stack);
      } else {
          console.log('query!!', queryResult.rows);
          res.render('application', { page: 'artistsIndex', artists: queryResult.rows } );
      }
    });
  };

  const newArtist = (req, res) => {
    res.render('application', { page: 'newArtist' });
  };

  const createArtist = (req, res) => {
    let name = req.body.name;
    db.artist.createArtist(name, (err, queryResult) => {
      if (err) {
          console.error('Query Error:', err.stack);
      } else {
          res.redirect('/artists');
      }
    });
  };

  return {
    artists: artists,
    newArtist: newArtist,
    createArtist: createArtist
  };
};

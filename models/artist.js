module.exports = function(db){

  const artists = function(callback) {
    const queryString = 'SELECT * FROM artists';
    db.query(queryString, callback)
  }

  const createArtist = function(name, callback) {
    const queryString = 'INSERT INTO artists(name) VALUES($1)';
    const values = [name];
    db.query(queryString, values, callback)
  }

  return {
    artists: artists,
    createArtist: createArtist
  };
};

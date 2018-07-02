module.exports = function(db){
  const song = function(userId, callback) {
    const queryString = 'SELECT * FROM songs WHERE user_id = $1';
    const values = [userId];

    db.query(queryString, values, callback);
  }

  const createSong = function(title, duration, userId, callback) {
    const queryString = 'INSERT INTO songs(title, duration, user_id) VALUES ($1, $2, $3)';
    const values = [title, duration, userId];
    db.query(queryString, values, callback);
  }

  const editSong = function(id, callback) {
    const queryString = 'SELECT * FROM songs WHERE id = $1';
    const values = [id];
    db.query(queryString, values, callback);
  }

  const updateSong = function(id, title, duration, userId, callback) {
    const queryString = 'UPDATE "songs" SET "title"=($1), "duration"=($2), "user_id"=($3) WHERE "id"=($4)';
    const values = [title, duration, userId, id];
    db.query(queryString, values, callback);
  }

  const deleteSong = function(id, callback) {
    const queryString = 'DELETE FROM songs WHERE id = $1';
    const values = [id];
    db.query(queryString, values, callback);
  }

  return {
    song: song,
    createSong: createSong,
    editSong: editSong,
    updateSong: updateSong,
    deleteSong: deleteSong
  };
};

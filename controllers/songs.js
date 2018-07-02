module.exports = function(db) {

  const songs = (req, res) => {
    let userIsLoggedIn = req.cookies['loginCookie'];

    if (userIsLoggedIn) {
        let userId = req.cookies['userId'];
        db.song.song(userId, (err, queryResult) => {
          if (err) {
              res.status(500).send('Query Error');
          } else {
              res.render('application', {page: 'songIndex', userLogin: userIsLoggedIn, songs: queryResult.rows})
          }
        })
    } else {
        res.status(401).send('Unauthorised');
    }
  }

  const newSong = (req, res) => {
    let userIsLoggedIn = req.cookies['loginCookie'];

    if (userIsLoggedIn) {
        res.render('application', { page: 'newSong', userId: req.cookies['userId'], userLogin: userIsLoggedIn });
    } else {
        res.status(401).send('Unauthorised');
    }
  }

  const createSong = (req, res) => {
    let title = req.body.title;
    let duration = req.body.duration;
    let userId = req.body.user_id;

    db.song.createSong(title, duration, userId, (err, resultQuery) => {
      if (err) {
          res.status(500).send('Query Error');
      } else {
          res.redirect('/songs');
      }
    });
  }

  const editSong = (req, res) => {
    let id = req.params.id;

    db.song.editSong(id, (err, resultQuery) => {
      if (err) {
          res.status(500).send('Query Error');
      } else {
          let props = {
            page: 'editSong',
            userId: req.cookies['userId'],
            userLogin: req.cookies['loginCookie'],
            song: resultQuery.rows[0]
          }

          res.render('application', props);
      }
    })
  }

  const updateSong = (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let duration = req.body.duration;
    let userId = req.body.user_id;

    db.song.updateSong(id, title, duration, userId, (err, queryResult) => {
      if (err) {
          res.status(500).send('Internal Server Error');
      } else {
          res.redirect('/songs')
      }
    })
  }

  const deleteSong = (req, res) => {
    let id = req.params.id;

    db.song.deleteSong(id, (err, queryResult) => {
      if (err) {
          console.log('Query Error: ', err.stack);
          res.status(500).send('Internal Server Error');
      } else {
          res.redirect('/songs')
      }
    })
  }

  return {
    songs: songs,
    newSong: newSong,
    createSong: createSong,
    editSong: editSong,
    updateSong: updateSong,
    deleteSong: deleteSong
  }
}

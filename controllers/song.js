module.exports = (db) => {



	// create song and get all songs
	const get = (req, res) => {

		// res.send("hello");

		db.song.createSong(req.body.title, req.body.duration, req.body.img, (err, result) => {

			if (err) {

				res.send("db error: " + err);

			} else {

				db.song.getSong((err1, result1) => {

					if (err1) {

						res.send("db error: " + err);

					} else {

						res.render('./song/allSongs', {songs: result1.rows})

					}

				})

			}
		});

	}



	// show form for new song
	const newSong = (req, res) => {

		res.render('./song/new');

	}



	// show songs with selected id
	const showSong = (req, res) => {

		db.song.showSong(req.params.id, (err, result) => {

			if (err) {

				res.send("db error: " + err);

			} else {

				res.render('./song/song', {song: result.rows[0]});

			} 

		})

	}



	// show all songs
	const allSongs = (req, res) => {

		db.song.getSong((err, result) => {

			if (err) {

				res.send('db error: ' + err);

			} else {

				res.render('./song/song');

			}

		})

	}


	// form for editing song
	const editSongForm = (req, res) => {

		db.song.showSong(req.params.id, (err, result) => {

			res.render('./song/edit', {song: result.rows[0]});

		})

	}


	// edit song
	const editSong = (req, res) => {

		console.log(req.body);

		db.song.editSong(req.body.id, req.body.title, req.body.duration, req.body.img, (err, result) => {

			if (err) {

				res.send("db error: " + err);

			} else {

				res.redirect('/songs');

			}

		})

	}



	// delete song
	const deleteSong = (req, res) => {

		db.song.deleteSong(req.body.id, (err, result) => {

			console.log(req.body.id);

			if (err) {

				res.send("db error: " + err);

			} else {

				res.redirect('/songs');

			}

		});

	}



	return {
		get: get,
		newSong: newSong,
		showSong: showSong,
		allSongs: allSongs,
		editSongForm: editSongForm,
		editSong: editSong,
		deleteSong: deleteSong
	}

}
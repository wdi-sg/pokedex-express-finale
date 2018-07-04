module.exports = (pool) => {

	const createSong = (title, duration, img, callback) => {

		let queryString = 'INSERT INTO songs (title, duration, img) VALUES ($1, $2, $3)';
		let values = [title, duration, img];
		pool.query(queryString, values, callback);

	}

	const getSong = (callback) => {

		let queryString = 'SELECT * FROM songs ORDER BY id';
		pool.query(queryString, callback);

	}




    // show song with the selected id
    let showSong = (id, callback) => {

        let queryString = 'SELECT * FROM songs WHERE id = $1';
        let values = [id];
        pool.query(queryString, values, callback);

    }



    // edit song
    let editSong = (id, title, duration, img, callback) => {

    	let queryString = 'UPDATE songs SET title = $1, duration = $2, img = $3 WHERE id = $4 RETURNING *';
    	let values = [title, duration, img, id];
    	pool.query(queryString, values, callback);

    }

    let deleteSong = (id, callback) => {

    	let queryString = 'DELETE FROM songs WHERE id = $1 RETURNING *';
    	let values = [id];
    	pool.query(queryString, values, callback);

    }

	return {

		createSong: createSong,
		getSong: getSong,
		showSong: showSong,
		editSong: editSong,
		deleteSong: deleteSong

	}

}
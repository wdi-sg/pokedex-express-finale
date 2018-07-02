let createUserModel = db => {
    class User {

        constructor(id, username, passwordHash) {
            this.id = id;
            this.username = username;
            this.passwordHash = passwordHash;
        }

        static create(userInfo, errorCallback, successCallback) {
            let queryText = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *';
            let values = [userInfo.username, userInfo.passwordHash];
            db.query(queryText, values, (err, res) => {
                if (err) {
                    errorCallback(err);
                } else {
                    successCallback(res.rows[0].id);
                }
            })
        }
    }

    return User;
}

module.exports = createUserModel;
module.exports = function(db){
    const createUser = function(name, email, password, callback) {
      const queryString = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)';
      const values = [name, email, password];
      db.query(queryString, values, callback)
    }

    const loginUser = function(email, callback) {
      const queryString = 'SELECT * FROM users WHERE email = $1';
      const values = [email];

      db.query(queryString, values, callback);
    }

    return {
        createUser: createUser,
        loginUser: loginUser
    };
};

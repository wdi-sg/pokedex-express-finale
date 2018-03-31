const bcrypt = require('bcrypt');

module.exports = (pool) => {
  return {
    new: (userEmail, password, callback) => {
      let queryString = 'SELECT * FROM users WHERE users.email=\''+userEmail+'\';';
      console.log(queryString); 
      //let queryString = 'SELECT * FROM sessions WHERE sessions.sessionhash='+
      //  sessionHash + 'AND sessions.userid=' + userId + ';';
      pool.query(queryString, (err, res) => {
        console.log(res);
        let passwordHash = res.rows[0].password;
        bcrypt.compare(password, passwordHash, function(err, res) {
          bcrypt.hash(Date.now().toString(), 10, (err, hash) => {
            let queryString = 'INSERT INTO sessions (userid, sessionhash) ' +
              'VALUES ($1, $2);';
            console.log(hash);
            let values = [userEmail, hash];
            pool.query(queryString,values, (err, res) => {
              callback(hash);
              console.log('SESSION CREATED');
            });
          });
        });
      });
    }
  };
};

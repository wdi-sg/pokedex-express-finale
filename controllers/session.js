const db = require('../db');

module.exports = {
  new: (req, res) => {
    let userEmail = req.body.email;
    let password = req.body.password;
    let callback = (hash) => {
      res.send(hash);
    };
    res.render('session/new');
  },
  create: (req, res) => {
    let userEmail = req.body.email;
    let password = req.body.password;
    let callback = (hash) => {
      res.cookie('sessionID',hash);
      res.send('ha');

    };
    db.sessions.new(userEmail, password, callback);
  },
  destroy: (req, res) => {

  } 
};

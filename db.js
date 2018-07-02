const pg = require('pg');

 const configs = {
   user: 'angkiki',
   host: '127.0.0.1',
   database: 'spotify',
   port: 5432
 };

 const poolObj = new pg.Pool(configs);

 poolObj.on('error', function (err) {
   console.log('idle client error', err.message, err.stack);
 });

 const userModel = require('./models/user');

 const userObj = userModel(poolObj);

 module.exports = {
     user: userObj,
     pool : poolObj
 };

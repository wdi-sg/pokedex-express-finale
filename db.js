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
 const artistModel = require('./models/artist');

 const userObj = userModel(poolObj);
 const artistObj = artistModel(poolObj);

 module.exports = {
     user: userObj,
     artist: artistObj,
     pool : poolObj
 };

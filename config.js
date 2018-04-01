module.exports = {
  sessionSecret: 'sessionsecretkey',

  memcacheHost: ['127.0.0.1:11211'],

  memcacheSecret: 'memcachesecretkey',

  bcryptSalt: 1,

  dbSettings: {
    user: "ck",
    host: "127.0.0.1",
    database: "pokemons_development",
    port: 5432
  } 

};

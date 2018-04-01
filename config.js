module.exports = {
  sessionSecret: 'sessionsecretkey',

  memcacheHost: ['127.0.0.1:11211'],

  memcacheSecret: 'memcachesecretkey',

  dbSettings: {
    user: "kokcheekean",
    host: "127.0.0.1",
    database: "pokemons_development",
    port: 5432
  },

  dbGetAllPokemonsQuery: {
    name: "get-all-pokemons",
    text: "SELECT * FROM pokemons",
    values: []
  },

  dbCreatePokemon: async function() {

  },
  
  dbGetPokemonsOfUser: function(userID) {
    return {
      name: "get-user-pokemons",
      text:
        "SELECT * FROM pokemons WHERE id IN (SELECT pokemon_id FROM users_pokemons WHERE user_id=$1 AND enabled=true)",
      values: [userID]
    };
  },

  dbGetUserIdFromEmail: function(email) {
    return {
      name: "get-user-id-from-email",
      text: "SELECT id FROM users WHERE email=$1",
      values: [email]
    }
  },

  dbGetPokemonById: function(id) {
    return {
      name: "get-pokemon-by-id",
      text: "SELECT * FROM pokemons WHERE id=$1",
      values: [id]
    }
  },

  dbCreateUser: function(name, email, password) {
    return {
      name: "create-user",
      text: "INSERT INTO users (name, email, password) VALUES($1, $2, $3)",
      values: [name, email, password]
    }
  },

  dbUpdateUserById: function (id, name, email, password) {
    return {
      name: "update-user",
      text: "UPDATE users SET name=$2, email=$3, password=$4 WHERE id=$1",
      values: [id, name, email, password]
    }
  }
};

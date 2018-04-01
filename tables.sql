-- create pokemons table
CREATE TABLE IF NOT EXISTS pokemons (
  id SERIAL PRIMARY KEY,
  num varchar(255),
  name varchar(255),
  img varchar(255),
  weight varchar(255),
  height varchar(255)
);

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255),
  password varchar(255)
);

-- create join table
CREATE TABLE IF NOT EXISTS users_pokemons (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  pokemon_id INTEGER NOT NULL,
  enabled BOOLEAN
)

-- -- create sessions table
-- CREATE TABLE IF NOT EXISTS sessions (
--   id SERIAL PRIMARY KEY,
--   hashed_user_id varchar(255),
--   last_ip inet,
--   logged_in boolean
-- );

-- query for user's pokemons
-- SELECT users.id, pokemons.id, pokemons.num, pokemons.name, pokemons.img, pokemons.weight, pokemons.height
-- FROM ((pokemons
-- INNER JOIN users_pokemons ON pokemons.id = users_pokemons.pokemon_id)
-- INNER JOIN users ON users_pokemons.user_id = users.id);

-- SELECT * FROM pokemons WHERE id IN (SELECT pokemon_id FROM users_pokemons WHERE user_id = 1)
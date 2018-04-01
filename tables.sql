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
  password varchar(255),
  admin boolean DEFAULT false
);

-- create user_pokemon table
CREATE TABLE IF NOT EXISTS user_pokemon (
  id SERIAL PRIMARY KEY,
  user_id INT,
  pokemon_id INT
);

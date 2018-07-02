-- create songs table
-- DROP TABLE songs;
CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  duration varchar(255),
  user_id integer
);

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255),
  password varchar(255)
);

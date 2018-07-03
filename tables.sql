-- create Pokemon table in database
CREATE TABLE IF NOT EXISTS pokemon (
  id SERIAL PRIMARY KEY,
  num varchar(255),
  name varchar(255),
  img varchar(255),
  weight varchar(255),
  height varchar(255),
  user_id varchar(255)
);

-- create User table in database
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email varchar(255),
  password varchar(255)
);
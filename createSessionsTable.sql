CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  userid varchar(255),
  sessionhash varchar(255)
);

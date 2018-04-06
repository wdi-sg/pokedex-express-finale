
-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255) unique,
  password varchar(255),
  fb_id varchar(255),
  telegram_id bigint DEFAULT null,
  is_admin boolean default false,
  created_at timestamp,
  updated_at timestamp
);

-- create alerts tableName
create table if not exists alerts (
  id serial primary key,
  user_id integer,
  name varchar(255),
  description text,
  type varchar(255),
  is_expired boolean,
  alert_time timestamp,
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

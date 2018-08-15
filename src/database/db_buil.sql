BEGIN;
 DROP TABLE IF EXISTS users CASCADE;
 DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 password TEXT NOT NULL

);
CREATE TABLE post (
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 create_at timestamp without time zone,
 user_id INTEGER REFERENCES users(id)

);

INSERT INTO users (name,email,password) VALUES ('Mohannad','a@gmail.com','111i');
INSERT INTO post (title,description,create_at,user_id) VALUES ('bbbb','blblabbb','2003-2-1'::timestamp,1);

COMMIT;

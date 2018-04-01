INSERT INTO users
(name, email, password)
VALUES
('playerOne', 'p1@email.org', 'blue');

INSERT INTO users
(name, email, password)
VALUES
('playerTwo', 'p2@gmail.org', 'red');

INSERT INTO users_pokemons
(user_id, pokemon_id, enabled)
VALUES
(1, 1, true);

INSERT INTO users_pokemons
(user_id, pokemon_id, enabled)
VALUES
(1, 2, true);

INSERT INTO users_pokemons
(user_id, pokemon_id, enabled)
VALUES
(1, 3, true);

INSERT INTO users_pokemons
(user_id, pokemon_id, enabled)
VALUES
(2, 4, true);

INSERT INTO users_pokemons
(user_id, pokemon_id, enabled)
VALUES
(2, 5, false);
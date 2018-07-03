# Pokedex Express App (with Postgres SQL)

For this exercise, we'll upgrade from storing pokedex data in a plain JSON file to a fully fledged Postgres database. The end result we want is a CRUD app for pokemon with data saved into a database.

This is a clean new app without a `seed.sql` file. So you'll need at least 2 users to make sure that eveything is working correctly.

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `npm install` to install dependencies
3.  Create a new Postgres database by running `createdb pokemons -U <your_username>`
4.  Run `psql -U <your_username> -d pokemons -a -f tables.sql` to create a `pokemon` table in the database
5.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
6.  Open `localhost:3000` on your browser and see the home page

## Deliverables

The deliverable is an app that has CRUD functionality on pokemons that can be associated with users. Some example code from the previous version of the exercise has been provided for you to build on, although you may extend your own code from the previous exercise if you wish to do so.

* DELETE `/pokemon/:id` should delete the entry of the pokemon with the specified ID, and should redirect to the home page `/`

* Create the relevant `tables.sql` file to create the appropriate table for your database

* Create new routes for user-creation

* Create new routes for user-login and user-logout

* If the currently logged in user creates a pokemon, the pokemon is automatically associated with the currently logged in user

* So, add to the pokemon table a column with the foreign key `user_id` that refers to the id column in the user table.

#### Further

* Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.

#### Further

* When a user is logged in, the home page should show a separate table containing only pokemon associated with the user.

## Useful SQL commands

Note the proceeding commands should be run in a `psql` session on Terminal.

View all the data in a table:
```sql
SELECT * FROM pokemon;
```

Delete your database and start again if you made a mistake:
```sql
DROP DATABASE pokemons;
```

Or if you just need to reset the table:
```sql
DROP TABLE pokemons;
```

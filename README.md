# Pokedex Express App - Full stack

This is it. We've learned a lot in the past two weeks:

* How to create a web server using Node.js and the `express` package
* How to read/write to a JSON file using `jsonfile` package
* How to render HTML template files using Handlebars (`express-handlebars` package)
* How to read incoming data from web forms using `body-parser` package
* How to override methods using `method-override` package to workaround the limitation of `<form>` HTML not having support for PUT and DELETE requests
* How to add and delete cookies to/from the browser using `cookie-parser`
* How to use Postgres database (`pg` package) to replace `jsonfile` for read/write of data
* How to do user authentication using a combination of `bcrypt` to hash plain text passwords and storing cookies on the browser

That's a lot of new information! To help us digest the information, we will do one final exercise, which is the culmination of all previous `pokedex-express` exercises.

In this exercise, we will build a full stack Pokedex web app with user authentication (sort of) from scratch.

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `yarn install` to install dependencies
3.  Create a new Postgres database by running `createdb pokemons_development -U <your_username>`
4.  Run `psql -U <your_username> -d pokemons_development -a -f tables.sql` - this will create 2 new tables for you - a `pokemons` table and `users` table in the database
5.  Seed pokedex data into the newly created `pokemons` table by running `psql -U <your_username> -d pokemons -a -f seed.sql`
6.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
7.  Write back-end code!

## Deliverables

Since we will be building this app from scratch, the only dependency added into `package.json` is Express. You should add dependencies (using `yarn add <package_name>`) as you go along building the app.

* Build a CRUD app for Pokemons that follows the [REST][1] architectural style.

* Build a CRUD app for Users that follows [REST][1] architectural style.

* Build authentication functionality so a User can login and logout.

* Build functionality for a User to own any number of Pokemons (one unique Pokemon per User). Hint: this requires a third table, which is a join table.

__REST architecture reference__

**URL**            | **HTTP Verb** | **Action**
----------------   | ------------- | ----------
/pokemons/         | GET           | index     
/pokemons/new      | GET           | new       
/pokemons          | POST          | create    
/pokemons/:id      | GET           | show      
/pokemons/:id/edit | GET           | edit      
/pokemons/:id      | PATCH/PUT     | update    
/pokemons/:id      | DELETE        | destroy   

## Further

* Personalise the home page of your app to display information about the logged-in User (eg. name and Pokemons she owns).

* Create a "super user" User account, and allow only User accounts with "super user" access to create new and modify existing Pokemons.

## Tips

* Review the [explanation video](https://www.youtube.com/watch?v=yCX7YRFh0qM) to understand the overall flow of a Node + Express + Postgres app.

* Refer to the previous `pokedex-express` exercises as needed. It is perfectly ok to revisit your own code. Developers do it all the time at work!

* __Commit often__! We operate frequently in an erroneous state as developers, so whenever you feel like you have achieved a small milestone, you should make a git commit. It's not uncommon for a developer to need to revert to an older commit because the code written since that last commit just doesn't work, and you want to start afresh from the last saved commit.


[1]: https://en.wikipedia.org/wiki/Representational_state_transfer

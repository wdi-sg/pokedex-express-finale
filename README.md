# Pokedex Express App - Full stack

This is it. We've learned a lot in the past two weeks:

* How to create a web server using Node.js and the `express` package
* How to read/write to a JSON file using `jsonfile` package
* How to render HTML template files using React (`express-react-views` package)
* How to read incoming data from web forms using `body-parser` package
* How to override methods using `method-override` package to workaround the limitation of `<form>` HTML not having support for PUT and DELETE requests
* How to add and delete cookies to/from the browser using `cookie-parser`
* How to use Postgres database (`pg` package) to replace `jsonfile` for read/write of data
* How to do user authentication using a combination of `SHA256` to hash plain text passwords and storing cookies on the browser

That's a lot of new information! To help us digest the information, we will do one final exercise, which is the culmination of all previous `pokedex-express` exercises.

In this exercise, we will build a full stack Pokedex web app with user authentication (sort of) from scratch.

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `npm install` to install dependencies
3.  Create a new Postgres database by running `createdb pokemons_development -U <your_username>`
4.  Run `psql -U <your_username> -d pokemons_development -a -f tables.sql` - this will create 2 new tables for you - a `pokemons` table and `users` table in the database
5.  Seed pokedex data into the newly created `pokemons` table by running `psql -U <your_username> -d pokemons -a -f seed.sql`
6.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
7.  Write back-end code!

## Deliverables

Use the structure we have already seen in the MVC exercise, write the logic for implementing the app in small steps.

* Start with creating a new User. Don’t worry about hashing password until you know that the app works
* GET `/users/new` in `routes.js`
* Specify the name of the controller method to be called inside `routes.js` (`user.newForm()`)
* Write the `newForm()` method in the controller file (`controller/user.js`)
* Run it, make sure it works
* Write the handlebars file that will be rendered along with the response
* Specify the name of the model method to be called inside `controller/user.js` (`allModels.userModel.new()`) — the method should take 2 parameters (1st is the request data, 2nd is the callback to be executed when the query has returned the result)
* Write the `new()` method in the model file (`model/user.js`) — when the query result has returned succesfully, invoke the callback function and pass the result of the query into it

* Repeat the above for all CRUD routes
* Do the same for Pokemons


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

* Use Postgres to make `email` a unique field for Users table, and prevent users from creating a new user account that uses an email that already exists in your database.

## Tips

* Review the [explanation video](https://www.youtube.com/watch?v=yCX7YRFh0qM) to understand the overall flow of a Node + Express + Postgres app.

* Refer to the previous `pokedex-express` exercises as needed. It is perfectly ok to revisit your own code. Developers do it all the time at work!

* Since we will be building this app from scratch, the only dependency added into `package.json` is Express. You should add dependencies (using `yarn add <package_name>`) as you go along building the app.

* __Commit often__! We operate frequently in an erroneous state as developers, so whenever you feel like you have achieved a small milestone, you should make a git commit. It's not uncommon for a developer to need to revert to an older commit because the code written since that last commit just doesn't work, and you want to start afresh from the last saved commit.


[1]: https://en.wikipedia.org/wiki/Representational_state_transfer

### Bored of Pokemon?
You can create an alternate app: Spotifer

Users can create songs. Songs have title and duration. (and image if you want)

#### Further
Create albums that belong to a user and that contain many songs. Songs only have one album.

#### Further
Artists have albums and songs.


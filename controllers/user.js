const users = require('./controllers/routes.js')(db);

const createForm = (request, response) => {
  response.render('userCreation');
}